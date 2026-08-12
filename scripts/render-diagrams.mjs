import { existsSync, readdirSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = join(root, "assets", "diagrams", "source");
const outputDir = join(root, "assets", "diagrams", "generated");
const mmdc = join(root, "node_modules", ".bin", process.platform === "win32" ? "mmdc.cmd" : "mmdc");
const chromeCandidates = [
  process.env.MERMAID_CHROME_PATH,
  process.env.GOOGLE_CHROME_BIN,
  process.platform === "win32" ? join(process.env.ProgramFiles ?? "", "Google", "Chrome", "Application", "chrome.exe") : null,
  process.platform === "win32" ? join(process.env["ProgramFiles(x86)"] ?? "", "Google", "Chrome", "Application", "chrome.exe") : null,
  process.platform === "win32" ? join(process.env.LocalAppData ?? "", "Google", "Chrome", "Application", "chrome.exe") : null,
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean).find((candidate) => existsSync(candidate));
const temporaryConfig = chromeCandidates ? join(tmpdir(), `mermaid-puppeteer-${process.pid}.json`) : null;

if (temporaryConfig) {
  writeFileSync(temporaryConfig, JSON.stringify({ executablePath: chromeCandidates }));
}

mkdirSync(outputDir, { recursive: true });

const sources = readdirSync(sourceDir)
  .filter((file) => file.endsWith(".mmd"))
  .sort();

if (sources.length === 0) {
  throw new Error(`No Mermaid sources found in ${sourceDir}`);
}

for (const source of sources) {
  const input = join(sourceDir, source);
  const output = join(outputDir, source.replace(/\.mmd$/, ".svg"));
  const args = [
    "--input",
    input,
    "--output",
    output,
    "--backgroundColor",
    "#fcfcfa",
    "--quiet",
  ];
  if (temporaryConfig) args.push("--puppeteerConfigFile", temporaryConfig);

  const result = spawnSync(mmdc, args, {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`Mermaid rendering failed for ${source} (exit ${result.status})`);
  }

  const svg = readFileSync(output, "utf8");
  if (!svg.includes("<svg") || !svg.includes("viewBox") || !svg.includes("</svg>")) {
    throw new Error(`Generated output is not a responsive SVG: ${output}`);
  }

  console.log(`rendered ${source} -> ${output.replace(`${root}${process.platform === "win32" ? "\\" : "/"}`, "")}`);
}

if (temporaryConfig) rmSync(temporaryConfig, { force: true });
