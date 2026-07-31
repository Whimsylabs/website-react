/**
 * featureLab.js — progressive enhancement unique to the features page.
 * Same contract as subjectLab.js: everything animates markup that is already
 * in the server-rendered HTML, and the page is complete if it never runs.
 *
 * Two modules:
 *
 *  1. The droppable beaker ([data-feat-drop]) — the flyer's "if they drop a
 *     beaker, it breaks" made literal. Grab it, drop it, watch it shatter,
 *     and a new one appears. The running total makes the point: £0.00.
 *
 *  2. WhimsyCat's visit report ([data-feat-watch]) — the assessment concept
 *     demonstrated on the visitor: skills scored purely from their actions on
 *     this page (tabs explored, glassware stirred, beakers destroyed, depth
 *     of reading). Nothing leaves the browser.
 */

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

function readVar(node, name, fallback) {
  const v = getComputedStyle(node).getPropertyValue(name).trim();
  return v || fallback;
}

/* ------------------------------------------------------------------------ */
/* 1. The droppable beaker                                                   */
/* ------------------------------------------------------------------------ */

function initDrop(root, reduced, loops, cleanups) {
  const host = root.querySelector("[data-feat-drop]");
  if (!host || reduced) return; // reduced motion keeps the static fallback

  const cv = host.querySelector("canvas");
  const readout = host.querySelector("[data-drop-readout]");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const dpr = Math.min(2, window.devicePixelRatio || 1);

  host.classList.add("is-live");

  let W = 0;
  let H = 0;
  let benchY = 0;

  // Beaker body: tapered glass, drawn about its centre
  const BK = { hw: 36, hwBot: 30, hh: 45, rim: 42 };

  const beaker = { x: 0, y: 0, vx: 0, vy: 0, tilt: 0, held: false, alive: true, scale: 1 };
  let shards = [];
  let drops = [];
  let broken = 0;
  let respawn = 0;
  let t = 0;

  const build = () => {
    W = host.clientWidth;
    H = host.clientHeight;
    if (!W || !H) return;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    benchY = H - 30;
    if (!beaker.held && beaker.alive) {
      beaker.x = clamp(beaker.x || W / 2, BK.rim, W - BK.rim);
      beaker.y = benchY - BK.hh;
      beaker.vx = 0;
      beaker.vy = 0;
    }
  };

  const glassPath = () => {
    ctx.beginPath();
    ctx.moveTo(-BK.hw, -BK.hh);
    ctx.lineTo(-BK.hwBot - 1, BK.hh - 11);
    ctx.quadraticCurveTo(-BK.hwBot, BK.hh, -BK.hwBot + 11, BK.hh);
    ctx.lineTo(BK.hwBot - 11, BK.hh);
    ctx.quadraticCurveTo(BK.hwBot, BK.hh, BK.hwBot + 1, BK.hh - 11);
    ctx.lineTo(BK.hw, -BK.hh);
  };

  const shatter = () => {
    beaker.alive = false;
    respawn = 150;
    broken += 1;

    const ink = readVar(host, "--lab-ink", "#1f1968");
    void ink; // colours are read at draw time; this keeps the palette warm

    for (let i = 0; i < 13; i += 1) {
      shards.push({
        x: beaker.x + (Math.random() - 0.5) * 50,
        y: benchY - 6 - Math.random() * 26,
        vx: (Math.random() - 0.5) * 7,
        vy: -(1 + Math.random() * 5),
        rot: Math.random() * 6.28,
        vr: (Math.random() - 0.5) * 0.4,
        s: 5 + Math.random() * 9,
        life: 1,
      });
    }
    for (let i = 0; i < 12; i += 1) {
      drops.push({
        x: beaker.x + (Math.random() - 0.5) * 40,
        y: benchY - 8,
        vx: (Math.random() - 0.5) * 6,
        vy: -(2 + Math.random() * 4.5),
        r: 2 + Math.random() * 3.5,
        life: 1,
      });
    }

    if (readout) readout.textContent = `${broken} beaker${broken === 1 ? "" : "s"} broken · £0.00 in damages`;
    window.dispatchEvent(new CustomEvent("whimsy:beaker-broken", { detail: { count: broken } }));
  };

  /* Pointer — grab anywhere on the beaker, throw with real velocity */
  let lastPX = null;
  let lastPY = null;

  const toLocal = (e) => {
    const r = host.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };

  const down = (e) => {
    if (!beaker.alive) return;
    const [px, py] = toLocal(e);
    if (Math.abs(px - beaker.x) > 55 || Math.abs(py - beaker.y) > 62) return;
    beaker.held = true;
    host.classList.add("is-grabbing");
    host.setPointerCapture && host.setPointerCapture(e.pointerId);
    lastPX = px;
    lastPY = py;
  };

  const move = (e) => {
    if (!beaker.held) return;
    const [px, py] = toLocal(e);
    beaker.vx = beaker.vx * 0.5 + (px - lastPX) * 0.5;
    beaker.vy = beaker.vy * 0.5 + (py - lastPY) * 0.5;
    beaker.x = clamp(px, BK.rim, W - BK.rim);
    beaker.y = Math.min(py, benchY - BK.hh);
    lastPX = px;
    lastPY = py;
  };

  const up = () => {
    if (!beaker.held) return;
    beaker.held = false;
    host.classList.remove("is-grabbing");
  };

  host.addEventListener("pointerdown", down);
  host.addEventListener("pointermove", move);
  host.addEventListener("pointerup", up);
  host.addEventListener("pointercancel", up);
  window.addEventListener("resize", build);
  cleanups.push(() => {
    host.removeEventListener("pointerdown", down);
    host.removeEventListener("pointermove", move);
    host.removeEventListener("pointerup", up);
    host.removeEventListener("pointercancel", up);
    window.removeEventListener("resize", build);
  });

  const step = () => {
    t += 1;

    if (beaker.alive && !beaker.held) {
      beaker.vy += 0.55;
      beaker.x += beaker.vx;
      beaker.y += beaker.vy;
      beaker.tilt = clamp(beaker.tilt + beaker.vx * 0.004, -0.3, 0.3);

      if (beaker.x < BK.rim) { beaker.x = BK.rim; beaker.vx *= -0.5; }
      if (beaker.x > W - BK.rim) { beaker.x = W - BK.rim; beaker.vx *= -0.5; }

      if (beaker.y + BK.hh >= benchY) {
        if (beaker.vy > 9) {
          shatter();
        } else {
          beaker.y = benchY - BK.hh;
          beaker.vy = 0;
          beaker.vx *= 0.55;
          beaker.tilt *= 0.8;
        }
      }
    }

    if (beaker.held) beaker.tilt = clamp(beaker.vx * 0.02, -0.35, 0.35);

    shards = shards.filter((s) => {
      s.vy += 0.4;
      s.x += s.vx;
      s.y += s.vy;
      s.rot += s.vr;
      if (s.y > benchY - 2) { s.y = benchY - 2; s.vy *= -0.3; s.vx *= 0.8; }
      s.life -= 0.011;
      return s.life > 0;
    });

    drops = drops.filter((d) => {
      d.vy += 0.45;
      d.x += d.vx;
      d.y += d.vy;
      if (d.y > benchY - 2) { d.y = benchY - 2; d.vy *= -0.25; d.vx *= 0.7; }
      d.life -= 0.014;
      return d.life > 0;
    });

    if (!beaker.alive) {
      respawn -= 1;
      if (respawn <= 0) {
        beaker.alive = true;
        beaker.scale = 0;
        beaker.x = W / 2;
        beaker.y = benchY - BK.hh;
        beaker.vx = 0;
        beaker.vy = 0;
        beaker.tilt = 0;
      }
    }

    if (beaker.alive && beaker.scale < 1) beaker.scale = Math.min(1, beaker.scale + 0.06);
  };

  const draw = () => {
    if (!W || !H) return;
    const ink = readVar(host, "--lab-ink", "#1f1968");
    const accent = readVar(host, "--lab-accent", "#0e8fc7");

    ctx.clearRect(0, 0, W, H);

    // Bench
    ctx.strokeStyle = ink;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(10, benchY);
    ctx.lineTo(W - 10, benchY);
    ctx.stroke();

    // Shards — glass reads as pale ink outlines
    shards.forEach((s) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.globalAlpha = s.life * 0.85;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -s.s * 0.6);
      ctx.lineTo(s.s * 0.5, s.s * 0.4);
      ctx.lineTo(-s.s * 0.5, s.s * 0.3);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    });

    // Spilled liquid
    drops.forEach((d) => {
      ctx.globalAlpha = d.life * 0.7;
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    if (!beaker.alive) return;

    ctx.save();
    ctx.translate(beaker.x, beaker.y);
    ctx.rotate(beaker.tilt);
    ctx.scale(beaker.scale, beaker.scale);

    // Liquid, clipped inside the glass, with a lazy slosh
    ctx.save();
    glassPath();
    ctx.closePath();
    ctx.clip();
    const slosh = Math.sin(t * 0.06) * 2.5 - beaker.tilt * 26;
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.moveTo(-BK.hw - 6, 8 + slosh);
    ctx.quadraticCurveTo(0, 8 - slosh, BK.hw + 6, 8 + slosh);
    ctx.lineTo(BK.hw + 6, BK.hh + 2);
    ctx.lineTo(-BK.hw - 6, BK.hh + 2);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();

    // Glass
    ctx.strokeStyle = ink;
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    glassPath();
    ctx.stroke();

    // Rim
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-BK.rim, -BK.hh);
    ctx.lineTo(BK.rim, -BK.hh);
    ctx.stroke();

    ctx.restore();
  };

  build();
  loops.push(() => { step(); draw(); });
}

/* ------------------------------------------------------------------------ */
/* 2. WhimsyCat's visit report                                               */
/* ------------------------------------------------------------------------ */

function initWatch(root, reduced, cleanups) {
  const card = root.querySelector("[data-feat-watch]");
  if (!card) return;

  const logEl = card.querySelector("[data-watch-log]");
  const cat = card.querySelector("[data-watch-cat]");
  const rows = {};
  card.querySelectorAll("[data-watch-skill]").forEach((row) => {
    rows[row.getAttribute("data-watch-skill")] = {
      fill: row.querySelector(".skill-bar-fill"),
      score: row.querySelector(".skill-score"),
    };
  });

  const scores = { curiosity: 0, stirring: 0, risk: 100, thoroughness: 0 };
  let complete = false;

  // Assessment complete when the visitor has genuinely done the lot —
  // breakage is not penalised, which is rather the point of the place.
  const checkComplete = () => {
    if (complete) return;
    if (scores.curiosity >= 80 && scores.stirring >= 80 && scores.thoroughness >= 90) {
      complete = true;
      card.classList.add("is-complete");
      if (cat) cat.classList.add("cat-proud");
      if (logEl) logEl.textContent = "Assessment complete. Pioneer material — apply within.";
    }
  };

  const react = (kind) => {
    if (!cat || reduced) return;
    cat.classList.remove("cat-note", "cat-alarm");
    // Restart the animation even when the same class is re-applied
    void cat.offsetWidth;
    cat.classList.add(kind);
  };

  const paint = (key) => {
    const row = rows[key];
    if (!row) return;
    const v = Math.round(scores[key]);
    if (row.fill) row.fill.style.width = `${v}%`;
    if (row.score) row.score.textContent = String(v);
    checkComplete();
  };

  const say = (line, kind) => {
    if (complete) return;
    if (logEl) logEl.textContent = line;
    react(kind || "cat-note");
  };

  // The assessor watches you: the cat leans toward the cursor. Small,
  // damped, and skipped entirely under reduced motion.
  if (cat && !reduced) {
    let pending = false;
    const track = (e) => {
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(() => {
        pending = false;
        const r = cat.getBoundingClientRect();
        if (!r.width) return;
        const dx = clamp((e.clientX - (r.left + r.width / 2)) / window.innerWidth, -0.5, 0.5);
        cat.style.setProperty("--cat-tilt", `${(dx * 14).toFixed(1)}deg`);
      });
    };
    document.addEventListener("pointermove", track, { passive: true });
    cleanups.push(() => document.removeEventListener("pointermove", track));
  }

  const on = (target, type, fn, opts) => {
    target.addEventListener(type, fn, opts);
    cleanups.push(() => target.removeEventListener(type, fn, opts));
  };

  Object.keys(scores).forEach(paint);

  // Curiosity — distinct features inspected
  const seenTabs = new Set();
  root.querySelectorAll("[role='tab']").forEach((tab) => {
    on(tab, "click", () => {
      if (seenTabs.has(tab.id)) return;
      seenTabs.add(tab.id);
      scores.curiosity = Math.min(100, seenTabs.size * 20);
      paint("curiosity");
      say(`Subject inspected: ${tab.textContent.trim()}. Noted.`);
    });
  });

  // Reading the documentation — FAQ disclosures (toggle doesn't bubble)
  on(root, "toggle", (e) => {
    if (!e.target.matches || !e.target.matches("details.lab-faq-item")) return;
    if (!e.target.open) return;
    scores.curiosity = Math.min(100, scores.curiosity + 12);
    paint("curiosity");
    say("Subject reads the documentation. Impressive.");
  }, true);

  // Stirring technique — pointer work over anything holding liquid
  let stirLogged = 0;
  let lastX = null;
  let lastY = null;
  root.querySelectorAll(".lab-rack, .lab-bench-row, .feat-shelf").forEach((zone) => {
    on(zone, "pointermove", (e) => {
      if (lastX !== null) {
        const d = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        scores.stirring = Math.min(100, scores.stirring + d * 0.05);
        paint("stirring");
        if (scores.stirring >= 30 && stirLogged < 1) { stirLogged = 1; say("Fine swirling technique observed."); }
        else if (scores.stirring >= 85 && stirLogged < 2) { stirLogged = 2; say("Excellent wrist action. Marked accordingly."); }
      }
      lastX = e.clientX;
      lastY = e.clientY;
    });
    on(zone, "pointerleave", () => { lastX = null; lastY = null; });
  });

  // Risk assessment — starts perfect, and then people find the beaker
  on(window, "whimsy:beaker-broken", (e) => {
    const count = (e.detail && e.detail.count) || 1;
    scores.risk = Math.max(0, 100 - count * 35);
    paint("risk");
    say(count === 1
      ? "Beaker destroyed. Deliberately, by the look of it. £0.00 charged."
      : `Beaker #${count} destroyed. The subject is enjoying this.`, "cat-alarm");
  });

  // Thoroughness — how much of the lab tour was actually taken
  let toldComplete = false;
  on(window, "scroll", () => {
    const doc = document.documentElement;
    const depth = clamp(((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100, 0, 100);
    if (depth > scores.thoroughness + 1) {
      scores.thoroughness = depth;
      paint("thoroughness");
      if (depth >= 96 && !toldComplete) {
        toldComplete = true;
        say("Full lab tour completed. Gold star.");
      }
    }
  }, { passive: true });
}

/* ------------------------------------------------------------------------ */

export default function initFeatureLab(root) {
  if (!root || typeof window === "undefined") return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loops = [];
  const cleanups = [];

  initDrop(root, reduced, loops, cleanups);
  initWatch(root, reduced, cleanups);

  // For the visitors who open the console — WhimsyCat noticed
  if (!window.__whimsyMeow) {
    window.__whimsyMeow = true;
    // eslint-disable-next-line no-console
    console.log(
      "%c /\\_/\\\n( o.o )   WhimsyCat saw you open the console.\n > ^ <    Curiosity: noted. hello@whimsylabs.ai",
      "font-family:monospace;color:#6d4ae0;font-size:12px;"
    );
  }

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
