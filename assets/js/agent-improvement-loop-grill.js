(function () {
  "use strict";

  const root = document.getElementById("agent-improvement-lab");
  if (!root) return;

  const storageKey = root.dataset.storageKey || "agentImprovementLoopGrill:v1";
  const status = document.getElementById("lab-save-status");
  const surface = root.querySelector(".lab-surface");
  const stages = Array.from(root.querySelectorAll("[data-stage]"));
  const stageNames = new Set(stages.map((stage) => stage.dataset.stage));
  const questions = Array.from(root.querySelectorAll("[data-question]"));
  const navButtons = Array.from(root.querySelectorAll("[data-go]"));
  const railItems = Array.from(root.querySelectorAll(".lab-evidence-rail [data-concept]"));
  const transfer = document.getElementById("lab-transfer");
  const playbook = document.getElementById("lab-playbook");
  let statusTimer;

  const questionMeta = {
    q1: {
      title: "Reconstruct the bounded loop",
      principle: "A useful loop separates verification, diagnosis, revision, and a terminal decision."
    },
    q2: {
      title: "Define the contract",
      principle: "Specify the goal, inspectable evidence, prohibited behavior, budget, and authority before generation."
    },
    q3: {
      title: "Design task-specific verifiers",
      principle: "Verification needs observable evidence and explicit verdict boundaries; reviewer agreement is not truth."
    },
    q4: {
      title: "Diagnose before revising",
      principle: "Candidate coverage and selected-answer reliability are different, and revision must not introduce unsupported reasoning."
    },
    q5: {
      title: "Stop and hand off",
      principle: "When evidence, authority, or budget reaches a boundary, preserve uncertainty instead of silently self-authorizing."
    },
    q6: {
      title: "Make improvement persist",
      principle: "A verified lesson becomes persistent only when it changes a durable component and improves a future held-out task."
    }
  };

  function blankState() {
    return {
      version: 1,
      stage: "intro",
      responses: {},
      compared: {},
      skipped: {},
      transfer: "",
      playbook: ""
    };
  }

  function canStore() {
    try {
      const testKey = storageKey + ":test";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
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
      if (!saved || saved.version !== 1) return blankState();
      return Object.assign(blankState(), saved);
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
          ? "Progress is saved in this browser."
          : "Browser storage is unavailable; progress lasts only for this visit.";
      }, 2600);
    }
  }

  function saveState(message) {
    if (storageEnabled) {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(state));
        announce(message || "Saved locally.");
        return;
      } catch (error) {
        announce("Saving is unavailable; the lesson still works in this tab.", true);
        return;
      }
    }
    announce("Browser storage is unavailable; progress lasts only for this visit.", true);
  }

  function responseFor(questionId) {
    if (!state.responses[questionId]) state.responses[questionId] = {};
    return state.responses[questionId];
  }

  function fieldValue(element) {
    if (element.type === "checkbox") return element.checked;
    if (element.type === "radio") return element.checked ? element.value : undefined;
    return element.value;
  }

  function restoreQuestion(question) {
    const questionId = question.dataset.question;
    const response = responseFor(questionId);
    question.querySelectorAll("[data-field]").forEach(function (field) {
      const key = field.dataset.field;
      if (!(key in response)) return;
      if (field.type === "checkbox") field.checked = Boolean(response[key]);
      else if (field.type === "radio") field.checked = response[key] === field.value;
      else field.value = response[key] || "";
    });

    const feedback = question.querySelector("[data-feedback]");
    const finalResponse = question.querySelector("[data-final-response]");
    const isCompared = Boolean(state.compared[questionId]);
    if (feedback) feedback.hidden = !isCompared;
    if (finalResponse) finalResponse.hidden = !isCompared;
  }

  function isComplete(questionId) {
    const response = responseFor(questionId);
    return Boolean((response.final || "").trim()) || Boolean(state.skipped[questionId]);
  }

  function updateProgress() {
    const activeStage = state.stage;
    root.querySelectorAll(".lab-question-nav [data-go]").forEach(function (button) {
      const target = button.dataset.go;
      button.classList.toggle("is-active", target === activeStage);
      button.classList.toggle("is-complete", /^q[1-6]$/.test(target) && isComplete(target));
      if (target === activeStage) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });

    const active = stages.find((stage) => stage.dataset.stage === activeStage);
    const concept = active ? active.dataset.concept : "";
    railItems.forEach(function (item) {
      item.classList.toggle("is-current", item.dataset.concept === concept);
    });
  }

  function showStage(stageName, options) {
    const targetName = stageNames.has(stageName) ? stageName : "intro";
    state.stage = targetName;
    stages.forEach(function (stage) {
      stage.classList.toggle("is-active", stage.dataset.stage === targetName);
    });
    if (targetName === "finish") refreshPlaybook();
    updateProgress();
    saveState("Progress saved. Opened " + (targetName === "intro" ? "teaching" : targetName) + ".");

    if (!options || !options.initial) {
      window.requestAnimationFrame(function () {
        if (surface) surface.focus({ preventScroll: true });
        if (surface) surface.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function revealFeedback(question) {
    const questionId = question.dataset.question;
    const response = responseFor(questionId);
    const initial = question.querySelector('[data-field="initial"]');
    const diagnosis = question.querySelector('[data-field="diagnosis"]');
    const revealButton = question.querySelector("[data-reveal-feedback]");
    const missingAttempt = !initial.value.trim() || !diagnosis.value.trim();

    if (missingAttempt) {
      announce("Write a first answer and one self-diagnosed weakness before viewing the learner case. You may navigate away without revealing it.", true);
      (!initial.value.trim() ? initial : diagnosis).focus();
      return;
    }

    response.initial = initial.value;
    response.diagnosis = diagnosis.value;
    state.compared[questionId] = true;
    revealButton.textContent = "Learner case revealed";
    revealButton.disabled = true;

    const feedback = question.querySelector("[data-feedback]");
    const finalResponse = question.querySelector("[data-final-response]");
    feedback.hidden = false;
    finalResponse.hidden = false;
    saveState("Comparison revealed after your attempt.");
    window.requestAnimationFrame(function () {
      const heading = feedback.querySelector("[tabindex='-1']");
      if (heading) heading.focus({ preventScroll: true });
      feedback.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function continueFrom(question, nextStage, button) {
    const questionId = question.dataset.question;
    const response = responseFor(questionId);
    const finalAnswer = (response.final || "").trim();
    const changeReason = (response.change || "").trim();

    if ((!finalAnswer || !changeReason) && button.dataset.skipNext !== "true") {
      button.dataset.skipNext = "true";
      button.textContent = "Continue and mark this challenge skipped";
      announce("A final answer and change explanation are missing. Continue again to skip without being trapped.", true);
      const missing = question.querySelector(!finalAnswer ? '[data-field="final"]' : '[data-field="change"]');
      if (missing && !missing.hidden) missing.focus();
      return;
    }

    if (!finalAnswer || !changeReason) state.skipped[questionId] = true;
    else delete state.skipped[questionId];
    state.playbook = "";
    showStage(nextStage);
  }

  function buildPlaybook() {
    const lines = [
      "AGENT IMPROVEMENT LOOP - PERSONAL PLAYBOOK",
      "",
      "Application:",
      state.transfer || "Not specified yet.",
      "",
      "CORE LOOP",
      "Contract -> Attempt -> Verify -> Diagnose -> Revise -> Reverify -> Stop / hand off",
      ""
    ];

    Object.keys(questionMeta).forEach(function (questionId, index) {
      const response = responseFor(questionId);
      const answer = (response.final || response.initial || "No answer recorded.").trim();
      const change = (response.change || "No change explanation recorded.").trim();
      lines.push((index + 1) + ". " + questionMeta[questionId].title.toUpperCase());
      lines.push(answer);
      lines.push("");
      lines.push("Why I changed my answer:");
      lines.push(change);
      lines.push("");
      lines.push("Reusable principle:");
      lines.push(questionMeta[questionId].principle);
      lines.push("");
    });

    lines.push("FINAL CHECK");
    lines.push("What evidence supports completion? What remains uncertain? Who has authority to approve the result?");
    return lines.join("\n");
  }

  function refreshPlaybook() {
    if (!playbook) return;
    if (!state.playbook) state.playbook = buildPlaybook();
    playbook.value = state.playbook;
    autoSize(playbook);
  }

  function autoSize(textarea) {
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = Math.max(textarea.scrollHeight + 2, 120) + "px";
  }

  function copyPlaybook() {
    refreshPlaybook();
    const text = playbook.value;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () {
        announce("Playbook copied.");
      }).catch(function () {
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }
  }

  function fallbackCopy() {
    playbook.focus();
    playbook.select();
    const copied = document.execCommand("copy");
    announce(copied ? "Playbook copied." : "Copy was blocked. Select the playbook text and copy it manually.", !copied);
  }

  function downloadPlaybook() {
    refreshPlaybook();
    const blob = new Blob([playbook.value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "agent-improvement-loop-playbook.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    announce("Playbook downloaded.");
  }

  questions.forEach(function (question) {
    restoreQuestion(question);
    const questionId = question.dataset.question;

    question.querySelectorAll("[data-field]").forEach(function (field) {
      const eventName = field.type === "radio" || field.type === "checkbox" ? "change" : "input";
      field.addEventListener(eventName, function () {
        const value = fieldValue(field);
        if (value !== undefined) responseFor(questionId)[field.dataset.field] = value;
        state.playbook = "";
        saveState();
      });
    });

    const revealButton = question.querySelector("[data-reveal-feedback]");
    if (revealButton) {
      if (state.compared[questionId]) {
        revealButton.textContent = "Learner case revealed";
        revealButton.disabled = true;
      }
      revealButton.addEventListener("click", function () {
        revealFeedback(question);
      });
    }

    const continueButton = question.querySelector("[data-continue]");
    if (continueButton) {
      continueButton.addEventListener("click", function () {
        continueFrom(question, continueButton.dataset.continue, continueButton);
      });
    }
  });

  navButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      showStage(button.dataset.go);
    });
  });

  if (transfer) {
    transfer.value = state.transfer || "";
    transfer.addEventListener("input", function () {
      state.transfer = transfer.value;
      state.playbook = "";
      refreshPlaybook();
      saveState();
    });
  }

  if (playbook) {
    playbook.addEventListener("input", function () {
      state.playbook = playbook.value;
      autoSize(playbook);
      saveState();
    });
  }

  const resetButton = document.getElementById("lab-reset");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      const confirmed = window.confirm("Clear all answers and progress for this learning lab? This cannot be undone.");
      if (!confirmed) return;
      if (storageEnabled) window.localStorage.removeItem(storageKey);
      window.location.reload();
    });
  }

  const copyButton = document.getElementById("lab-copy");
  const downloadButton = document.getElementById("lab-download");
  const printButton = document.getElementById("lab-print");
  if (copyButton) copyButton.addEventListener("click", copyPlaybook);
  if (downloadButton) downloadButton.addEventListener("click", downloadPlaybook);
  if (printButton) {
    printButton.addEventListener("click", function () {
      refreshPlaybook();
      autoSize(playbook);
      window.print();
    });
  }

  document.documentElement.classList.add("lab-js");
  showStage(stageNames.has(state.stage) ? state.stage : "intro", { initial: true });
  announce(storageEnabled
    ? "Progress is saved in this browser."
    : "Browser storage is unavailable; progress lasts only for this visit.", true);
}());
