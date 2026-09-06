#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const assert = require("node:assert/strict");
const { chromium, webkit } = require("playwright");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173/learnAIDoc";
const outputDir = path.resolve(process.env.TEST_OUTPUT_DIR || "/tmp/ai-ethics-grill-test");
fs.mkdirSync(outputDir, { recursive: true });

async function fillBaseline(page) {
  await page.getByRole("button", { name: "Baseline", exact: true }).click();
  await page.locator('[data-baseline-field="q1-transparency"]').check();
  await page.locator('[data-baseline-field="q1-fairness"]').check();
  await page.locator('[data-baseline-field="q1-reason"]').fill("Transparency and fairness matter because the disclosure is vague and access differs.");
  await page.locator('[data-baseline-field="q2-verdict"][value="Borderline"]').check();
  await page.locator('[data-baseline-field="q2-reason"]').fill("The student disclosed some use, but the evidence does not yet establish understanding or the permitted boundary.");
  await page.locator('[data-baseline-field="q3-evidence"]').fill("The assignment's detailed AI instructions and evidence that the student verified the two claims.");
  await page.locator('[data-baseline-field="q4-for"]').fill("A ban can preserve an unaided assessment condition.");
  await page.locator('[data-baseline-field="q4-against"]').fill("A ban can prevent students from learning responsible and productive AI use.");
  await page.locator('[data-baseline-field="q5-student"]').fill("40");
  await page.locator('[data-baseline-field="q5-instructor"]').fill("30");
  await page.locator('[data-baseline-field="q5-university"]').fill("30");
  await page.locator('[data-baseline-field="q5-reason"]').fill("The student controls the submitted work, but the instructor and university created the policy environment.");
  await page.locator('[data-baseline-field="baseline-confidence"][value="3"]').check();
  await page.locator('[data-baseline-field="baseline-confirm"]').check();
  await page.getByRole("button", { name: "Create baseline snapshot" }).click();
  await assertLockedBaseline(page);
}

async function assertLockedBaseline(page) {
  assert.equal(await page.locator('[data-baseline-field="q1-reason"]').isDisabled(), true);
  assert.match(await page.locator("#baseline-lock-state").textContent(), /Snapshot created/);
}

async function fillGroupWork(page) {
  await page.getByRole("button", { name: "Group", exact: true }).click();
  await page.locator('#group-letter').selectOption("A");
  await page.locator('#group-members').fill("Student One, Student Two, Student Three, Student Four");
  await page.locator('#group-disagreement').fill("We disagreed about whether inability to explain two claims was already sufficient for an unacceptable verdict.");
  await page.locator('#group-provisional').fill("AI may support learning when use is disclosed and the student can verify and defend the work.");
  await page.getByRole("button", { name: "Access", exact: true }).click();
  const accessValues = {
    "q6-allowed": "Ask for explanations and counterexamples, then verify them.",
    "q6-borderline": "Use AI-generated ideas after understanding and independently validating them.",
    "q6-prohibited": "Submit generated work the student cannot explain or verify.",
    "q7-vague": "It does not define permitted assistance or adequate disclosure.",
    "q8-fairness": "Paid access benefits wealthier students and burdens students without equivalent tools.",
    "q8-clause": "The university provides an equivalent approved tool or a comparable no-AI pathway."
  };
  for (const [id, value] of Object.entries(accessValues)) {
    await page.locator("#" + id).fill(value);
  }

  await page.getByRole("button", { name: "Privacy", exact: true }).click();
  const privacyValues = {
    "q9-principle": "Transparency requires naming the kind of assistance and its effect on the work.",
    "q9-practice": "Students disclose use; instructors publish examples; the university provides an appeal process.",
    "q10-prohibited": "Do not upload peer drafts, grades, feedback, or unpublished course material.",
    "q10-permission": "Explicit authorization is required before sharing material owned by another person.",
    "q10-response": "Notify the instructor, stop further processing, and follow the university incident process."
  };
  for (const [id, value] of Object.entries(privacyValues)) {
    await page.locator("#" + id).fill(value);
  }

  await page.getByRole("button", { name: "Accountability", exact: true }).click();
  const accountabilityValues = {
    "q11-rule": "Assignments state allowed tools, uses, disclosure, and protected material.",
    "q11-judgment": "Students learn to determine when assistance has replaced understanding.",
    "q12-evidence": "A source check, oral defense, and adaptation of the argument to a new case.",
    "q12-test": "The student must explain claims, verify evidence, adapt the policy, and defend choices.",
    "accountability-revision": "Responsibility is shared because the student owns the submission while the instructor and university own rule clarity."
  };
  for (const [id, value] of Object.entries(accountabilityValues)) {
    await page.locator("#" + id).fill(value);
  }

  await page.getByRole("button", { name: "AI critic", exact: true }).click();
  const criticValues = {
    "ai-output": "The policy may confuse complete disclosure with evidence of learning.",
    "ai-accepted": "We accepted the distinction between disclosure and understanding because our assessment clause was weak.",
    "ai-rejected": "We rejected a universal ban because it would eliminate legitimate learning support.",
    "ai-verified": "We checked the paper summaries and did not use Claude as a source.",
    "q13-counterargument": "A permissive policy can normalize outsourcing even when students produce polished disclosures.",
    "q13-revision": "Require students to demonstrate understanding through explanation, verification, adaptation, and defense."
  };
  for (const [id, value] of Object.entries(criticValues)) {
    await page.locator("#" + id).fill(value);
  }

  await page.getByRole("button", { name: "Defense", exact: true }).click();
  const defenseValues = {
    "cross-counterexample": "A multilingual student uses AI to translate their own argument.",
    "cross-response": "Translation is allowed when ideas remain the student's and the assistance is disclosed.",
    "policy-allow": "Allow explanation, brainstorming, planning, feedback, and translation when the assignment permits them.",
    "policy-disclose": "Disclose the tool, purpose, material contribution, verification, and meaningful rejected advice.",
    "policy-protect": "Do not upload personal data, peer work, feedback, grades, or unauthorized course material.",
    "policy-assess": "Use source checks, presentation, adaptation, and defense to evaluate learning."
  };
  for (const [id, value] of Object.entries(defenseValues)) {
    await page.locator("#" + id).fill(value);
  }
}

async function fillIndividualReport(page) {
  await page.getByRole("button", { name: "Report", exact: true }).click();
  await page.locator('#student-name').fill("Test Student");
  await page.locator('#ecampus-id').fill("student1");
  await page.locator('#report-group-letter').selectOption("A");
  await page.locator('#report-group-members').fill("Student One, Student Two, Student Three, Student Four");
  await page.locator('[data-individual-field="final-verdict"][value="Borderline"]').check();
  await page.locator('#reasoning-change').fill("I moved from an individual blame model to shared accountability with concrete duties.");
  await page.locator('#remaining-uncertainty').fill("How much unaided evidence is proportionate for different assignments remains uncertain.");
  await page.locator('#jobin-application').fill("Because shared principles can hide different definitions, the policy specifies what disclosure contains.");
  await page.locator('#correa-application').fill("The policy assigns duties, procedures, and an incident response rather than stopping at values.");
  await page.locator('#giarmoleo-application').fill("Rules define boundaries while education develops judgment for cases the rules miss.");
  await page.locator('#groen-application').fill("The access clause considers students without paid tools and those who decline AI.");
  await page.locator('#student-declaration').check();
  await page.getByRole("button", { name: "Build report preview" }).click();
}

async function runAxe(page) {
  const axePath = require.resolve("axe-core/axe.min.js");
  await page.addScriptTag({ path: axePath });
  return page.evaluate(async function () {
    return window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } });
  });
}

async function testStudentPage(browserType, browserName) {
  const browser = await browserType.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
  const page = await context.newPage();
  await page.goto(baseUrl + "/wiki/ai-ethics-grill-classroom-lab/", { waitUntil: "networkidle" });

  assert.equal(await page.locator('[data-question]').count(), 13);
  assert.equal(await page.locator('text=13 questions').count() > 0, true);

  await page.getByRole("button", { name: "Access", exact: true }).click();
  assert.equal(await page.locator('[data-stage="access"]').isVisible(), false);
  assert.match(await page.locator('#ethics-save-status').textContent(), /baseline snapshot/);

  await fillBaseline(page);
  await fillGroupWork(page);

  await page.getByRole("button", { name: "AI critic", exact: true }).click();
  const prompt = await page.locator('#ai-prompt').inputValue();
  assert.match(prompt, /AI may support learning/);
  assert.doesNotMatch(prompt, /Student One/);

  await page.getByRole("button", { name: "Defense", exact: true }).click();
  await page.locator('.ethics-group-transfer summary').click();
  const groupDownload = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download group packet" }).click();
  const groupFile = path.join(outputDir, browserName + "-group-packet.json");
  await (await groupDownload).saveAs(groupFile);
  const groupPacket = JSON.parse(fs.readFileSync(groupFile, "utf8"));
  assert.equal(groupPacket.kind, "ai-ethics-classroom-group-packet");
  assert.equal(Object.hasOwn(groupPacket, "baseline"), false);
  assert.equal(Object.hasOwn(groupPacket, "individual"), false);
  assert.equal(Object.hasOwn(groupPacket.group, "group-members"), false);
  const serializedGroupPacket = JSON.stringify(groupPacket);
  assert.doesNotMatch(serializedGroupPacket, /Student One/);
  assert.doesNotMatch(serializedGroupPacket, /student-name|ecampus-id|reasoning-change|baseline-confidence/);

  const backupDownload = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download backup" }).click();
  const backupFile = path.join(outputDir, browserName + "-session.json");
  await (await backupDownload).saveAs(backupFile);
  const backup = JSON.parse(fs.readFileSync(backupFile, "utf8"));
  assert.equal(backup.state.baselineLocked, true);

  const partialPacket = JSON.parse(JSON.stringify(groupPacket));
  delete partialPacket.group["q6-allowed"];
  page.once("dialog", function (dialog) { dialog.accept(); });
  await page.locator("#group-packet-import").fill(JSON.stringify(partialPacket));
  await page.getByRole("button", { name: "Import group answers" }).click();
  assert.match(await page.locator("#q6-allowed").inputValue(), /explanations and counterexamples/);
  assert.match(await page.locator("#group-members").inputValue(), /Student One/);
  assert.equal(await page.locator('[data-baseline-field="q1-reason"]').inputValue(), "Transparency and fairness matter because the disclosure is vague and access differs.");
  await assertLockedBaseline(page);

  page.once("dialog", function (dialog) { dialog.accept(); });
  await page.locator("#group-packet-import").fill(JSON.stringify(groupPacket));
  await page.getByRole("button", { name: "Import group answers" }).click();
  assert.match(await page.locator("#q6-allowed").inputValue(), /explanations and counterexamples/);

  const malformedPacket = JSON.parse(JSON.stringify(groupPacket));
  malformedPacket.group["unknown-field"] = "must be rejected";
  await page.locator("#group-packet-import").fill(JSON.stringify(malformedPacket));
  await page.getByRole("button", { name: "Import group answers" }).click();
  assert.match(await page.locator("#ethics-save-status").textContent(), /invalid/);
  assert.match(await page.locator("#q6-allowed").inputValue(), /explanations and counterexamples/);

  const partialBackup = JSON.parse(JSON.stringify(backup));
  delete partialBackup.state.group["q6-allowed"];
  const partialBackupPath = path.join(outputDir, browserName + "-partial-session.json");
  fs.writeFileSync(partialBackupPath, JSON.stringify(partialBackup));
  page.once("dialog", function (dialog) { dialog.accept(); });
  await page.locator("#ethics-restore").setInputFiles(partialBackupPath);
  await page.waitForFunction(function () { return document.getElementById("ethics-save-status").textContent.includes("Backup restored"); });
  assert.equal(await page.locator("#q6-allowed").inputValue(), "");
  await assertLockedBaseline(page);

  page.once("dialog", function (dialog) { dialog.accept(); });
  await page.locator("#ethics-restore").setInputFiles(backupFile);
  await page.waitForFunction(function () { return document.getElementById("ethics-save-status").textContent.includes("Backup restored"); });
  assert.match(await page.locator("#q6-allowed").inputValue(), /explanations and counterexamples/);
  await assertLockedBaseline(page);

  await fillIndividualReport(page);
  assert.equal(await page.locator('#ethics-report-preview .report-missing').count(), 0);
  const reportText = await page.locator('#ethics-report-preview').innerText();
  assert.match(reportText, /Part A: Pre-AI baseline snapshot/);
  assert.match(reportText, /Part C: AI-assisted critique/);
  assert.match(reportText, /Jobin et al. application/);

  await page.screenshot({ path: path.join(outputDir, browserName + "-desktop.png"), fullPage: true });
  const overflow = await page.evaluate(function () { return document.documentElement.scrollWidth - document.documentElement.clientWidth; });
  assert.equal(overflow <= 1, true, "desktop horizontal overflow: " + overflow);

  if (browserName === "chromium") {
    const axe = await runAxe(page);
    const serious = axe.violations.filter(function (violation) { return violation.impact === "serious" || violation.impact === "critical"; });
    fs.writeFileSync(path.join(outputDir, "axe-results.json"), JSON.stringify(axe, null, 2));
    assert.deepEqual(serious.map(function (violation) { return violation.id; }), []);

    await page.evaluate(function () { document.body.classList.add("ethics-print-report"); });
    await page.pdf({ path: path.join(outputDir, "student-report.pdf"), format: "Letter", printBackground: true, margin: { top: "0.65in", right: "0.65in", bottom: "0.65in", left: "0.65in" } });
    await page.evaluate(function () { document.body.classList.remove("ethics-print-report"); });
  }

  await context.close();

  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(baseUrl + "/wiki/ai-ethics-grill-classroom-lab/", { waitUntil: "networkidle" });
  await mobilePage.screenshot({ path: path.join(outputDir, browserName + "-mobile.png"), fullPage: true });
  const mobileOverflow = await mobilePage.evaluate(function () { return document.documentElement.scrollWidth - document.documentElement.clientWidth; });
  assert.equal(mobileOverflow <= 1, true, "mobile horizontal overflow: " + mobileOverflow);
  await mobileContext.close();

  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1024, height: 800 } });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(baseUrl + "/wiki/ai-ethics-grill-classroom-lab/", { waitUntil: "load" });
  assert.equal(await noJsPage.locator('[data-stage="primer"]').isVisible(), true);
  assert.equal(await noJsPage.locator('[data-stage="report"]').isVisible(), true);
  assert.equal(await noJsPage.locator('[data-question]').count(), 13);
  await noJsContext.close();
  await browser.close();
}

async function testFacilitator() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  await page.goto(baseUrl + "/wiki/ai-ethics-grill-facilitator/", { waitUntil: "networkidle" });
  const rows = page.locator('[data-duration]');
  assert.equal(await rows.count(), 10);
  const total = await rows.evaluateAll(function (elements) { return elements.reduce(function (sum, element) { return sum + Number(element.dataset.duration); }, 0); });
  assert.equal(total, 70);
  await page.getByRole("button", { name: "Start", exact: true }).click();
  await page.waitForTimeout(1200);
  assert.notEqual(await page.locator('#facilitator-time').textContent(), "70:00");
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  await page.screenshot({ path: path.join(outputDir, "facilitator-desktop.png"), fullPage: true });
  await browser.close();
}

(async function main() {
  await testStudentPage(chromium, "chromium");
  await testStudentPage(webkit, "webkit");
  await testFacilitator();
  process.stdout.write("AI ethics classroom browser tests passed.\n");
})().catch(function (error) {
  process.stderr.write(error.stack + "\n");
  process.exit(1);
});
