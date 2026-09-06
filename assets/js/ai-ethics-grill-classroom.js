(function () {
  "use strict";

  const studentRoot = document.getElementById("ai-ethics-classroom-lab");
  const facilitatorRoot = document.getElementById("ai-ethics-facilitator");

  if (studentRoot) initializeStudentLab(studentRoot);
  if (facilitatorRoot) initializeFacilitator(facilitatorRoot);

  function initializeStudentLab(root) {
    root.classList.add("ethics-js");

    const VERSION = 1;
    const BACKUP_KIND = "ai-ethics-classroom-session";
    const GROUP_KIND = "ai-ethics-classroom-group-packet";
    const storageKey = root.dataset.storageKey || "aiEthicsClassroomGrill:v1";
    const status = document.getElementById("ethics-save-status");
    const stages = Array.from(root.querySelectorAll("[data-stage]"));
    const stageNames = new Set(stages.map(function (stage) { return stage.dataset.stage; }));
    const navButtons = Array.from(root.querySelectorAll(".ethics-stage-nav [data-go]"));
    const baselineFields = Array.from(root.querySelectorAll("[data-baseline-field]"));
    const groupFields = Array.from(root.querySelectorAll("[data-group-field]"));
    const individualFields = Array.from(root.querySelectorAll("[data-individual-field]"));
    const fieldKeys = {
      baseline: new Set(baselineFields.map(function (field) { return field.dataset.baselineField; })),
      group: new Set(groupFields.map(function (field) { return field.dataset.groupField; })),
      individual: new Set(individualFields.map(function (field) { return field.dataset.individualField; }))
    };
    const groupPacketKeys = new Set(Array.from(fieldKeys.group).filter(function (key) { return key !== "group-members"; }));
    const surface = root.querySelector(".ethics-surface");
    let statusTimer;

    function blankState() {
      return {
        version: VERSION,
        stage: "primer",
        baselineLocked: false,
        baselineLockedAt: "",
        baseline: {},
        group: {},
        individual: {},
        savedAt: ""
      };
    }

    function canStore() {
      try {
        const key = storageKey + ":test";
        window.localStorage.setItem(key, "1");
        window.localStorage.removeItem(key);
        return true;
      } catch (error) {
        return false;
      }
    }

    const storageEnabled = canStore();

    function loadState() {
      if (!storageEnabled) return blankState();
      try {
        const saved = JSON.parse(window.localStorage.getItem(storageKey));
        if (!validateSessionState(saved)) return blankState();
        return normalizeState(saved);
      } catch (error) {
        return blankState();
      }
    }

    let state = loadState();

    function announce(message, persistent) {
      if (!status) return;
      window.clearTimeout(statusTimer);
      status.textContent = message;
      if (!persistent) {
        statusTimer = window.setTimeout(function () {
          status.textContent = storageEnabled
            ? "Your work stays in this browser."
            : "Browser storage is unavailable. Download backups often.";
        }, 3000);
      }
    }

    function saveState(message) {
      state.savedAt = new Date().toISOString();
      if (storageEnabled) {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(state));
          announce(message || "Saved locally.");
          return;
        } catch (error) {
          announce("Local saving failed. Download a backup before leaving this page.", true);
          return;
        }
      }
      announce("Browser storage is unavailable. Download a backup before leaving this page.", true);
    }

    function fieldValue(field) {
      if (field.type === "checkbox") return field.checked;
      if (field.type === "radio") return field.checked ? field.value : undefined;
      return field.value;
    }

    function restoreField(field, source, key) {
      if (!(key in source)) return;
      if (field.type === "checkbox") field.checked = Boolean(source[key]);
      else if (field.type === "radio") field.checked = source[key] === field.value;
      else field.value = source[key] == null ? "" : source[key];
    }

    function clearField(field) {
      if (field.type === "checkbox" || field.type === "radio") field.checked = false;
      else field.value = "";
    }

    function restoreFieldSet(fields, source, sourceName) {
      fields.forEach(function (field) {
        clearField(field);
        restoreField(field, source, field.dataset[sourceName + "Field"]);
      });
    }

    function bindFields(fields, sourceName) {
      fields.forEach(function (field) {
        const key = field.dataset[sourceName + "Field"];
        restoreField(field, state[sourceName], key);
        const eventName = field.type === "checkbox" || field.type === "radio" || field.tagName === "SELECT" ? "change" : "input";
        field.addEventListener(eventName, function () {
          const value = fieldValue(field);
          if (value !== undefined) state[sourceName][key] = value;
          if (sourceName === "baseline") updateAllocationTotal();
          if (sourceName === "group") updateCriticPrompt();
          updateProgress();
          saveState();
        });
      });
    }

    bindFields(baselineFields, "baseline");
    bindFields(groupFields, "group");
    bindFields(individualFields, "individual");

    function selectedPrinciples() {
      return baselineFields.filter(function (field) {
        return field.type === "checkbox" && /^q1-/.test(field.dataset.baselineField) && field.checked;
      }).map(function (field) { return field.value; });
    }

    function nonempty(value) {
      return Boolean(String(value == null ? "" : value).trim());
    }

    function allocationTotal() {
      return ["q5-student", "q5-instructor", "q5-university"].reduce(function (sum, key) {
        const value = Number(state.baseline[key]);
        return sum + (Number.isFinite(value) ? value : 0);
      }, 0);
    }

    function updateAllocationTotal() {
      const output = document.getElementById("q5-total");
      if (!output) return;
      const total = allocationTotal();
      output.textContent = "Total: " + total;
      output.classList.toggle("is-valid", total === 100);
    }

    function baselineValidation() {
      const principles = selectedPrinciples();
      const checks = [
        { valid: principles.length > 0 && principles.length <= 2, target: root.querySelector('[data-baseline-field="q1-transparency"]'), message: "Select one or two ethical principles." },
        { valid: nonempty(state.baseline["q1-reason"]), target: document.getElementById("q1-reason"), message: "Explain why the selected principles matter." },
        { valid: nonempty(state.baseline["q2-verdict"]), target: root.querySelector('[name="q2-verdict"]'), message: "Choose an initial verdict." },
        { valid: nonempty(state.baseline["q2-reason"]), target: document.getElementById("q2-reason"), message: "Justify the initial verdict." },
        { valid: nonempty(state.baseline["q3-evidence"]), target: document.getElementById("q3-evidence"), message: "Name the missing evidence." },
        { valid: nonempty(state.baseline["q4-for"]), target: document.getElementById("q4-for"), message: "Give the strongest argument for a ban." },
        { valid: nonempty(state.baseline["q4-against"]), target: document.getElementById("q4-against"), message: "Give the strongest argument against a ban." },
        { valid: allocationTotal() === 100, target: document.getElementById("q5-student"), message: "Allocate exactly 100 responsibility points." },
        { valid: nonempty(state.baseline["q5-reason"]), target: document.getElementById("q5-reason"), message: "Explain the largest accountability allocation." },
        { valid: nonempty(state.baseline["baseline-confidence"]), target: root.querySelector('[name="baseline-confidence"]'), message: "Record your confidence." },
        { valid: state.baseline["baseline-confirm"] === true, target: document.getElementById("baseline-confirm"), message: "Confirm that the baseline was completed without generative AI." }
      ];
      return checks.find(function (check) { return !check.valid; }) || null;
    }

    function applyBaselineLock() {
      baselineFields.forEach(function (field) { field.disabled = state.baselineLocked; });
      const lockButton = document.getElementById("baseline-lock");
      const lockState = document.getElementById("baseline-lock-state");
      if (lockButton) {
        lockButton.disabled = state.baselineLocked;
        lockButton.textContent = state.baselineLocked ? "Baseline snapshot created" : "Create baseline snapshot";
      }
      if (lockState) {
        lockState.textContent = state.baselineLocked
          ? "Snapshot created " + formatDate(state.baselineLockedAt) + ". Reset the full activity to begin a different baseline."
          : "Not yet saved as a snapshot.";
      }
    }

    function lockBaseline() {
      if (state.baselineLocked) return;
      const problem = baselineValidation();
      if (problem) {
        announce(problem.message, true);
        if (problem.target) problem.target.focus();
        return;
      }
      state.baselineLocked = true;
      state.baselineLockedAt = new Date().toISOString();
      applyBaselineLock();
      updateProgress();
      saveState("Baseline snapshot created. AI use may begin after group brainstorming.");
    }

    function stageAllowed(stageName) {
      return state.baselineLocked || stageName === "primer" || stageName === "baseline";
    }

    function showStage(stageName, options) {
      const target = stageNames.has(stageName) ? stageName : "primer";
      if (!stageAllowed(target)) {
        announce("Create your individual baseline snapshot before opening group stages.", true);
        return;
      }
      state.stage = target;
      stages.forEach(function (stage) { stage.classList.toggle("is-active", stage.dataset.stage === target); });
      navButtons.forEach(function (button) {
        button.classList.toggle("is-active", button.dataset.go === target);
        if (button.dataset.go === target) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
      updateLedger(target);
      if (target === "critic") updateCriticPrompt();
      if (target === "report") syncReportIdentity();
      saveState("Opened " + target + ".");
      if (!options || !options.initial) {
        window.requestAnimationFrame(function () {
          if (surface) surface.focus({ preventScroll: true });
          if (surface) surface.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }

    function questionComplete(questionId) {
      const g = state.group;
      const b = state.baseline;
      const checks = {
        q1: selectedPrinciples().length > 0 && nonempty(b["q1-reason"]),
        q2: nonempty(b["q2-verdict"]) && nonempty(b["q2-reason"]),
        q3: nonempty(b["q3-evidence"]),
        q4: nonempty(b["q4-for"]) && nonempty(b["q4-against"]),
        q5: allocationTotal() === 100 && nonempty(b["q5-reason"]),
        q6: nonempty(g["q6-allowed"]) && nonempty(g["q6-borderline"]) && nonempty(g["q6-prohibited"]),
        q7: nonempty(g["q7-vague"]),
        q8: nonempty(g["q8-fairness"]) && nonempty(g["q8-clause"]),
        q9: nonempty(g["q9-principle"]) && nonempty(g["q9-practice"]),
        q10: nonempty(g["q10-prohibited"]) && nonempty(g["q10-permission"]) && nonempty(g["q10-response"]),
        q11: nonempty(g["q11-rule"]) && nonempty(g["q11-judgment"]),
        q12: nonempty(g["q12-evidence"]) && nonempty(g["q12-test"]),
        q13: nonempty(g["q13-counterargument"]) && nonempty(g["q13-revision"])
      };
      return Boolean(checks[questionId]);
    }

    function updateProgress() {
      let complete = 0;
      for (let index = 1; index <= 13; index += 1) {
        if (questionComplete("q" + index)) complete += 1;
      }
      const progress = document.getElementById("ethics-question-progress");
      if (progress) progress.textContent = complete + " of 13";

      const stageChecks = {
        baseline: state.baselineLocked,
        group: nonempty(state.group["group-provisional"]),
        access: questionComplete("q6") && questionComplete("q7") && questionComplete("q8"),
        privacy: questionComplete("q9") && questionComplete("q10"),
        accountability: questionComplete("q11") && questionComplete("q12"),
        critic: questionComplete("q13") && nonempty(state.group["ai-accepted"]) && nonempty(state.group["ai-rejected"]),
        defense: ["policy-allow", "policy-disclose", "policy-protect", "policy-assess"].every(function (key) { return nonempty(state.group[key]); }),
        report: nonempty(state.individual["reasoning-change"])
      };
      navButtons.forEach(function (button) {
        button.classList.toggle("is-complete", Boolean(stageChecks[button.dataset.go]));
      });
      root.querySelectorAll("[data-ledger-stage]").forEach(function (item) {
        item.classList.toggle("is-complete", Boolean(stageChecks[item.dataset.ledgerStage]));
      });
    }

    function updateLedger(stageName) {
      const conceptMap = {
        primer: "baseline",
        baseline: "baseline",
        group: "baseline",
        access: "access",
        privacy: "privacy",
        accountability: "accountability",
        critic: "critic",
        defense: "defense",
        report: "defense"
      };
      root.querySelectorAll("[data-ledger-stage]").forEach(function (item) {
        item.classList.toggle("is-current", item.dataset.ledgerStage === conceptMap[stageName]);
      });
    }

    function valueOrBlank(source, key) {
      return String(source[key] == null ? "" : source[key]).trim();
    }

    function updateCriticPrompt() {
      const prompt = document.getElementById("ai-prompt");
      if (!prompt) return;
      const group = state.group;
      prompt.value = [
        "Act as a skeptical ethics critic. Do not use tools, browse, or claim that you have read sources not included here.",
        "",
        "FICTIONAL CASE",
        "A professor permits responsible AI use but does not define it. A student submits a polished report with vague disclosure and cannot defend two claims. The student used a stronger paid model than some classmates and uploaded instructor feedback, a peer draft, and unpublished course material to an unapproved service.",
        "",
        "OUR PROVISIONAL POLICY",
        valueOrBlank(group, "group-provisional") || "Not supplied.",
        "",
        "OUR CURRENT CLAUSES",
        "Access: " + (valueOrBlank(group, "q8-clause") || "Not supplied."),
        "Privacy: " + (valueOrBlank(group, "q10-prohibited") || "Not supplied."),
        "Rules: " + (valueOrBlank(group, "q11-rule") || "Not supplied."),
        "Evidence of learning: " + (valueOrBlank(group, "q12-evidence") || "Not supplied."),
        "",
        "TASK",
        "1. Identify the two strongest assumptions or failure cases in this policy.",
        "2. Give one counterexample involving fairness, privacy, accountability, or evidence of learning.",
        "3. Distinguish a policy defect from a case where human judgment is still required.",
        "4. Suggest one targeted revision, not a replacement policy.",
        "5. Label uncertainty. Do not invent claims about Jobin, Correa, Giarmoleo, or Groen."
      ].join("\n");
    }

    function formatDate(value) {
      if (!value) return "not recorded";
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? "not recorded" : date.toLocaleString();
    }

    function downloadFile(name, contents, type) {
      const blob = new Blob([contents], { type: type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }

    function backupPayload() {
      return {
        kind: BACKUP_KIND,
        version: VERSION,
        exportedAt: new Date().toISOString(),
        state: state
      };
    }

    function validStrings(value, depth) {
      if (depth > 8) return false;
      if (typeof value === "string") return value.length <= 12000;
      if (typeof value === "number" || typeof value === "boolean" || value == null) return true;
      if (Array.isArray(value)) return value.length <= 100 && value.every(function (item) { return validStrings(item, depth + 1); });
      if (typeof value === "object") {
        const keys = Object.keys(value);
        return keys.length <= 250 && keys.every(function (key) { return key.length <= 100 && validStrings(value[key], depth + 1); });
      }
      return false;
    }

    function isPlainRecord(value) {
      return Boolean(value) && typeof value === "object" && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
    }

    function validFieldMap(value, allowedKeys) {
      if (!isPlainRecord(value)) return false;
      return Object.keys(value).every(function (key) {
        const fieldValue = value[key];
        return allowedKeys.has(key) && (typeof fieldValue === "string" || typeof fieldValue === "number" || typeof fieldValue === "boolean") && validStrings(fieldValue, 0);
      });
    }

    function validateSessionState(candidate) {
      return isPlainRecord(candidate)
        && candidate.version === VERSION
        && (candidate.stage == null || stageNames.has(candidate.stage))
        && (candidate.baselineLocked == null || typeof candidate.baselineLocked === "boolean")
        && (candidate.baselineLockedAt == null || typeof candidate.baselineLockedAt === "string")
        && (candidate.savedAt == null || typeof candidate.savedAt === "string")
        && validFieldMap(candidate.baseline, fieldKeys.baseline)
        && validFieldMap(candidate.group, fieldKeys.group)
        && validFieldMap(candidate.individual, fieldKeys.individual)
        && validStrings(candidate, 0);
    }

    function copyKnownFields(source, allowedKeys) {
      const copy = {};
      Object.keys(source).forEach(function (key) {
        if (allowedKeys.has(key)) copy[key] = source[key];
      });
      return copy;
    }

    function normalizeState(candidate) {
      const normalized = blankState();
      normalized.stage = stageNames.has(candidate.stage) ? candidate.stage : "primer";
      normalized.baselineLocked = candidate.baselineLocked === true;
      normalized.baselineLockedAt = typeof candidate.baselineLockedAt === "string" ? candidate.baselineLockedAt : "";
      normalized.savedAt = typeof candidate.savedAt === "string" ? candidate.savedAt : "";
      normalized.baseline = copyKnownFields(candidate.baseline, fieldKeys.baseline);
      normalized.group = copyKnownFields(candidate.group, fieldKeys.group);
      normalized.individual = copyKnownFields(candidate.individual, fieldKeys.individual);
      return normalized;
    }

    function validateBackup(payload) {
      return isPlainRecord(payload) && payload.kind === BACKUP_KIND && payload.version === VERSION && validateSessionState(payload.state);
    }

    function restoreAllFields() {
      restoreFieldSet(baselineFields, state.baseline, "baseline");
      restoreFieldSet(groupFields, state.group, "group");
      restoreFieldSet(individualFields, state.individual, "individual");
      applyBaselineLock();
      updateAllocationTotal();
      updateCriticPrompt();
      updateProgress();
      showStage(state.stage, { initial: true });
    }

    function restoreBackup(file) {
      if (!file || file.size > 1024 * 1024) {
        announce("Choose a JSON backup smaller than 1 MB.", true);
        return;
      }
      const reader = new FileReader();
      reader.onload = function () {
        try {
          const payload = JSON.parse(String(reader.result));
          if (!validateBackup(payload)) throw new Error("Unsupported or malformed backup");
          const meta = "Backup exported " + formatDate(payload.exportedAt) + ". It will replace the work currently stored in this browser.";
          if (!window.confirm(meta + " Continue?")) return;
          state = normalizeState(payload.state);
          restoreAllFields();
          saveState("Backup restored. Locked baselines remain locked.");
        } catch (error) {
          announce("That file is not a valid version 1 AI ethics session backup. Current work was not changed.", true);
        }
      };
      reader.readAsText(file);
    }

    function groupPacketPayload() {
      return {
        kind: GROUP_KIND,
        version: VERSION,
        exportedAt: new Date().toISOString(),
        group: copyKnownFields(state.group, groupPacketKeys)
      };
    }

    function validateGroupPacket(payload) {
      return isPlainRecord(payload) && payload.kind === GROUP_KIND && payload.version === VERSION && validFieldMap(payload.group, groupPacketKeys);
    }

    function mergeGroupPacket(text) {
      try {
        const payload = JSON.parse(text);
        if (!validateGroupPacket(payload)) throw new Error("Invalid group packet");
        const currentHasGroupWork = Object.values(state.group).some(nonempty);
        if (currentHasGroupWork && !window.confirm("Merge this packet into your group-authored fields? Matching answers will be replaced; omitted answers, identity fields, your individual baseline, and your reflection will remain unchanged.")) return;
        state.group = Object.assign({}, state.group, copyKnownFields(payload.group, groupPacketKeys));
        restoreFieldSet(groupFields, state.group, "group");
        syncReportIdentity();
        updateCriticPrompt();
        updateProgress();
        saveState("Group packet merged. Omitted and individual fields were preserved.");
      } catch (error) {
        announce("The group packet is invalid. No work was changed.", true);
      }
    }

    function copyText(text, successMessage) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { announce(successMessage); }).catch(function () { fallbackCopy(text, successMessage); });
      } else {
        fallbackCopy(text, successMessage);
      }
    }

    function fallbackCopy(text, successMessage) {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const copied = document.execCommand("copy");
      area.remove();
      announce(copied ? successMessage : "Copy was blocked. Select and copy the text manually.", !copied);
    }

    function syncReportIdentity() {
      if (!state.individual["report-group-letter"] && state.group["group-letter"]) {
        state.individual["report-group-letter"] = state.group["group-letter"];
        const field = document.getElementById("report-group-letter");
        if (field) field.value = state.group["group-letter"];
      }
      if (!state.individual["report-group-members"] && state.group["group-members"]) {
        state.individual["report-group-members"] = state.group["group-members"];
        const field = document.getElementById("report-group-members");
        if (field) field.value = state.group["group-members"];
      }
    }

    function reportData() {
      const b = state.baseline;
      const g = state.group;
      const i = state.individual;
      return [
        {
          title: "Submission identity",
          authorship: "Individual identifying information",
          fields: [
            ["Student name", valueOrBlank(i, "student-name")],
            ["eCampus username or student ID", valueOrBlank(i, "ecampus-id")],
            ["Group letter", valueOrBlank(i, "report-group-letter") || valueOrBlank(g, "group-letter")],
            ["Group members", valueOrBlank(i, "report-group-members") || valueOrBlank(g, "group-members")]
          ]
        },
        {
          title: "Part A: Pre-AI baseline snapshot",
          authorship: "Individual, completed before AI",
          fields: [
            ["Q1. Ethical principles and reasoning", selectedPrinciples().join(", ") + (nonempty(b["q1-reason"]) ? "\n" + b["q1-reason"] : "")],
            ["Q2. Initial verdict and justification", valueOrBlank(b, "q2-verdict") + (nonempty(b["q2-reason"]) ? "\n" + b["q2-reason"] : "")],
            ["Q3. Evidence needed", valueOrBlank(b, "q3-evidence")],
            ["Q4. Strongest arguments for and against a ban", "For: " + valueOrBlank(b, "q4-for") + "\nAgainst: " + valueOrBlank(b, "q4-against")],
            ["Q5. Initial accountability allocation", "Student: " + valueOrBlank(b, "q5-student") + "; Instructor: " + valueOrBlank(b, "q5-instructor") + "; University: " + valueOrBlank(b, "q5-university") + "\n" + valueOrBlank(b, "q5-reason")],
            ["Initial confidence", valueOrBlank(b, "baseline-confidence")],
            ["Baseline snapshot time", formatDate(state.baselineLockedAt)]
          ]
        },
        {
          title: "Part B: Group policy stress test",
          authorship: "Group-authored",
          fields: [
            ["Q6. Allowed, borderline, and prohibited uses", "Allowed: " + valueOrBlank(g, "q6-allowed") + "\nBorderline: " + valueOrBlank(g, "q6-borderline") + "\nProhibited: " + valueOrBlank(g, "q6-prohibited")],
            ["Q7. Why responsible use is too vague", valueOrBlank(g, "q7-vague")],
            ["Q8. Access and fairness decision", valueOrBlank(g, "q8-fairness") + "\nClause: " + valueOrBlank(g, "q8-clause")],
            ["Q9. Principles translated into practice", valueOrBlank(g, "q9-principle") + "\nImplementation: " + valueOrBlank(g, "q9-practice")],
            ["Q10. Privacy and permission rule", "Prohibited: " + valueOrBlank(g, "q10-prohibited") + "\nPermission: " + valueOrBlank(g, "q10-permission") + "\nResponse: " + valueOrBlank(g, "q10-response")],
            ["Q11. Act-centered and agent-centered response", "Rule: " + valueOrBlank(g, "q11-rule") + "\nCapability: " + valueOrBlank(g, "q11-judgment")],
            ["Q12. Evidence that learning occurred", valueOrBlank(g, "q12-evidence") + "\nExplain / verify / adapt / defend: " + valueOrBlank(g, "q12-test")],
            ["Decision ledger", "Access decision: " + valueOrBlank(g, "q8-fairness") + "\nPrivacy decision: " + valueOrBlank(g, "q10-prohibited") + "\nAccountability revision: " + valueOrBlank(g, "accountability-revision")]
          ]
        },
        {
          title: "Part C: AI-assisted critique",
          authorship: "AI-assisted, evaluated by students",
          fields: [
            ["AI tool and purpose", "Claude in the browser, used to criticize the group policy"],
            ["Prompt used", document.getElementById("ai-prompt") ? document.getElementById("ai-prompt").value : ""],
            ["Relevant AI critique", valueOrBlank(g, "ai-output")],
            ["Advice accepted and why", valueOrBlank(g, "ai-accepted")],
            ["Advice rejected and why", valueOrBlank(g, "ai-rejected")],
            ["Claims checked and verification method", valueOrBlank(g, "ai-verified")],
            ["Q13. Strongest counterargument and revision", valueOrBlank(g, "q13-counterargument") + "\nRevision or defense: " + valueOrBlank(g, "q13-revision")]
          ]
        },
        {
          title: "Part D: Final group policy",
          authorship: "Group-authored",
          fields: [
            ["Allow", valueOrBlank(g, "policy-allow")],
            ["Disclose", valueOrBlank(g, "policy-disclose")],
            ["Protect", valueOrBlank(g, "policy-protect")],
            ["Assess", valueOrBlank(g, "policy-assess")],
            ["Cross-group challenge and response", "Counterexample: " + valueOrBlank(g, "cross-counterexample") + "\nDefense or revision: " + valueOrBlank(g, "cross-response")]
          ]
        },
        {
          title: "Part E: Individual reflection and paper application",
          authorship: "Individual",
          fields: [
            ["Final verdict", valueOrBlank(i, "final-verdict")],
            ["What changed and why", valueOrBlank(i, "reasoning-change")],
            ["Remaining uncertainty", valueOrBlank(i, "remaining-uncertainty")],
            ["Jobin et al. application", valueOrBlank(i, "jobin-application")],
            ["Corrêa et al. application", valueOrBlank(i, "correa-application")],
            ["Giarmoleo et al. application", valueOrBlank(i, "giarmoleo-application")],
            ["Groen et al. application", valueOrBlank(i, "groen-application")],
            ["Student declaration", i["student-declaration"] === true ? "Confirmed" : "Not yet confirmed"]
          ]
        }
      ];
    }

    function createElement(tag, className, text) {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (text != null) element.textContent = text;
      return element;
    }

    function buildReportPreview() {
      syncReportIdentity();
      const preview = document.getElementById("ethics-report-preview");
      if (!preview) return;
      preview.replaceChildren();
      preview.appendChild(createElement("h2", "", "AI Ethics Policy Lab Report"));
      preview.appendChild(createElement("p", "report-meta", "Generated " + new Date().toLocaleString() + " | Submit to eCampus within three days of class"));

      reportData().forEach(function (section) {
        preview.appendChild(createElement("h3", "", section.title));
        preview.appendChild(createElement("span", "report-authorship", section.authorship));
        section.fields.forEach(function (field) {
          preview.appendChild(createElement("h4", "", field[0]));
          const value = String(field[1] == null ? "" : field[1]).trim();
          preview.appendChild(createElement("p", value ? "" : "report-missing", value || "Not completed."));
        });
      });

      preview.appendChild(createElement("h3", "", "References"));
      [
        "Jobin, A., Ienca, M., & Vayena, E. (2019). The global landscape of AI ethics guidelines. Nature Machine Intelligence, 1, 389-399.",
        "Correa, N. K., et al. (2023). Worldwide AI Ethics: A review of 200 guidelines and recommendations for AI governance. Patterns, 4(10), 100857.",
        "Giarmoleo, G., Ferrero, I., Rocchi, M., & Pellegrini, M. M. (2024). What ethics can say on artificial intelligence. Business and Society Review.",
        "Groen, E. M., Sharon, T., & Becker, M. (2026). An overview of AI ethics. AI and Ethics, 6, Article 121."
      ].forEach(function (reference) { preview.appendChild(createElement("p", "", reference)); });
      announce("Report preview rebuilt. Inspect missing fields before printing.");
      return preview;
    }

    function reportAsText() {
      const lines = ["AI ETHICS POLICY LAB REPORT", "Generated: " + new Date().toLocaleString(), ""];
      reportData().forEach(function (section) {
        lines.push(section.title.toUpperCase());
        lines.push("Authorship: " + section.authorship);
        lines.push("");
        section.fields.forEach(function (field) {
          lines.push(field[0]);
          lines.push(String(field[1] || "Not completed."));
          lines.push("");
        });
      });
      lines.push("REFERENCES");
      lines.push("See the classroom webpage and linked four-paper source cards.");
      return lines.join("\n");
    }

    function requiredReportMissing() {
      const i = state.individual;
      const g = state.group;
      return [
        i["student-name"], i["ecampus-id"], i["report-group-letter"],
        i["final-verdict"], i["reasoning-change"], i["remaining-uncertainty"],
        i["jobin-application"], i["correa-application"], i["giarmoleo-application"], i["groen-application"],
        g["policy-allow"], g["policy-disclose"], g["policy-protect"], g["policy-assess"]
      ].some(function (value) { return !nonempty(value); }) || i["student-declaration"] !== true;
    }

    function printReport() {
      buildReportPreview();
      if (requiredReportMissing() && !window.confirm("The report still has required fields marked 'Not completed.' Print anyway?")) {
        announce("Complete the missing report fields, then rebuild the preview.", true);
        return;
      }
      document.body.classList.add("ethics-print-report");
      window.print();
    }

    const stageActionButtons = Array.from(root.querySelectorAll("[data-go]")).filter(function (button) {
      return !button.closest(".ethics-stage-nav");
    });
    navButtons.concat(stageActionButtons).forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        showStage(button.dataset.go);
      });
    });

    const lockButton = document.getElementById("baseline-lock");
    if (lockButton) lockButton.addEventListener("click", lockBaseline);

    const backupButton = document.getElementById("ethics-backup");
    if (backupButton) backupButton.addEventListener("click", function () {
      downloadFile("ai-ethics-classroom-session.json", JSON.stringify(backupPayload(), null, 2), "application/json;charset=utf-8");
      announce("Session backup downloaded.");
    });

    const restoreInput = document.getElementById("ethics-restore");
    if (restoreInput) restoreInput.addEventListener("change", function () {
      restoreBackup(restoreInput.files && restoreInput.files[0]);
      restoreInput.value = "";
    });

    const resetButton = document.getElementById("ethics-reset");
    if (resetButton) resetButton.addEventListener("click", function () {
      if (!window.confirm("Reset all individual, group, AI, and report work stored in this browser? Download a backup first if you need it.")) return;
      if (storageEnabled) window.localStorage.removeItem(storageKey);
      window.location.reload();
    });

    const copyPromptButton = document.getElementById("copy-ai-prompt");
    if (copyPromptButton) copyPromptButton.addEventListener("click", function () {
      updateCriticPrompt();
      copyText(document.getElementById("ai-prompt").value, "Critic prompt copied.");
    });

    const copyGroupButton = document.getElementById("copy-group-packet");
    if (copyGroupButton) copyGroupButton.addEventListener("click", function () {
      copyText(JSON.stringify(groupPacketPayload()), "Group packet copied. Share it only with your group members.");
    });

    const downloadGroupButton = document.getElementById("download-group-packet");
    if (downloadGroupButton) downloadGroupButton.addEventListener("click", function () {
      downloadFile("ai-ethics-group-packet.json", JSON.stringify(groupPacketPayload(), null, 2), "application/json;charset=utf-8");
      announce("Group packet downloaded.");
    });

    const importGroupButton = document.getElementById("import-group-packet");
    if (importGroupButton) importGroupButton.addEventListener("click", function () {
      mergeGroupPacket(document.getElementById("group-packet-import").value);
    });

    const buildReportButton = document.getElementById("build-report");
    if (buildReportButton) buildReportButton.addEventListener("click", buildReportPreview);

    const downloadTextButton = document.getElementById("download-report-text");
    if (downloadTextButton) downloadTextButton.addEventListener("click", function () {
      buildReportPreview();
      const name = valueOrBlank(state.individual, "student-name").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "student";
      downloadFile(name + "-ai-ethics-report-draft.txt", reportAsText(), "text/plain;charset=utf-8");
      announce("Editable report draft downloaded.");
    });

    const printButton = document.getElementById("print-report");
    if (printButton) printButton.addEventListener("click", printReport);
    window.addEventListener("afterprint", function () { document.body.classList.remove("ethics-print-report"); });

    applyBaselineLock();
    updateAllocationTotal();
    updateCriticPrompt();
    updateProgress();
    showStage(stageNames.has(state.stage) ? state.stage : "primer", { initial: true });
  }

  function initializeFacilitator(root) {
    root.classList.add("ethics-js");
    const totalSeconds = 70 * 60;
    const rows = Array.from(root.querySelectorAll("[data-duration]"));
    const display = document.getElementById("facilitator-time");
    const current = document.getElementById("facilitator-current");
    const startButton = document.getElementById("facilitator-start");
    const pauseButton = document.getElementById("facilitator-pause");
    const resetButton = document.getElementById("facilitator-reset");
    const nextButton = document.getElementById("facilitator-next");
    let elapsed = 0;
    let timer = null;

    function cumulativeStart(index) {
      return rows.slice(0, index).reduce(function (sum, row) { return sum + Number(row.dataset.duration) * 60; }, 0);
    }

    function currentIndex() {
      let boundary = 0;
      for (let index = 0; index < rows.length; index += 1) {
        boundary += Number(rows[index].dataset.duration) * 60;
        if (elapsed < boundary) return index;
      }
      return rows.length - 1;
    }

    function render() {
      const remaining = Math.max(0, totalSeconds - elapsed);
      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;
      if (display) display.textContent = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
      const index = currentIndex();
      rows.forEach(function (row, rowIndex) { row.classList.toggle("is-current", rowIndex === index); });
      if (current && rows[index]) current.textContent = rows[index].dataset.title || "Class complete";
      if (elapsed >= totalSeconds) pause();
    }

    function start() {
      if (timer || elapsed >= totalSeconds) return;
      timer = window.setInterval(function () {
        elapsed += 1;
        render();
      }, 1000);
      if (startButton) startButton.disabled = true;
      if (pauseButton) pauseButton.disabled = false;
    }

    function pause() {
      if (timer) window.clearInterval(timer);
      timer = null;
      if (startButton) startButton.disabled = elapsed >= totalSeconds;
      if (pauseButton) pauseButton.disabled = true;
    }

    function reset() {
      pause();
      elapsed = 0;
      render();
    }

    function next() {
      const index = Math.min(currentIndex() + 1, rows.length - 1);
      elapsed = cumulativeStart(index);
      render();
    }

    if (startButton) startButton.addEventListener("click", start);
    if (pauseButton) pauseButton.addEventListener("click", pause);
    if (resetButton) resetButton.addEventListener("click", reset);
    if (nextButton) nextButton.addEventListener("click", next);
    render();
  }
})();
