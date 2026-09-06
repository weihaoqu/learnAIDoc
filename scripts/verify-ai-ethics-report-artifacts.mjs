#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const templateDir = path.join(repoRoot, "assets", "templates");
const schema = JSON.parse(fs.readFileSync(path.join(templateDir, "ai-ethics-grill-report-schema.json"), "utf8"));
const scriptText = fs.readFileSync(path.join(repoRoot, "assets", "js", "ai-ethics-grill-classroom.js"), "utf8");
const markdownText = fs.readFileSync(path.join(templateDir, "ai-ethics-grill-report-template.md"), "utf8");
const docxPath = path.join(templateDir, "ai-ethics-grill-report-template.docx");
const pdfPath = path.join(templateDir, "ai-ethics-grill-report-template.pdf");

const tempDir = fs.mkdtempSync("/tmp/ai-ethics-report-check-");
const docxTextPath = path.join(tempDir, "docx.txt");
const pdfTextPath = path.join(tempDir, "pdf.txt");

const docxXml = execFileSync("unzip", ["-p", docxPath, "word/document.xml"], { encoding: "utf8" });
fs.writeFileSync(docxTextPath, docxXml.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&"), "utf8");
execFileSync("pdftotext", [pdfPath, pdfTextPath]);
const docxText = fs.readFileSync(docxTextPath, "utf8");
const pdfText = fs.readFileSync(pdfTextPath, "utf8");

const missing = [];
for (const section of schema.sections) {
  if (!markdownText.includes(section.title)) missing.push(`Markdown section: ${section.title}`);
  if (!docxText.includes(section.title)) missing.push(`DOCX section: ${section.title}`);
  if (!pdfText.includes(section.title)) missing.push(`PDF section: ${section.title}`);
  for (const field of section.fields) {
    if (!scriptText.includes(field.label)) missing.push(`Web report field: ${field.label}`);
    if (!markdownText.includes(field.label)) missing.push(`Markdown field: ${field.label}`);
    if (!docxText.includes(field.label)) missing.push(`DOCX field: ${field.label}`);
    if (!pdfText.includes(field.label)) missing.push(`PDF field: ${field.label}`);
  }
}

fs.rmSync(tempDir, { recursive: true, force: true });

if (missing.length) {
  process.stderr.write("Report artifact parity failed:\n- " + missing.join("\n- ") + "\n");
  process.exit(1);
}

process.stdout.write(`Report artifact parity passed for ${schema.sections.length} sections and ${schema.sections.reduce((sum, section) => sum + section.fields.length, 0)} fields.\n`);
