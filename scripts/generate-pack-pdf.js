#!/usr/bin/env node
/**
 * Render an HTML document to PDF using headless Chrome/Edge.
 *
 * Why not just Ctrl+P? The print dialog silently drops background graphics
 * unless you tick a box, ignores custom page sizes on some platforms, and
 * gives no repeatable output. This does the same job deterministically.
 *
 *   node scripts/generate-pack-pdf.js
 *   node scripts/generate-pack-pdf.js docs/other.html docs/other.pdf
 *
 * Page size, margins and pagination all come from the @page / @media print
 * rules inside the HTML file itself, so edit the CSS, not this script.
 */

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DEFAULT_INPUT = 'docs/kings-interhigh-welcome-pack.html';
const DEFAULT_OUTPUT = 'docs/kings-interhigh-welcome-pack.pdf';

const CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
];

function findBrowser() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const found = CANDIDATES.find((p) => fs.existsSync(p));
  if (!found) {
    throw new Error(
      'No Chrome or Edge found. Set CHROME_PATH to the executable, e.g.\n' +
      '  CHROME_PATH="/path/to/chrome" node scripts/generate-pack-pdf.js'
    );
  }
  return found;
}

function main() {
  const input = process.argv[2] || DEFAULT_INPUT;
  const output = process.argv[3] || DEFAULT_OUTPUT;

  const inputAbs = path.resolve(input);
  const outputAbs = path.resolve(output);

  if (!fs.existsSync(inputAbs)) {
    console.error(`Input not found: ${inputAbs}`);
    process.exit(1);
  }

  const browser = findBrowser();
  console.log(`Browser : ${browser}`);
  console.log(`Input   : ${inputAbs}`);

  // file:// URL — Windows paths need forward slashes and a leading slash
  const fileUrl = 'file:///' + inputAbs.replace(/\\/g, '/').replace(/^\//, '');

  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',   // no browser-added date/URL furniture
    `--print-to-pdf=${outputAbs}`,
    fileUrl,
  ], { stdio: 'inherit' });

  if (!fs.existsSync(outputAbs)) {
    console.error('Chrome reported success but no PDF was written.');
    process.exit(1);
  }

  const kb = Math.round(fs.statSync(outputAbs).size / 1024);
  console.log(`Output  : ${outputAbs} (${kb} KB)`);
}

main();
