#!/usr/bin/env node
/**
 * Build a client partnership pack from the shared template.
 *
 *   node scripts/build-pack.js packs/clients/kings-interhigh.json
 *   npm run pack -- packs/clients/kings-interhigh.json
 *
 * Renders packs/template.html with the values in the client JSON, writes
 * docs/<slug>-partnership-pack.html, then generates the PDF from it.
 *
 * To add a client:
 *   1. cp packs/clients/_example.json packs/clients/<slug>.json and fill it in
 *   2. write packs/partials/why-<something>.html    (section 01, their problem)
 *   3. write packs/partials/roadmap-<slug>.html     (their practicals, in waves)
 *   4. node scripts/build-pack.js packs/clients/<slug>.json
 *
 * Everything else (how it works, the feature spread, the comparison, custom
 * labs, working together, commercials, further reading) is shared and needs
 * no per-client editing.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const TEMPLATE = 'packs/template.html';
const PARTIAL_DIR = 'packs/partials';
const OUT_DIR = 'docs';

function fail(msg) {
  console.error('Error: ' + msg);
  process.exit(1);
}

function main() {
  const configPath = process.argv[2];
  if (!configPath) fail('usage: node scripts/build-pack.js packs/clients/<slug>.json');
  if (!fs.existsSync(configPath)) fail(`config not found: ${configPath}`);
  if (!fs.existsSync(TEMPLATE)) fail(`template not found: ${TEMPLATE}`);

  const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  if (!cfg.slug) fail('config needs a "slug"');
  if (!cfg.partials || !cfg.partials.why || !cfg.partials.roadmap) {
    fail('config needs partials.why and partials.roadmap');
  }

  let out = fs.readFileSync(TEMPLATE, 'utf8');

  // partials first, so any tokens inside them get substituted below
  for (const [name, file] of Object.entries(cfg.partials)) {
    const p = path.join(PARTIAL_DIR, file);
    if (!fs.existsSync(p)) fail(`partial not found: ${p}`);
    const token = `{{PARTIAL:${name}}}`;
    if (!out.includes(token)) fail(`template has no ${token}`);
    out = out.split(token).join(fs.readFileSync(p, 'utf8'));
  }

  // scalar values
  for (const [key, value] of Object.entries(cfg)) {
    if (key === 'slug' || key === 'partials') continue;
    out = out.split(`{{${key}}}`).join(String(value));
  }

  // nothing may ship with an unresolved placeholder
  const left = [...new Set(out.match(/\{\{[^}]+\}\}/g) || [])];
  if (left.length) fail(`unresolved tokens: ${left.join(', ')}\nAdd them to ${configPath}.`);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const htmlPath = path.join(OUT_DIR, `${cfg.slug}-partnership-pack.html`);
  fs.writeFileSync(htmlPath, out);
  console.log(`HTML    : ${htmlPath}`);

  const pdfPath = path.join(OUT_DIR, `${cfg.slug}-partnership-pack.pdf`);
  execFileSync(process.execPath, ['scripts/generate-pack-pdf.js', htmlPath, pdfPath], {
    stdio: 'inherit',
  });
}

main();
