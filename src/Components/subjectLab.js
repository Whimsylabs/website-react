/**
 * subjectLab.js, progressive enhancement for the subject landing pages.
 *
 * Everything here animates markup that is already in the server-rendered HTML;
 * nothing creates content. If it never runs (no JS, crawler, reduced-motion)
 * the page is still complete: the burette sits full, tube liquid sits level,
 * the first experiment tab is open, and every reveal is visible.
 *
 * One rAF loop drives all of it.
 */

/* Graduated pipette: a narrow straight barrel that tapers to a delivery tip.
   The graduated section is the barrel, so the liquid level runs top -> barrelEnd. */
export const PIPETTE = {
  vbW: 128, vbH: 540,
  x: 40, w: 30,
  top: 40,
  barrelEnd: 436,
  tipY: 508,
  inset: 2.5,
};

/* Test-tube geometry, from public/images/kit-chemsitry/Test_tube.svg */
export const TUBE = {
  w: 32, top: 6, bodyH: 141, bulbR: 16, bulbCy: 147, bottom: 163,
};

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const NS = "http://www.w3.org/2000/svg";

function svgEl(name, attrs) {
  const n = document.createElementNS(NS, name);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
}

function readVar(node, name, fallback) {
  const v = getComputedStyle(node).getPropertyValue(name).trim();
  return v || fallback;
}

/** A 1-D springy surface: neighbour coupling spreads waves, damping settles. */
function makeSurface(n, opts) {
  const o = opts || {};
  const spread = o.spread === undefined ? 0.5 : o.spread;
  const spring = o.spring === undefined ? 0.012 : o.spring;
  const damp = o.damp === undefined ? 0.962 : o.damp;
  let h = new Array(n).fill(0);
  const v = new Array(n).fill(0);

  return {
    get: () => h,
    poke(i, power, width) {
      const wdt = width || 2;
      for (let k = -wdt; k <= wdt; k += 1) {
        const j = i + k;
        if (j < 0 || j >= n) continue;
        v[j] -= power * (1 - Math.abs(k) / (wdt + 1));
      }
    },
    step() {
      const next = h.slice();
      for (let i = 0; i < n; i += 1) {
        const l = i > 0 ? h[i - 1] : h[i];
        const r = i < n - 1 ? h[i + 1] : h[i];
        v[i] += (l + r) * spread - h[i] * (spread * 2);
        v[i] -= h[i] * spring;
        v[i] *= damp;
        next[i] = h[i] + v[i];
      }
      h = next;
    },
    energy() {
      let e = 0;
      for (let i = 0; i < n; i += 1) e += Math.abs(h[i]) + Math.abs(v[i]);
      return e;
    },
  };
}

export default function initSubjectLab(root, opts) {
  if (!root || typeof window === "undefined") return () => {};

  // forceReduced can only ever ADD calm (a page-level toggle demonstrating
  // reduced motion); a visitor whose OS asks for reduced motion always gets it.
  const reduced =
    (opts && opts.forceReduced) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loops = [];
  const cleanups = [];

  const on = (target, type, fn, opts) => {
    target.addEventListener(type, fn, opts);
    cleanups.push(() => target.removeEventListener(type, fn, opts));
  };

  /* ---------------------------------------------------------------------- */
  /* Reveal on scroll, same class contract as the homepage                  */
  /* ---------------------------------------------------------------------- */

  const revealables = root.querySelectorAll(".animate-on-scroll");
  if (revealables.length) {
    if ("IntersectionObserver" in window && !reduced) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in-view");
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealables.forEach((n) => io.observe(n));
      cleanups.push(() => io.disconnect());
    } else {
      revealables.forEach((n) => n.classList.add("in-view"));
    }
  }

  /* ---------------------------------------------------------------------- */
  /* Hero test tubes, reagents you can slosh                                */
  /* ---------------------------------------------------------------------- */

  // Any element carrying [data-lab-liq] holds a simulated liquid, hero tubes,
  // bench glassware, whatever. Geometry comes from its data attributes.
  const liqHosts = Array.from(root.querySelectorAll("[data-lab-liq]"));
  if (liqHosts.length) {
    const POOL = 7; // bubbles in flight per vessel
    const tubes = liqHosts.map((g) => {
      const path = g.querySelector("[data-liq-surface]");
      const bubbleG = g.querySelector("[data-liq-bubbles]");
      const x = parseFloat(g.getAttribute("data-liq-x"));
      const wid = parseFloat(g.getAttribute("data-liq-w"));
      const level = parseFloat(g.getAttribute("data-liq-level"));
      const bot = parseFloat(g.getAttribute("data-liq-bottom"));
      const N = 9;

      // Pre-build the bubble circles once and recycle them, rather than
      // churning DOM nodes every frame.
      const nodes = [];
      if (bubbleG) {
        for (let i = 0; i < POOL; i += 1) {
          const c = svgEl("circle", { r: 0, fill: "#fff", opacity: 0 });
          bubbleG.appendChild(c);
          nodes.push(c);
        }
      }

      return {
        g, path, x, w: wid, level, bottom: bot, N,
        surface: makeSurface(N, { damp: 0.955 }),
        idle: Math.random() * 6.28,
        bubbles: nodes.map(() => null),
        nodes,
      };
    });

    const spawnBubble = (tb) => ({
      x: tb.x + tb.w * 0.15 + Math.random() * (tb.w * 0.7),
      y: tb.bottom - 6 - Math.random() * 10,
      r: 1.1 + Math.random() * Math.min(2.6, tb.w * 0.06),
      vy: -(0.22 + Math.random() * 0.45),
      phase: Math.random() * 6.28,
    });

    const paint = () => {
      tubes.forEach((tb) => {
        if (tb.path) {
          const h = tb.surface.get();
          const step = tb.w / (tb.N - 1);
          let d = `M${tb.x},${(tb.level + h[0]).toFixed(2)}`;
          for (let i = 1; i < tb.N; i += 1) {
            d += ` L${(tb.x + i * step).toFixed(2)},${(tb.level + h[i]).toFixed(2)}`;
          }
          d += ` L${tb.x + tb.w},${tb.bottom} L${tb.x},${tb.bottom} Z`;
          tb.path.setAttribute("d", d);
        }

        tb.bubbles.forEach((b, i) => {
          const node = tb.nodes[i];
          if (!node) return;
          if (!b) { node.setAttribute("opacity", 0); return; }
          node.setAttribute("cx", (b.x + Math.sin(b.y * 0.11 + b.phase) * 1.1).toFixed(2));
          node.setAttribute("cy", b.y.toFixed(2));
          node.setAttribute("r", b.r.toFixed(2));
          node.setAttribute("opacity", 0.5);
        });
      });
    };

    const stepAll = (time) => {
      tubes.forEach((tb) => {
        // Idle: a barely-there breathing motion so the liquid never looks frozen
        if (tb.surface.energy() < 0.4) {
          tb.surface.poke(
            1 + Math.floor(Math.random() * (tb.N - 2)),
            Math.sin(time * 0.001 + tb.idle) * 0.045,
            2
          );
        }
        tb.surface.step();

        const h = tb.surface.get();
        tb.bubbles.forEach((b, i) => {
          if (!b) {
            if (Math.random() < 0.012) tb.bubbles[i] = spawnBubble(tb);
            return;
          }
          b.y += b.vy;
          b.vy -= 0.0016; // buoyancy accelerates it slightly on the way up

          // Surface height directly above this bubble
          const idx = clamp(Math.round(((b.x - tb.x) / tb.w) * (tb.N - 1)), 0, tb.N - 1);
          const surfaceY = tb.level + h[idx];
          if (b.y - b.r <= surfaceY) {
            tb.surface.poke(idx, b.r * 0.5, 1); // it pops and dimples the surface
            tb.bubbles[i] = null;
          }
        });
      });
    };

    // Stirring is per-<svg>: one listener each, driving whichever vessels that
    // svg contains. Works for the hero rack and the bench alike.
    const bySvg = new Map();
    tubes.forEach((tb) => {
      const owner = tb.g.ownerSVGElement || tb.g.closest("svg");
      if (!owner) return;
      if (!bySvg.has(owner)) bySvg.set(owner, []);
      bySvg.get(owner).push(tb);
    });

    bySvg.forEach((members, owner) => {
      let lastX = null;
      let lastY = null;
      on(owner, "pointermove", (e) => {
        const box = owner.getBoundingClientRect();
        if (!box.width) return;
        const px = e.clientX - box.left;
        const py = e.clientY - box.top;
        const speed = lastX === null ? 3 : clamp(Math.hypot(px - lastX, py - lastY) * 0.35, 0.6, 6);
        lastX = px;
        lastY = py;

        // Map the pointer into this svg's viewBox before comparing to geometry
        const vb = owner.viewBox && owner.viewBox.baseVal;
        const vbW = vb && vb.width ? vb.width : box.width;
        const ux = (px / box.width) * vbW;

        members.forEach((tb) => {
          const dx = ux - (tb.x + tb.w / 2);
          const reach = tb.w * 1.6;
          if (Math.abs(dx) > reach) return;
          const i = clamp(Math.round(((ux - tb.x) / tb.w) * (tb.N - 1)), 0, tb.N - 1);
          tb.surface.poke(i, speed * (1 - Math.abs(dx) / reach), 2);
        });
      });
      on(owner, "pointerleave", () => { lastX = null; lastY = null; });
    });

    paint();
    if (!reduced) loops.push(() => { stepAll(performance.now()); paint(); });
  }

  /* ---------------------------------------------------------------------- */
  /* Burette, drains as you read, graduations double as section nav         */
  /* ---------------------------------------------------------------------- */

  const rail = root.querySelector("[data-lab-rail]");
  const body = root.querySelector("[data-lab-body]");

  if (rail && body) {
    const svg = rail.querySelector("[data-lab-burette]");
    const liquid = svg && svg.querySelector("[data-lab-liquid]");
    const men = svg && svg.querySelector("[data-lab-meniscus]");
    const menLine = svg && svg.querySelector("[data-lab-meniscus-line]");
    const gradG = svg && svg.querySelector("[data-lab-grads]");
    const readout = rail.querySelector("[data-lab-readout]");
    const { x, w, top, barrelEnd, inset } = PIPETTE;
    const bottom = barrelEnd;
    const span = bottom - top;

    let hits = [];
    let target = 0;
    let current = 0;

    const layout = () => {
      if (!gradG) return;
      while (gradG.firstChild) gradG.removeChild(gradG.firstChild);
      hits.forEach((h) => h.remove());
      hits = [];

      for (let t = 0; t <= 40; t += 1) {
        if (t % 5 === 0) continue;
        const y = top + (t / 40) * span;
        gradG.appendChild(svgEl("line", {
          x1: x + w, y1: y, x2: x + w + 6, y2: y,
          stroke: "currentColor", "stroke-width": 1.4, opacity: 0.4,
        }));
      }

      const sections = Array.from(body.querySelectorAll("[data-lab-section]"));
      const total = Math.max(1, body.offsetHeight - window.innerHeight);
      const bodyTop = body.getBoundingClientRect().top + window.scrollY;
      const railBox = rail.getBoundingClientRect();

      sections.forEach((sec) => {
        const offset = sec.getBoundingClientRect().top + window.scrollY;
        const frac = clamp((offset - bodyTop) / total, 0, 1);
        const y = top + frac * span;

        gradG.appendChild(svgEl("line", {
          x1: x + w, y1: y, x2: x + w + 13, y2: y,
          stroke: "currentColor", "stroke-width": 2.2, "stroke-linecap": "round",
        }));
        const label = svgEl("text", {
          x: x + w + 17, y: y + 3.6, fill: "currentColor",
          "font-size": 9.5, "font-family": "var(--lab-mono)", opacity: 0.75,
        });
        label.textContent = String(Math.round(frac * 50)).padStart(2, "0");
        gradG.appendChild(label);

        const btn = document.createElement("button");
        btn.className = "lab-grad-hit";
        btn.type = "button";
        const sy = railBox.height / PIPETTE.vbH;
        btn.style.top = `${y * sy - 12}px`;
        btn.style.left = `${(x + w) * (railBox.width / PIPETTE.vbW)}px`;
        btn.style.width = "58px";
        btn.style.height = "24px";
        const heading = sec.querySelector(".section-title, .lab-h3");
        btn.setAttribute("aria-label", `Jump to ${heading ? heading.textContent : "section"}`);
        btn.addEventListener("click", () => {
          window.scrollTo({ top: offset - 24, behavior: reduced ? "auto" : "smooth" });
        });
        rail.appendChild(btn);
        hits.push(btn);
      });
    };

    const measure = () => {
      const rect = body.getBoundingClientRect();
      const total = Math.max(1, body.offsetHeight - window.innerHeight);
      target = clamp(-rect.top / total, 0, 1);
    };

    const paintBurette = () => {
      if (!liquid) return;
      const y = top + current * span;
      liquid.setAttribute("y", y);
      liquid.setAttribute("height", Math.max(0, bottom - y));
      const mx = x + inset;
      const mw = w - inset * 2;
      const d = `M${mx},${y} Q${mx + mw / 2},${y + 11} ${mx + mw},${y}`;
      if (men) men.setAttribute("d", `${d} Z`);
      if (menLine) menLine.setAttribute("d", d);
      if (readout) readout.textContent = `${(current * 50).toFixed(1)} mL dispensed`;
    };

    const bands = Array.from(root.querySelectorAll("[data-lab-band]"));
    const updateInk = () => {
      const mid = window.innerHeight / 2;
      let dark = false;
      for (const b of bands) {
        const r = b.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          dark = b.getAttribute("data-lab-band") === "dark";
          break;
        }
      }
      rail.style.setProperty("--instr-ink", dark ? "#ffffff" : "#1f1968");
    };

    layout();
    measure();
    current = target;
    paintBurette();
    updateInk();

    on(window, "scroll", () => {
      measure();
      updateInk();
      if (reduced) { current = target; paintBurette(); }
    }, { passive: true });
    on(window, "resize", () => { layout(); measure(); });

    if (!reduced) {
      loops.push(() => {
        const d = target - current;
        if (Math.abs(d) < 0.0002) return;
        current += d * 0.14;
        paintBurette();
      });
    }

    cleanups.push(() => hits.forEach((h) => h.remove()));
  }

  /* ---------------------------------------------------------------------- */
  /* DNA strand, runs the full height of the page and turns as you scroll   */
  /* ---------------------------------------------------------------------- */

  const strandRail = root.querySelector("[data-lab-strand-rail]");
  const strandBody = root.querySelector("[data-lab-body]");

  if (strandRail && strandBody) {
    const svg = strandRail.querySelector("[data-lab-strand]");
    const backA = svg && svg.querySelector("[data-strand-a]");
    const backB = svg && svg.querySelector("[data-strand-b]");
    const rungG = svg && svg.querySelector("[data-strand-rungs]");
    const markG = svg && svg.querySelector("[data-strand-marks]");
    const readout = strandRail.querySelector("[data-lab-readout]");

    const CX = 60;
    const AMP = 26;
    const TURN = 168;
    const STEP = 6;

    let H = 900;
    let target = 0;
    let current = 0;
    let vel = 0;
    let marks = [];
    let hits = [];

    const layout = () => {
      const box = strandRail.getBoundingClientRect();
      H = Math.max(320, Math.round(window.innerHeight));
      if (svg) svg.setAttribute("viewBox", `0 0 120 ${H}`);

      while (markG && markG.firstChild) markG.removeChild(markG.firstChild);
      hits.forEach((h) => h.remove());
      hits = [];
      marks = [];

      const sections = Array.from(strandBody.querySelectorAll("[data-lab-section]"));
      const total = Math.max(1, strandBody.offsetHeight - window.innerHeight);
      const bodyTop = strandBody.getBoundingClientRect().top + window.scrollY;

      sections.forEach((sec) => {
        const offset = sec.getBoundingClientRect().top + window.scrollY;
        const frac = clamp((offset - bodyTop) / total, 0, 1);
        const y = 40 + frac * (H - 90);

        const g = svgEl("g", {});
        const line = svgEl("line", { stroke: "currentColor", "stroke-width": 3, "stroke-linecap": "round" });
        const c1 = svgEl("circle", { r: 5, fill: "var(--lab-paper)", stroke: "currentColor", "stroke-width": 2.5 });
        const c2 = svgEl("circle", { r: 5, fill: "var(--lab-paper)", stroke: "currentColor", "stroke-width": 2.5 });
        g.appendChild(line); g.appendChild(c1); g.appendChild(c2);
        if (markG) markG.appendChild(g);
        marks.push({ y, line, c1, c2 });

        const btn = document.createElement("button");
        btn.className = "lab-grad-hit";
        btn.type = "button";
        btn.style.top = `${y - 15}px`;
        btn.style.left = "6px";
        btn.style.width = `${Math.max(60, box.width - 12)}px`;
        btn.style.height = "30px";
        const heading = sec.querySelector(".section-title, .lab-faq-q");
        btn.setAttribute("aria-label", `Jump to ${heading ? heading.textContent : "section"}`);
        btn.addEventListener("click", () => {
          window.scrollTo({ top: offset - 24, behavior: reduced ? "auto" : "smooth" });
        });
        strandRail.appendChild(btn);
        hits.push(btn);
      });
    };

    const measure = () => {
      const rect = strandBody.getBoundingClientRect();
      const total = Math.max(1, strandBody.offsetHeight - window.innerHeight);
      target = clamp(-rect.top / total, 0, 1);
    };

    const bands = Array.from(root.querySelectorAll("[data-lab-band]"));
    const updateInk = () => {
      const mid = window.innerHeight / 2;
      let dark = false;
      for (const b of bands) {
        const r = b.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          dark = b.getAttribute("data-lab-band") === "dark";
          break;
        }
      }
      strandRail.style.setProperty("--instr-ink", dark ? "#ffffff" : "#1f1968");
    };

    const paint = () => {
      const phase = current * Math.PI * 8;
      // Anchored top and bottom, so the strand bows rather than slides
      const lean = (y) => vel * 0.9 * Math.sin((y / H) * Math.PI);

      const a = [];
      const b = [];
      for (let y = -10; y <= H + 10; y += STEP) {
        const t = (y / TURN) * Math.PI * 2 + phase;
        const l = lean(y);
        a.push(`${(CX + l + Math.sin(t) * AMP).toFixed(2)},${y}`);
        b.push(`${(CX + l + Math.sin(t + Math.PI) * AMP).toFixed(2)},${y}`);
      }
      if (backA) backA.setAttribute("d", `M${a.join(" L")}`);
      if (backB) backB.setAttribute("d", `M${b.join(" L")}`);

      if (rungG) {
        while (rungG.firstChild) rungG.removeChild(rungG.firstChild);
        for (let y = 0; y <= H; y += 17) {
          const t = (y / TURN) * Math.PI * 2 + phase;
          const l = lean(y);
          const depth = Math.abs(Math.cos(t));
          rungG.appendChild(svgEl("line", {
            x1: CX + l + Math.sin(t) * AMP, y1: y,
            x2: CX + l + Math.sin(t + Math.PI) * AMP, y2: y,
            stroke: "currentColor",
            "stroke-width": (1.3 + depth * 1.9).toFixed(2),
            opacity: (0.16 + depth * 0.44).toFixed(2),
            "stroke-linecap": "round",
          }));
        }
      }

      const focus = 40 + current * (H - 90);
      marks.forEach((m) => {
        const t = (m.y / TURN) * Math.PI * 2 + phase;
        const l = lean(m.y);
        const x1 = CX + l + Math.sin(t) * AMP;
        const x2 = CX + l + Math.sin(t + Math.PI) * AMP;
        const on = Math.abs(m.y - focus) < 26;
        m.line.setAttribute("x1", x1); m.line.setAttribute("y1", m.y);
        m.line.setAttribute("x2", x2); m.line.setAttribute("y2", m.y);
        m.line.setAttribute("opacity", on ? 1 : 0.5);
        [[m.c1, x1], [m.c2, x2]].forEach(([c, cx]) => {
          c.setAttribute("cx", cx);
          c.setAttribute("cy", m.y);
          c.setAttribute("r", on ? 6.5 : 4.5);
          c.setAttribute("fill", on ? "var(--lab-accent)" : "var(--lab-paper)");
        });
      });

      if (readout) readout.textContent = `${(current * 8).toFixed(1)} turns`;
    };

    layout();
    measure();
    current = target;
    paint();
    updateInk();

    on(window, "scroll", () => {
      measure();
      updateInk();
      if (reduced) { current = target; vel = 0; paint(); }
    }, { passive: true });
    on(window, "resize", () => { layout(); measure(); });

    if (!reduced) {
      loops.push(() => {
        const d = target - current;
        current += d * 0.12;
        vel = vel * 0.86 + d * 40;
        if (Math.abs(d) > 0.0002 || Math.abs(vel) > 0.05) paint();
      });
    }

    cleanups.push(() => hits.forEach((h) => h.remove()));
  }

  /* ---------------------------------------------------------------------- */
  /* Hoist, gear pays out chain as you read, the load swings and settles    */
  /* ---------------------------------------------------------------------- */

  const hoistRail = root.querySelector("[data-lab-hoist-rail]");
  const hoistBody = root.querySelector("[data-lab-body]");

  if (hoistRail && hoistBody) {
    const gear = hoistRail.querySelector("[data-hoist-gear]");
    const chainG = hoistRail.querySelector("[data-hoist-chain]");
    const loadG = hoistRail.querySelector("[data-hoist-load]");
    const readout = hoistRail.querySelector("[data-lab-readout]");

    const CX = 60;
    const R = 30;
    const GEAR_Y = 58;
    const TOP = GEAR_Y + R;
    const RUN = 470;
    // Link proportions from the kit (68x31, rx 15.5, pitch 106, stroke 13)
    const K = 0.2;
    const LW = 31 * K * 2.1;
    const LH = 68 * K;
    const LRX = 15.5 * K;
    const PITCH = 106.19 * K;
    const LSW = 13 * K;

    let target = 0;
    let current = 0;
    let vel = 0;

    const measure = () => {
      const rect = hoistBody.getBoundingClientRect();
      const total = Math.max(1, hoistBody.offsetHeight - window.innerHeight);
      target = clamp(-rect.top / total, 0, 1);
    };

    const paint = () => {
      const run = 26 + current * RUN;

      if (chainG) {
        while (chainG.firstChild) chainG.removeChild(chainG.firstChild);
        const n = Math.floor(run / PITCH);
        for (let i = 0; i < n; i += 1) {
          const y = TOP + i * PITCH;
          chainG.appendChild(svgEl("rect", {
            x: CX - LW / 2, y, width: LW, height: LH, rx: LRX, ry: LRX,
            fill: "none", stroke: "currentColor", "stroke-width": LSW,
          }));
          chainG.appendChild(svgEl("line", {
            x1: CX, y1: y + LH - 1, x2: CX, y2: y + PITCH + 1,
            stroke: "currentColor", "stroke-width": LSW, "stroke-linecap": "round",
          }));
        }
      }

      // Pure rotation about the top of the wire, so the attachment stays welded
      // to the last link and the load swings as a pendulum rather than sliding.
      const swing = clamp(-vel * 1.15, -17, 17);
      if (loadG) {
        loadG.setAttribute("transform", `translate(${CX},${TOP + run}) rotate(${swing})`);
      }
      if (gear) {
        gear.setAttribute("transform", `rotate(${(run / (2 * Math.PI * R)) * 360})`);
      }
      if (readout) readout.textContent = `${(current * 2.4).toFixed(2)} m payout`;
    };

    const bands = Array.from(root.querySelectorAll("[data-lab-band]"));
    const updateInk = () => {
      const mid = window.innerHeight / 2;
      let dark = false;
      for (const b of bands) {
        const r = b.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          dark = b.getAttribute("data-lab-band") === "dark";
          break;
        }
      }
      hoistRail.style.setProperty("--instr-ink", dark ? "#ffffff" : "#1f1968");
    };

    measure();
    current = target;
    paint();
    updateInk();

    on(window, "scroll", () => {
      measure();
      updateInk();
      if (reduced) { current = target; vel = 0; paint(); }
    }, { passive: true });
    on(window, "resize", measure);

    if (!reduced) {
      loops.push(() => {
        const d = target - current;
        current += d * 0.12;
        vel = vel * 0.86 + d * 40;
        if (Math.abs(d) > 0.0002 || Math.abs(vel) > 0.05) paint();
      });
    }
  }

  /* ---------------------------------------------------------------------- */
  /* Hanging chain, a Verlet rope you can grab and pull                     */
  /* ---------------------------------------------------------------------- */

  root.querySelectorAll("[data-lab-chain]").forEach((host) => {
    const svg = host.querySelector("svg");
    if (!svg) return;
    const curve = svg.querySelector("[data-chain-curve]");
    const linkG = svg.querySelector("[data-chain-links]");
    const handleG = svg.querySelector("[data-chain-handles]");

    const VW = 620;
    const VH = 170;
    const Y0 = 30;
    const N = 26;
    const X0 = 12;
    const SPAN = VW - X0 * 2;
    // 4% more chain than the gap it spans: enough sag to read as hanging
    const REST = (SPAN * 1.04) / (N - 1);
    const GRAV = 0.5;
    const DAMP = 0.985;
    const ITER = 16;

    const pts = [];
    for (let i = 0; i < N; i += 1) {
      const x = X0 + (i / (N - 1)) * SPAN;
      pts.push({ x, y: Y0, px: x, py: Y0, pin: i === 0 || i === N - 1 });
    }
    const HANDLES = [];
    for (let i = 1; i < N - 1; i += 1) if (i % 5 === 0) HANDLES.push(i);

    let drag = null;

    const toLocal = (e) => {
      const r = svg.getBoundingClientRect();
      return { x: (e.clientX - r.left) * (VW / r.width), y: (e.clientY - r.top) * (VH / r.height) };
    };

    HANDLES.forEach((idx) => {
      const h = svgEl("circle", { r: 13, fill: "transparent", style: "pointer-events:all;cursor:grab" });
      h.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        drag = idx;
        h.style.cursor = "grabbing";
        const p = toLocal(e);
        pts[idx].x = p.x; pts[idx].y = p.y;
        if (h.setPointerCapture) h.setPointerCapture(e.pointerId);
      });
      h.addEventListener("pointermove", (e) => {
        if (drag !== idx) return;
        const p = toLocal(e);
        pts[idx].x = p.x; pts[idx].y = p.y;
        pts[idx].px = p.x; pts[idx].py = p.y;
      });
      const release = () => { if (drag === idx) drag = null; h.style.cursor = "grab"; };
      h.addEventListener("pointerup", release);
      h.addEventListener("pointercancel", release);
      if (handleG) handleG.appendChild(h);
    });

    const step = () => {
      for (let i = 0; i < N; i += 1) {
        const p = pts[i];
        if (p.pin || drag === i) continue;
        const vx = (p.x - p.px) * DAMP;
        const vy = (p.y - p.py) * DAMP;
        p.px = p.x; p.py = p.y;
        p.x += vx; p.y += vy + GRAV;
      }
      // More passes = stiffer chain
      for (let k = 0; k < ITER; k += 1) {
        for (let j = 0; j < N - 1; j += 1) {
          const a = pts[j];
          const b = pts[j + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1e-6;
          const diff = ((d - REST) / d) * 0.5;
          const ox = dx * diff;
          const oy = dy * diff;
          const aFix = a.pin || drag === j;
          const bFix = b.pin || drag === j + 1;
          if (!aFix && !bFix) { a.x += ox; a.y += oy; b.x -= ox; b.y -= oy; }
          else if (!aFix) { a.x += ox * 2; a.y += oy * 2; }
          else if (!bFix) { b.x -= ox * 2; b.y -= oy * 2; }
        }
      }
    };

    const paint = () => {
      // One smooth stroked curve rather than a capsule per segment, the
      // repeated capsules bunched into visible pips either side of a drag.
      if (curve) {
        curve.setAttribute("d", `M${pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" L")}`);
      }
      if (linkG) {
        while (linkG.firstChild) linkG.removeChild(linkG.firstChild);
        HANDLES.forEach((idx) => {
          const a = pts[idx - 1];
          const b = pts[idx + 1];
          const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
          linkG.appendChild(svgEl("rect", {
            x: -11, y: -4.6, width: 22, height: 9.2, rx: 4.6, ry: 4.6,
            fill: "var(--lab-paper)", stroke: "var(--lab-accent)", "stroke-width": 3,
            transform: `translate(${pts[idx].x},${pts[idx].y}) rotate(${ang})`,
          }));
        });
      }
      if (handleG) {
        HANDLES.forEach((idx, n) => {
          const node = handleG.childNodes[n];
          if (!node) return;
          node.setAttribute("cx", pts[idx].x);
          node.setAttribute("cy", pts[idx].y);
        });
      }
    };

    if (reduced) {
      for (let s = 0; s < 240; s += 1) step();
      paint();
    } else {
      loops.push(() => { step(); paint(); });
    }
  });

  /* ---------------------------------------------------------------------- */
  /* Liquid surface divider, the boundary you descend through               */
  /* ---------------------------------------------------------------------- */

  root.querySelectorAll("[data-lab-liquid-surface]").forEach((host) => {
    const cv = host.querySelector("canvas");
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    let W = 0;
    let H = 0;
    let N = 0;
    let surface = makeSurface(2);
    let rings = [];
    let drop = null;
    let dropped = false;
    let restY = 0;
    let rising = [];

    const build = () => {
      W = host.clientWidth;
      H = host.clientHeight;
      if (!W || !H) return;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      N = Math.max(8, Math.ceil(W / 6) + 1);
      surface = makeSurface(N);
      restY = H * 0.52;
      rising = Array.from({ length: clamp(Math.round(W / 190), 3, 11) }, () => ({
        x: Math.random() * W,
        y: H + Math.random() * H,
        r: 2 + Math.random() * 5,
        vy: -(0.25 + Math.random() * 0.5),
        phase: Math.random() * 6.28,
      }));
    };

    const splash = (px, power) => {
      const i = clamp(Math.round((px / W) * (N - 1)), 0, N - 1);
      surface.poke(i, power, 3);
      rings.push({ x: px, r: 2, a: 0.55 });
    };

    const step = () => {
      surface.step();
      rings = rings.filter((ring) => {
        ring.r += 1.7;
        ring.a *= 0.94;
        return ring.a > 0.02;
      });
      if (drop) {
        drop.vy += 0.5;
        drop.y += drop.vy;
        if (drop.y >= restY) { splash(drop.x, 7); drop = null; }
      }

      // Bubbles rise through the liquid and break the surface, so the border is
      // continuously disturbed from below rather than only by the cursor.
      const h = surface.get();
      rising.forEach((b) => {
        b.y += b.vy;
        b.phase += 0.025;
        const i = clamp(Math.round((b.x / W) * (N - 1)), 0, N - 1);
        const surfaceY = restY + h[i];
        if (b.y - b.r <= surfaceY) {
          surface.poke(i, b.r * 0.55, 2);
          rings.push({ x: b.x, r: b.r, a: 0.3 });
          b.x = Math.random() * W;
          b.y = H + 8 + Math.random() * H * 0.6;
          b.r = 2 + Math.random() * 5;
          b.vy = -(0.25 + Math.random() * 0.5);
        }
      });
    };

    const draw = () => {
      if (!W || !H) return;
      const below = readVar(host, "--lab-paper", "#ffffff");
      const accent = readVar(host, "--lab-accent", "#6d4ae0");
      const h = surface.get();

      ctx.clearRect(0, 0, W, H);
      const pts = [];
      for (let i = 0; i < N; i += 1) pts.push([(i / (N - 1)) * W, restY + h[i]]);

      // Only below the waterline is painted, above stays transparent so the
      // hero's own gradient shows through and there is no seam to match.
      ctx.beginPath();
      ctx.moveTo(0, H);
      ctx.lineTo(0, pts[0][1]);
      pts.forEach((p) => ctx.lineTo(p[0], p[1]));
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = below;
      ctx.fill();

      ctx.beginPath();
      pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Bubbles below the waterline, on their way up
      ctx.fillStyle = accent;
      ctx.strokeStyle = accent;
      rising.forEach((b) => {
        const x = b.x + Math.sin(b.phase) * 3;
        ctx.globalAlpha = 0.14;
        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      rings.forEach((ring) => {
        ctx.beginPath();
        ctx.ellipse(ring.x, restY, ring.r, ring.r * 0.26, 0, 0, Math.PI * 2);
        ctx.strokeStyle = accent;
        ctx.globalAlpha = ring.a;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      if (drop) {
        ctx.beginPath();
        ctx.ellipse(drop.x, drop.y, 4, 5.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.fill();
      }
    };

    build();
    on(window, "resize", build);

    let lastX = null;
    on(host, "pointermove", (e) => {
      const r = host.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      if (Math.abs(py - restY) < 34) {
        splash(px, lastX === null ? 2 : Math.min(6, Math.abs(px - lastX) * 0.5 + 1));
      }
      lastX = px;
    });
    on(host, "pointerleave", () => { lastX = null; });

    if ("IntersectionObserver" in window && !reduced) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && !dropped) {
            dropped = true;
            drop = { x: W * 0.5, y: -14, vy: 0 };
          }
        });
      }, { threshold: 0.6 });
      io.observe(host);
      cleanups.push(() => io.disconnect());
    }

    if (reduced) draw();
    else loops.push(() => { step(); draw(); });
  });

  /* ---------------------------------------------------------------------- */
  /* Submerged sections, bubbles drifting up behind the content             */
  /* ---------------------------------------------------------------------- */

  root.querySelectorAll("[data-lab-bubble-field]").forEach((host) => {
    const cv = host.querySelector("canvas");
    if (!cv || reduced) return;
    const ctx = cv.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = 0;
    let H = 0;
    let bubbles = [];

    const spawn = (atBottom) => ({
      x: Math.random() * W,
      y: atBottom ? H + 10 : Math.random() * H,
      r: 2 + Math.random() * 7,
      vy: -(0.16 + Math.random() * 0.42),
      phase: Math.random() * 6.28,
      wob: 0.4 + Math.random() * 1.1,
    });

    const build = () => {
      W = host.clientWidth;
      H = host.clientHeight;
      if (!W || !H) return;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = clamp(Math.round((W * H) / 26000), 10, 46);
      bubbles = Array.from({ length: count }, () => spawn(false));
    };

    const draw = () => {
      if (!W || !H) return;
      const accent = readVar(host, "--lab-accent", "#6d4ae0");
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = accent;
      ctx.fillStyle = accent;
      bubbles.forEach((b, i) => {
        b.y += b.vy;
        b.phase += 0.02;
        if (b.y + b.r < -6) bubbles[i] = spawn(true);
        const x = b.x + Math.sin(b.phase) * b.wob * 6;
        ctx.globalAlpha = 0.1;
        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.22;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    };

    build();
    on(window, "resize", build);
    loops.push(draw);
  });

  /* ---------------------------------------------------------------------- */
  /* Lipid bilayer, a membrane you can part with the cursor                 */
  /* ---------------------------------------------------------------------- */

  root.querySelectorAll("[data-lab-membrane]").forEach((host) => {
    const cv = host.querySelector("canvas");
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const SPACING = 15;
    const HEAD = 4.4;
    const TAIL = 19;
    const RADIUS = 76;

    let W = 0;
    let H = 0;
    // Mutated in place rather than reassigned, so the render closure always
    // sees the current set without capturing a stale binding.
    const lipids = [];
    const ptr = { x: -999, y: -999, on: false };

    const build = () => {
      W = host.clientWidth;
      H = host.clientHeight;
      if (!W || !H) return;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lipids.length = 0;
      const mid = H / 2;
      const n = Math.ceil(W / SPACING) + 1;
      for (let i = 0; i < n; i += 1) {
        const x = i * SPACING + SPACING / 2;
        // -1 = upper leaflet (heads up, tails down), +1 = lower
        [-1, 1].forEach((side) => {
          const ry = mid + side * (TAIL + HEAD + 2);
          lipids.push({ rx: x, ry, x, y: ry, vx: 0, vy: 0, side, seed: i * 0.7 });
        });
      }
    };

    const draw = (time) => {
      if (!W || !H) return;
      // Drawn in the subject accent, not --lab-ink: the ink is the brand purple,
      // which reads as a foreign colour sitting inside a green biology page.
      const ink = readVar(host, "--lab-accent-text", "#047857");
      const acc = readVar(host, "--lab-accent", "#0e9f6e");
      ctx.clearRect(0, 0, W, H);

      lipids.forEach((L) => {
        if (ptr.on) {
          const dx = L.x - ptr.x;
          const dy = L.y - ptr.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < RADIUS) {
            const f = 1 - dist / RADIUS;
            L.vx += (dx / dist) * f * 3.2;
            L.vy += (dy / dist) * f * 2.4;
          }
        }
        // Spring home, then damp, the membrane flows back closed
        L.vx += (L.rx - L.x) * 0.045;
        L.vy += (L.ry - L.y) * 0.055;
        L.vx *= 0.9;
        L.vy *= 0.9;
        L.x += L.vx;
        L.y += L.vy;

        const disp = Math.abs(L.x - L.rx) + Math.abs(L.y - L.ry);
        const tilt = clamp(L.vx * 0.06, -0.6, 0.6);
        const wob = Math.sin(time * 0.0016 + L.seed) * 0.09;
        const ang = tilt + wob;
        const tx = L.x + Math.sin(ang) * TAIL * L.side;
        const ty = L.y - TAIL * L.side;

        ctx.strokeStyle = ink;
        ctx.globalAlpha = 0.45;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        [-2.4, 2.4].forEach((off) => {
          ctx.beginPath();
          ctx.moveTo(L.x + off, L.y);
          ctx.quadraticCurveTo(
            L.x + off + Math.sin(ang) * 6,
            L.y - TAIL * 0.5 * L.side,
            tx + off,
            ty
          );
          ctx.stroke();
        });

        ctx.beginPath();
        ctx.arc(L.x, L.y, HEAD, 0, Math.PI * 2);
        ctx.fillStyle = disp > 3 ? acc : ink;
        ctx.globalAlpha = disp > 3 ? Math.min(1, 0.45 + disp / 30) : 0.85;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    on(host, "pointermove", (e) => {
      const r = host.getBoundingClientRect();
      ptr.x = e.clientX - r.left;
      ptr.y = e.clientY - r.top;
      ptr.on = true;
    });
    on(host, "pointerleave", () => { ptr.on = false; });
    on(window, "resize", build);

    build();
    if (reduced) draw(0);
    else loops.push(() => draw(performance.now()));
  });

  /* ---------------------------------------------------------------------- */
  /* Vessels, fill on hover / focus                                         */
  /* ---------------------------------------------------------------------- */

  root.querySelectorAll("[data-lab-vessel]").forEach((g) => {
    // The clip rect lives in the owning <svg>'s <defs>, not inside this group.
    const owner = g.ownerSVGElement || g.closest("svg");
    const fill = owner && owner.querySelector("[data-lab-vessel-fill]");
    if (!fill) return;
    const from = parseFloat(g.getAttribute("data-fill-from"));
    const to = parseFloat(g.getAttribute("data-fill-to"));
    const hot = g.closest("a, button, .lab-entry, .lab-exp-row") || g;

    let level = reduced ? 0.5 : 0;
    let want = reduced ? 0.5 : 0;

    const enter = () => { want = 0.82; };
    const leave = () => { want = 0; };
    on(hot, "pointerenter", enter);
    on(hot, "pointerleave", leave);
    on(hot, "focusin", enter);
    on(hot, "focusout", leave);

    const paint = () => {
      const hgt = level * (to - from);
      fill.setAttribute("y", to - hgt);
      fill.setAttribute("height", Math.max(0, hgt));
    };

    paint();
    if (!reduced) {
      loops.push(() => {
        const d = want - level;
        if (Math.abs(d) < 0.001) return;
        level += d * 0.12;
        paint();
      });
    }
  });

  /* ---------------------------------------------------------------------- */
  /* Experiment tabs                                                         */
  /* ---------------------------------------------------------------------- */

  root.querySelectorAll("[data-lab-tabs]").forEach((wrap) => {
    const tabs = Array.from(wrap.querySelectorAll("[role='tab']"));
    const panels = Array.from(wrap.querySelectorAll("[role='tabpanel']"));
    if (!tabs.length) return;

    const select = (i, focus) => {
      tabs.forEach((t, n) => {
        const on_ = n === i;
        t.setAttribute("aria-selected", on_ ? "true" : "false");
        t.setAttribute("tabindex", on_ ? "0" : "-1");
      });
      panels.forEach((p, n) => {
        if (n === i) p.removeAttribute("hidden");
        else p.setAttribute("hidden", "");
      });
      if (focus) tabs[i].focus();
    };

    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(i));
      t.addEventListener("keydown", (e) => {
        let next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = tabs.length - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });

    select(0);
  });

  /* ---------------------------------------------------------------------- */

  let raf = null;
  if (!reduced && loops.length) {
    const tick = () => {
      for (let i = 0; i < loops.length; i += 1) loops[i]();
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
  }

  return () => {
    if (raf) window.cancelAnimationFrame(raf);
    cleanups.forEach((fn) => fn());
  };
}
