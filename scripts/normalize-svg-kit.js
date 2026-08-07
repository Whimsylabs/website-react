#!/usr/bin/env node
/**
 * normalize-svg-kit.js
 *
 * Prepares the hand-drawn apparatus SVGs for use as themeable page elements.
 *
 * Two jobs:
 *   1. Tighten viewBox to the artwork's real bounds. Most of the kit was exported
 *      from a shared Illustrator artboard (1204x1081 / 1088x758) with the figure
 *      sitting somewhere inside a lot of empty space, which makes the assets
 *      impossible to position reliably.
 *   2. Replace hard-coded black (#000 / #000000 / black) with `currentColor` so a
 *      single file works on light and dark grounds and inherits the section's ink.
 *
 * Bounds are computed from geometry, not from a renderer (jsdom has no layout
 * engine, so getBBox() is unavailable). Curves are bounded by their control-point
 * hull, which is conservative: the box may be a touch loose but can never clip.
 *
 * Non-destructive, reads from a source dir, writes to a separate output dir.
 *
 *   node scripts/normalize-svg-kit.js [--src <dir>] [--out <dir>] [--pad <px>]
 */

const fs = require("fs-extra");
const path = require("path");

const DEFAULT_SRC = path.join(__dirname, "..", "public", "images", "features");
const DEFAULT_OUT = path.join(__dirname, "..", "public", "images", "kit");

/* -------------------------------------------------------------------------- */
/* Path data                                                                   */
/* -------------------------------------------------------------------------- */

const CMD_ARGS = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };

/** Real roots of at^2 + bt + c = 0 that fall strictly inside the segment. */
function rootsInUnit(a, b, c) {
  const out = [];
  if (Math.abs(a) < 1e-12) {
    if (Math.abs(b) > 1e-12) {
      const t = -c / b;
      if (t > 0 && t < 1) out.push(t);
    }
    return out;
  }
  const disc = b * b - 4 * a * c;
  if (disc < 0) return out;
  const s = Math.sqrt(disc);
  for (const t of [(-b + s) / (2 * a), (-b - s) / (2 * a)]) {
    if (t > 0 && t < 1) out.push(t);
  }
  return out;
}

/**
 * Exact extrema of a cubic Bezier on one axis: the endpoints plus any turning
 * point where B'(t) = 0. Bounding by the control hull instead would overshoot,
 * a control point can sit well outside the curve it steers.
 */
function cubicExtrema(p0, p1, p2, p3) {
  const vals = [p0, p3];
  const a = 3 * (-p0 + 3 * p1 - 3 * p2 + p3);
  const b = 6 * (p0 - 2 * p1 + p2);
  const c = 3 * (p1 - p0);
  for (const t of rootsInUnit(a, b, c)) {
    const u = 1 - t;
    vals.push(u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3);
  }
  return vals;
}

/** Exact extrema of a quadratic Bezier on one axis. */
function quadExtrema(p0, p1, p2) {
  const vals = [p0, p2];
  const denom = p0 - 2 * p1 + p2;
  if (Math.abs(denom) > 1e-12) {
    const t = (p0 - p1) / denom;
    if (t > 0 && t < 1) {
      const u = 1 - t;
      vals.push(u * u * p0 + 2 * u * t * p1 + t * t * p2);
    }
  }
  return vals;
}

/** Cross-product of per-axis extrema into bounding points. */
function spanPoints(xs, ys) {
  return [
    [Math.min(...xs), Math.min(...ys)],
    [Math.max(...xs), Math.max(...ys)],
  ];
}

/**
 * Walk a path `d` string and emit every absolute point that bounds the outline:
 * endpoints plus Bezier control points.
 */
function pathPoints(d) {
  const pts = [];
  // A number is either `12`, `12.5`, `.5` or exponential, never two dots. Naive
  // `[\d.]*` merges Illustrator's comma-less pairs (`12.89.75` is 12.89 then .75),
  // which silently shifts every following coordinate and corrupts the bounds.
  const tokens = d.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g) || [];
  pts.truncated = false;

  let i = 0;
  let cx = 0;
  let cy = 0;
  let startX = 0;
  let startY = 0;
  let cmd = null;
  let lastCx = 0;
  let lastCy = 0;
  let lastCurve = null; // "C" | "Q" | null, needed to reflect S/T controls

  const push = (x, y) => pts.push([x, y]);

  while (i < tokens.length) {
    if (/[a-zA-Z]/.test(tokens[i])) {
      cmd = tokens[i];
      i += 1;
      if (cmd.toUpperCase() === "Z") {
        cx = startX;
        cy = startY;
        cmd = null;
        continue;
      }
    } else if (cmd === null) {
      i += 1;
      continue;
    }

    const upper = cmd.toUpperCase();
    const rel = cmd !== upper;
    const n = CMD_ARGS[upper];
    if (n === undefined) {
      i += 1;
      continue;
    }

    const a = [];
    for (let k = 0; k < n; k += 1) a.push(parseFloat(tokens[i + k]));
    if (a.some(Number.isNaN)) {
      // Ran out of coordinates mid-command: the bounds are incomplete, so flag
      // rather than silently emitting a viewBox that would clip.
      pts.truncated = true;
      break;
    }
    i += n;

    switch (upper) {
      case "M":
      case "L": {
        const x = rel ? cx + a[0] : a[0];
        const y = rel ? cy + a[1] : a[1];
        push(x, y);
        cx = x;
        cy = y;
        lastCurve = null;
        if (upper === "M") {
          startX = x;
          startY = y;
          // subsequent implicit pairs after M are L
          cmd = rel ? "l" : "L";
        }
        break;
      }
      case "T": {
        // Control point is the reflection of the previous quadratic's control.
        const x = rel ? cx + a[0] : a[0];
        const y = rel ? cy + a[1] : a[1];
        const rx = lastCurve === "Q" ? 2 * cx - lastCx : cx;
        const ry = lastCurve === "Q" ? 2 * cy - lastCy : cy;
        spanPoints(quadExtrema(cx, rx, x), quadExtrema(cy, ry, y)).forEach((p) =>
          push(p[0], p[1])
        );
        lastCx = rx;
        lastCy = ry;
        lastCurve = "Q";
        cx = x;
        cy = y;
        break;
      }
      case "H": {
        const x = rel ? cx + a[0] : a[0];
        push(x, cy);
        cx = x;
        break;
      }
      case "V": {
        const y = rel ? cy + a[0] : a[0];
        push(cx, y);
        cy = y;
        break;
      }
      case "C": {
        const p = rel
          ? [cx + a[0], cy + a[1], cx + a[2], cy + a[3], cx + a[4], cy + a[5]]
          : a;
        spanPoints(
          cubicExtrema(cx, p[0], p[2], p[4]),
          cubicExtrema(cy, p[1], p[3], p[5])
        ).forEach((q) => push(q[0], q[1]));
        lastCx = p[2];
        lastCy = p[3];
        lastCurve = "C";
        cx = p[4];
        cy = p[5];
        break;
      }
      case "S": {
        // First control is the reflection of the previous cubic's second control.
        const p = rel ? [cx + a[0], cy + a[1], cx + a[2], cy + a[3]] : a;
        const rx = lastCurve === "C" ? 2 * cx - lastCx : cx;
        const ry = lastCurve === "C" ? 2 * cy - lastCy : cy;
        spanPoints(
          cubicExtrema(cx, rx, p[0], p[2]),
          cubicExtrema(cy, ry, p[1], p[3])
        ).forEach((q) => push(q[0], q[1]));
        lastCx = p[0];
        lastCy = p[1];
        lastCurve = "C";
        cx = p[2];
        cy = p[3];
        break;
      }
      case "Q": {
        const p = rel ? [cx + a[0], cy + a[1], cx + a[2], cy + a[3]] : a;
        spanPoints(
          quadExtrema(cx, p[0], p[2]),
          quadExtrema(cy, p[1], p[3])
        ).forEach((q) => push(q[0], q[1]));
        lastCx = p[0];
        lastCy = p[1];
        lastCurve = "Q";
        cx = p[2];
        cy = p[3];
        break;
      }
      case "A": {
        // Endpoint plus a radius-sized box: conservative, arcs are rare here.
        const rx = Math.abs(a[0]);
        const ry = Math.abs(a[1]);
        const x = rel ? cx + a[5] : a[5];
        const y = rel ? cy + a[6] : a[6];
        push(x - rx, y - ry);
        push(x + rx, y + ry);
        push(cx - rx, cy - ry);
        push(cx + rx, cy + ry);
        cx = x;
        cy = y;
        break;
      }
      default:
        break;
    }
  }

  return pts;
}

/* -------------------------------------------------------------------------- */
/* Shape bounds                                                                */
/* -------------------------------------------------------------------------- */

const num = (v, fallback = 0) => {
  const f = parseFloat(v);
  return Number.isFinite(f) ? f : fallback;
};

function shapePoints(tag, attrs) {
  switch (tag) {
    case "rect": {
      const x = num(attrs.x);
      const y = num(attrs.y);
      return [
        [x, y],
        [x + num(attrs.width), y + num(attrs.height)],
      ];
    }
    case "circle": {
      const r = num(attrs.r);
      const cx = num(attrs.cx);
      const cy = num(attrs.cy);
      return [
        [cx - r, cy - r],
        [cx + r, cy + r],
      ];
    }
    case "ellipse": {
      const rx = num(attrs.rx);
      const ry = num(attrs.ry);
      const cx = num(attrs.cx);
      const cy = num(attrs.cy);
      return [
        [cx - rx, cy - ry],
        [cx + rx, cy + ry],
      ];
    }
    case "line":
      return [
        [num(attrs.x1), num(attrs.y1)],
        [num(attrs.x2), num(attrs.y2)],
      ];
    case "polyline":
    case "polygon": {
      const raw = (attrs.points || "").match(/-?\.?\d[\d.]*(?:e[-+]?\d+)?/gi) || [];
      const out = [];
      for (let i = 0; i + 1 < raw.length; i += 2) {
        out.push([parseFloat(raw[i]), parseFloat(raw[i + 1])]);
      }
      return out;
    }
    case "path":
      return pathPoints(attrs.d || "");
    default:
      return [];
  }
}

/** Pull attributes off a raw element tag string. */
function parseAttrs(tagText) {
  const attrs = {};
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(tagText)) !== null) attrs[m[1]] = m[2];
  return attrs;
}

/* -------------------------------------------------------------------------- */
/* Stroke widths                                                               */
/* -------------------------------------------------------------------------- */

/**
 * The kit sets stroke-width inside a <style> block keyed by .cls-N, so the widest
 * declared stroke is a safe global padding value, half of it can overhang the
 * geometric bounds on any side.
 */
function widestStroke(svg) {
  let widest = 0;
  const re = /stroke-width\s*:\s*([\d.]+)/g;
  let m;
  while ((m = re.exec(svg)) !== null) widest = Math.max(widest, parseFloat(m[1]));
  const attrRe = /stroke-width\s*=\s*"([\d.]+)"/g;
  while ((m = attrRe.exec(svg)) !== null) widest = Math.max(widest, parseFloat(m[1]));
  return widest;
}

/* -------------------------------------------------------------------------- */
/* Transform                                                                   */
/* -------------------------------------------------------------------------- */

function computeBounds(svg) {
  const shapeRe = /<(rect|circle|ellipse|line|polyline|polygon|path)\b([^>]*)>/gi;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let count = 0;
  let truncated = false;
  let m;

  while ((m = shapeRe.exec(svg)) !== null) {
    const pts = shapePoints(m[1].toLowerCase(), parseAttrs(m[2]));
    if (pts.truncated) truncated = true;
    for (const [x, y] of pts) {
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      count += 1;
    }
  }

  if (!count || !Number.isFinite(minX)) return null;
  return { minX, minY, maxX, maxY, truncated };
}

function recolour(svg) {
  return svg
    .replace(/(stroke|fill)\s*:\s*#000000\b/gi, "$1: currentColor")
    .replace(/(stroke|fill)\s*:\s*#000\b/gi, "$1: currentColor")
    .replace(/(stroke|fill)\s*:\s*black\b/gi, "$1: currentColor")
    .replace(/(stroke|fill)\s*=\s*"#000000"/gi, '$1="currentColor"')
    .replace(/(stroke|fill)\s*=\s*"#000"/gi, '$1="currentColor"')
    .replace(/(stroke|fill)\s*=\s*"black"/gi, '$1="currentColor"');
}

function round(n) {
  return Math.round(n * 100) / 100;
}

/* -------------------------------------------------------------------------- */
/* Main                                                                        */
/* -------------------------------------------------------------------------- */

async function main() {
  const argv = process.argv.slice(2);
  const arg = (flag, fallback) => {
    const i = argv.indexOf(flag);
    return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
  };

  const srcDir = path.resolve(arg("--src", DEFAULT_SRC));
  const outDir = path.resolve(arg("--out", DEFAULT_OUT));
  const extraPad = parseFloat(arg("--pad", "0")) || 0;

  if (!(await fs.pathExists(srcDir))) {
    console.error(`Source directory not found: ${srcDir}`);
    process.exit(1);
  }

  await fs.ensureDir(outDir);

  const files = (await fs.readdir(srcDir)).filter((f) => f.toLowerCase().endsWith(".svg"));
  if (!files.length) {
    console.error(`No SVG files in ${srcDir}`);
    process.exit(1);
  }

  console.log(`\nNormalising ${files.length} SVGs`);
  console.log(`  from ${srcDir}`);
  console.log(`  to   ${outDir}\n`);

  const rows = [];
  let recoloured = 0;
  let failures = 0;

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    let svg = await fs.readFile(srcPath, "utf8");

    const before = svg;
    svg = recolour(svg);
    if (svg !== before) recoloured += 1;

    const vbMatch = svg.match(/viewBox\s*=\s*"([^"]+)"/i);
    const oldVb = vbMatch ? vbMatch[1].trim() : null;
    const bounds = computeBounds(svg);

    let note = "";
    let newVb = oldVb;

    if (!bounds) {
      note = "no geometry found, left as-is";
    } else if (bounds.truncated) {
      note = "!! path parse truncated, left as-is";
      failures += 1;
    } else {
      const pad = widestStroke(svg) / 2 + extraPad;
      const minX = bounds.minX - pad;
      const minY = bounds.minY - pad;
      const w = bounds.maxX - bounds.minX + pad * 2;
      const h = bounds.maxY - bounds.minY + pad * 2;

      if (w <= 0 || h <= 0) {
        note = "degenerate bounds, left as-is";
      } else {
        newVb = `${round(minX)} ${round(minY)} ${round(w)} ${round(h)}`;
        if (vbMatch) {
          svg = svg.replace(/viewBox\s*=\s*"[^"]+"/i, `viewBox="${newVb}"`);
        } else {
          svg = svg.replace(/<svg\b/i, `<svg viewBox="${newVb}"`);
        }

        // Fixed width/height would override the new viewBox at render time.
        svg = svg.replace(/<svg\b([^>]*)>/i, (full, attrs) => {
          const cleaned = attrs
            .replace(/\s(width|height)\s*=\s*"[^"]*"/gi, "")
            .replace(/\s+/g, " ");
          return `<svg${cleaned}>`;
        });

        if (oldVb) {
          const [, , ow, oh] = oldVb.split(/[\s,]+/).map(Number);
          if (Number.isFinite(ow) && Number.isFinite(oh) && ow > 0 && oh > 0) {
            const saved = 1 - (w * h) / (ow * oh);
            note = saved > 0.02 ? `cropped ${(saved * 100).toFixed(0)}% of area` : "already tight";
          }
        }
      }
    }

    await fs.writeFile(path.join(outDir, file), svg);
    rows.push({ file, oldVb, newVb, note });
  }

  const pad = (s, n) => String(s === null ? "—" : s).padEnd(n);
  console.log(
    `${pad("FILE", 24)}${pad("OLD VIEWBOX", 26)}${pad("NEW VIEWBOX", 26)}NOTE`
  );
  console.log("-".repeat(100));
  for (const r of rows) {
    console.log(`${pad(r.file, 24)}${pad(r.oldVb, 26)}${pad(r.newVb, 26)}${r.note}`);
  }

  console.log(
    `\n${rows.length} written · ${recoloured} recoloured to currentColor · originals untouched`
  );
  if (failures) {
    console.log(`${failures} file(s) could not be measured safely and kept their original viewBox.`);
    process.exitCode = 1;
  } else {
    console.log("All files measured cleanly.\n");
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { pathPoints, computeBounds, shapePoints, recolour };
