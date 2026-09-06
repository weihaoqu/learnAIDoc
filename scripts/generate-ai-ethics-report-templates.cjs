#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  HeadingLevel,
  LevelFormat,
  Packer,
  PageNumber,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType
} = require("docx");

const repoRoot = path.resolve(__dirname, "..");
const templateDir = path.join(repoRoot, "assets", "templates");
const schemaPath = path.join(templateDir, "ai-ethics-grill-report-schema.json");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const docxPath = path.join(templateDir, "ai-ethics-grill-report-template.docx");
const markdownPath = path.join(templateDir, "ai-ethics-grill-report-template.md");

const colors = {
  ink: "18201F",
  muted: "5B6461",
  green: "176B5B",
  greenSoft: "E4F3EE",
  line: "D7DED9"
};

const border = { style: BorderStyle.SINGLE, size: 1, color: colors.line };
const borders = { top: border, bottom: border, left: border, right: border };

function textParagraph(text, options = {}) {
  return new Paragraph({
    spacing: { after: options.after == null ? 120 : options.after, line: 300 },
    children: [new TextRun({ text, bold: Boolean(options.bold), color: options.color || colors.ink, size: options.size || 22 })]
  });
}

function fieldBlock(field) {
  return [
    new Paragraph({
      keepNext: true,
      spacing: { before: 140, after: 80 },
      children: [new TextRun({ text: field.label, bold: true, color: colors.green, size: 22 })]
    }),
    textParagraph("________________________________________________________________________________", { color: "7D8782", after: 70 }),
    textParagraph("________________________________________________________________________________", { color: "7D8782", after: 70 }),
    textParagraph("________________________________________________________________________________", { color: "7D8782", after: 120 })
  ];
}

function rubricTable() {
  const rows = [
    ["Accurate application of all four papers", "4"],
    ["Visible reasoning revision", "4"],
    ["Specific operational policy", "4"],
    ["Fairness, privacy, access, and power analysis", "3"],
    ["Evaluation rather than copying of AI advice", "3"],
    ["Complete AI-use documentation", "2"]
  ];
  const makeCell = (text, width, header) => new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: header ? { fill: colors.greenSoft, type: ShadingType.CLEAR } : undefined,
    margins: { top: 90, bottom: 90, left: 120, right: 120 },
    children: [textParagraph(text, { bold: header, after: 0, size: 20 })]
  });
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [8000, 1360],
    rows: [
      new TableRow({ children: [makeCell("Criterion", 8000, true), makeCell("Points", 1360, true)] }),
      ...rows.map(([criterion, points]) => new TableRow({ children: [makeCell(criterion, 8000, false), makeCell(points, 1360, false)] }))
    ]
  });
}

const children = [
  new Paragraph({
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.LEFT,
    spacing: { after: 180 },
    children: [new TextRun({ text: schema.title, bold: true, color: colors.ink, size: 42 })]
  }),
  textParagraph("Complete the classroom webpage first. Submit the webpage-generated PDF through eCampus within three days. This template is a fallback when browser export is inaccessible.", { color: colors.muted, size: 21, after: 220 }),
  textParagraph("Authorship key: individual only | group-authored | AI-assisted but student-evaluated", { bold: true, color: colors.green, size: 20, after: 260 })
];

schema.sections.forEach((section) => {
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    pageBreakBefore: section.id !== "identity",
    spacing: { before: 240, after: 100 },
    children: [new TextRun(section.title)]
  }));
  children.push(textParagraph("Authorship: " + section.authorship.replaceAll("-", " "), { color: colors.muted, size: 19, after: 120 }));
  section.fields.forEach((field) => children.push(...fieldBlock(field)));
});

children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: [new TextRun("Report rubric: 20 points")] }));
children.push(rubricTable());
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: [new TextRun("References")] }));
[
  "Jobin, A., Ienca, M., & Vayena, E. (2019). The global landscape of AI ethics guidelines. Nature Machine Intelligence, 1, 389-399.",
  "Correa, N. K., et al. (2023). Worldwide AI Ethics: A review of 200 guidelines and recommendations for AI governance. Patterns, 4(10), 100857.",
  "Giarmoleo, G., Ferrero, I., Rocchi, M., & Pellegrini, M. M. (2024). What ethics can say on artificial intelligence. Business and Society Review.",
  "Groen, E. M., Sharon, T., & Becker, M. (2026). An overview of AI ethics. AI and Ethics, 6, Article 121."
].forEach((reference) => children.push(textParagraph(reference)));

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22, color: colors.ink } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: "Arial", size: 42, bold: true, color: colors.ink }, paragraph: { spacing: { after: 180 }, outlineLevel: 0 } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: "Arial", size: 30, bold: true, color: colors.ink }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } }
    ]
  },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
    }]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1440, bottom: 1080, left: 1440 }
      }
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "AI Ethics Policy Lab | ", color: colors.muted, size: 18 }), new TextRun({ children: [PageNumber.CURRENT], color: colors.muted, size: 18 })] })]
      })
    },
    children
  }]
});

function buildMarkdown() {
  const lines = [
    "# " + schema.title,
    "",
    "Complete the classroom webpage first. Submit the webpage-generated PDF through eCampus within three days. This template is a fallback when browser export is inaccessible.",
    "",
    "**Authorship key:** individual only | group-authored | AI-assisted but student-evaluated",
    ""
  ];
  schema.sections.forEach((section) => {
    lines.push("## " + section.title, "", "**Authorship:** " + section.authorship.replaceAll("-", " "), "");
    section.fields.forEach((field) => {
      lines.push("### " + field.label, "", "________________________________________________________________________________", "", "________________________________________________________________________________", "", "________________________________________________________________________________", "");
    });
  });
  lines.push(
    "## Report rubric: 20 points",
    "",
    "| Criterion | Points |",
    "|---|---:|",
    "| Accurate application of all four papers | 4 |",
    "| Visible reasoning revision | 4 |",
    "| Specific operational policy | 4 |",
    "| Fairness, privacy, access, and power analysis | 3 |",
    "| Evaluation rather than copying of AI advice | 3 |",
    "| Complete AI-use documentation | 2 |",
    "",
    "## References",
    "",
    "- Jobin, A., Ienca, M., & Vayena, E. (2019). *The global landscape of AI ethics guidelines.*",
    "- Correa, N. K., et al. (2023). *Worldwide AI Ethics.*",
    "- Giarmoleo, G., et al. (2024). *What ethics can say on artificial intelligence.*",
    "- Groen, E. M., Sharon, T., & Becker, M. (2026). *An overview of AI ethics.*",
    ""
  );
  return lines.join("\n");
}

fs.writeFileSync(markdownPath, buildMarkdown(), "utf8");
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(docxPath, buffer);
  process.stdout.write(`Generated ${path.relative(repoRoot, markdownPath)}\n`);
  process.stdout.write(`Generated ${path.relative(repoRoot, docxPath)}\n`);
}).catch((error) => {
  process.stderr.write(error.stack + "\n");
  process.exitCode = 1;
});
