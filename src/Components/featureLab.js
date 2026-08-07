/**
 * featureLab.js, progressive enhancement unique to the features page.
 * Same contract as subjectLab.js: everything animates markup that is already
 * in the server-rendered HTML, and the page is complete if it never runs.
 *
 * Two modules:
 *
 *  1. The droppable beaker ([data-feat-drop]), the flyer's "if they drop a
 *     beaker, it breaks" made literal. Grab it, drop it, watch it shatter,
 *     and a new one appears. The running total makes the point: £0.00.
 *
 *  2. WhimsyCat's visit report ([data-feat-watch]), the assessment concept
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
  const burner = { x: 0 }; // a spirit burner on the bench; park the beaker over it
  const hint = host.querySelector(".feat-drop-hint");
  let shards = [];
  let drops = [];
  let wisps = [];
  let boils = [];
  let flash = null;
  let heat = 0;
  let broken = 0;
  let exploded = 0;
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
    burner.x = Math.round(W * 0.76);
    if (!beaker.held && beaker.alive) {
      beaker.x = clamp(beaker.x || W * 0.38, BK.rim, W - BK.rim);
      beaker.y = benchY - BK.hh;
      beaker.vx = 0;
      beaker.vy = 0;
    }
  };

  const updateReadout = () => {
    if (!readout) return;
    readout.textContent = `${broken} broken · ${exploded} overheated · £0.00 in damages`;
  };

  // The pull-quote above keeps score: each claim lights up when proven
  const light = (sel) => {
    const el = root.querySelector(sel);
    if (el) el.classList.add("is-lit");
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

  const burst = (shardCount, dropCount, power, colors) => {
    for (let i = 0; i < shardCount; i += 1) {
      shards.push({
        x: beaker.x + (Math.random() - 0.5) * 50,
        y: benchY - 6 - Math.random() * 40,
        vx: (Math.random() - 0.5) * 7 * power,
        vy: -(1 + Math.random() * 5) * power,
        rot: Math.random() * 6.28,
        vr: (Math.random() - 0.5) * 0.4,
        s: 5 + Math.random() * 9,
        life: 1,
      });
    }
    for (let i = 0; i < dropCount; i += 1) {
      drops.push({
        x: beaker.x + (Math.random() - 0.5) * 40,
        y: benchY - 8 - Math.random() * 30,
        vx: (Math.random() - 0.5) * 6 * power,
        vy: -(2 + Math.random() * 4.5) * power,
        r: 2 + Math.random() * 3.5,
        life: 1,
        color: colors[i % colors.length],
      });
    }
  };

  const shatter = () => {
    beaker.alive = false;
    respawn = 150;
    broken += 1;
    heat = 0;
    boils = [];
    wisps = [];
    burst(13, 12, 1, [readVar(host, "--lab-accent", "#0e8fc7")]);
    updateReadout();
    light("[data-pull-break]");
    if (hint && exploded === 0) hint.textContent = "Now try the burner.";
    window.dispatchEvent(new CustomEvent("whimsy:beaker-broken", { detail: { count: broken } }));
  };

  const explode = () => {
    beaker.alive = false;
    respawn = 175;
    exploded += 1;
    heat = 0;
    boils = [];
    wisps = [];
    flash = { x: beaker.x, y: benchY - 44, r: 12, a: 0.9 };
    burst(20, 18, 1.7, ["#e01b84", "#f59e0b", "#ffd77a"]);
    updateReadout();
    light("[data-pull-heat]");
    if (hint) hint.textContent = "All of this, free forever.";
    window.dispatchEvent(new CustomEvent("whimsy:compound-overheated", { detail: { count: exploded } }));
  };

  /* Pointer, grab anywhere on the beaker, throw with real velocity */
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
    // A re-init under reduced motion must get the static fallback back
    host.classList.remove("is-live", "is-grabbing");
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

    // Heat: the beaker cooks whenever it sits (or is held) over the flame
    const overFlame =
      beaker.alive &&
      Math.abs(beaker.x - burner.x) < 34 &&
      beaker.y + BK.hh > benchY - 64;
    if (overFlame) heat = Math.min(1, heat + 0.0062);
    else heat = Math.max(0, heat - 0.004);
    if (heat >= 1 && beaker.alive) explode();

    // Rolling boil, scaling with heat
    if (beaker.alive && heat > 0.15 && Math.random() < heat * 0.5) {
      boils.push({
        dx: (Math.random() - 0.5) * BK.hw * 1.5,
        dy: BK.hh - 4,
        r: 1 + Math.random() * (1.5 + heat * 2),
        vy: -(0.4 + Math.random() * 0.8 + heat),
      });
    }
    boils = boils.filter((b) => {
      b.dy += b.vy;
      return b.dy > 10 - heat * 4;
    });

    // Steam once it is properly cooking
    if (beaker.alive && heat > 0.45 && Math.random() < heat * 0.3) {
      wisps.push({
        x: beaker.x + (Math.random() - 0.5) * BK.hw * 1.6,
        y: beaker.y - BK.hh - 4,
        r: 2.5 + Math.random() * 4,
        vy: -(0.5 + Math.random() * 0.7),
        life: 1,
      });
    }
    wisps = wisps.filter((w) => {
      w.y += w.vy;
      w.r += 0.09;
      w.life -= 0.016;
      return w.life > 0;
    });

    if (flash) {
      flash.r += 7;
      flash.a *= 0.86;
      if (flash.a < 0.02) flash = null;
    }

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

    // Spirit burner: dish on the bench, flame always lit and flickering
    ctx.fillStyle = ink;
    ctx.beginPath();
    ctx.roundRect
      ? ctx.roundRect(burner.x - 15, benchY - 9, 30, 9, 3)
      : ctx.rect(burner.x - 15, benchY - 9, 30, 9);
    ctx.fill();
    const flick = Math.sin(t * 0.31) * 3 + Math.sin(t * 0.13 + 2) * 2;
    const fh = 30 + flick + heat * 10;
    ctx.globalAlpha = 0.88;
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.moveTo(burner.x - 9, benchY - 9);
    ctx.quadraticCurveTo(burner.x - 10, benchY - 9 - fh * 0.55, burner.x + flick * 0.4, benchY - 9 - fh);
    ctx.quadraticCurveTo(burner.x + 10, benchY - 9 - fh * 0.55, burner.x + 9, benchY - 9);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#ffd77a";
    ctx.beginPath();
    ctx.moveTo(burner.x - 4.5, benchY - 9);
    ctx.quadraticCurveTo(burner.x - 5, benchY - 9 - fh * 0.32, burner.x + flick * 0.3, benchY - 9 - fh * 0.55);
    ctx.quadraticCurveTo(burner.x + 5, benchY - 9 - fh * 0.32, burner.x + 4.5, benchY - 9);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    // Steam
    wisps.forEach((w) => {
      ctx.globalAlpha = w.life * 0.28;
      ctx.fillStyle = "#64748b";
      ctx.beginPath();
      ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Shards, glass reads as pale ink outlines
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
      ctx.fillStyle = d.color || accent;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // The explosion's flash ring
    if (flash) {
      ctx.globalAlpha = flash.a;
      ctx.strokeStyle = "#e01b84";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(flash.x, flash.y, flash.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = flash.a * 0.55;
      ctx.beginPath();
      ctx.arc(flash.x, flash.y, flash.r * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    if (!beaker.alive) return;

    ctx.save();
    // The closer to boiling over, the harder it rattles
    const shake = heat > 0.3 ? (Math.random() - 0.5) * heat * 3.4 : 0;
    ctx.translate(beaker.x + shake, beaker.y + shake * 0.4);
    ctx.rotate(beaker.tilt);
    ctx.scale(beaker.scale, beaker.scale);

    // Liquid, clipped inside the glass, with a lazy slosh. Its colour runs
    // house-cyan to house-magenta as the compound overheats.
    ctx.save();
    glassPath();
    ctx.closePath();
    ctx.clip();
    const slosh = Math.sin(t * 0.06) * (2.5 + heat * 4) - beaker.tilt * 26;
    const hot = clamp(heat * 1.15, 0, 1);
    ctx.fillStyle = `rgb(${Math.round(14 + (224 - 14) * hot)}, ${Math.round(143 + (27 - 143) * hot)}, ${Math.round(199 + (132 - 199) * hot)})`;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.moveTo(-BK.hw - 6, 8 + slosh);
    ctx.quadraticCurveTo(0, 8 - slosh, BK.hw + 6, 8 + slosh);
    ctx.lineTo(BK.hw + 6, BK.hh + 2);
    ctx.lineTo(-BK.hw - 6, BK.hh + 2);
    ctx.closePath();
    ctx.fill();

    // The boil, rising through the liquid
    ctx.fillStyle = "#ffffff";
    boils.forEach((b) => {
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.arc(b.dx, b.dy, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
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

  // Assessment complete when the visitor has genuinely done the lot,
  // breakage is not penalised, which is rather the point of the place.
  const checkComplete = () => {
    if (complete) return;
    if (scores.curiosity >= 80 && scores.stirring >= 80 && scores.thoroughness >= 90) {
      complete = true;
      card.classList.add("is-complete");
      if (cat) cat.classList.add("cat-proud");
      if (logEl) logEl.textContent = "Assessment complete. Pioneer material, apply within.";
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

  // Confirm the calm state in the log, so toggling the reduced-motion
  // checkbox visibly does something even down here
  if (reduced && logEl) {
    logEl.textContent = "Reduced motion is on. The lab sits still; everything still works.";
  }

  // Curiosity, distinct features inspected
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

  // Reading the documentation, FAQ disclosures (toggle doesn't bubble)
  on(root, "toggle", (e) => {
    if (!e.target.matches || !e.target.matches("details.lab-faq-item")) return;
    if (!e.target.open) return;
    scores.curiosity = Math.min(100, scores.curiosity + 12);
    paint("curiosity");
    say("Subject reads the documentation. Impressive.");
  }, true);

  // Stirring technique, pointer work over anything holding liquid
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

  // Risk assessment, starts perfect, and then people find the beaker
  on(window, "whimsy:beaker-broken", (e) => {
    const count = (e.detail && e.detail.count) || 1;
    scores.risk = Math.max(0, scores.risk - (count === 1 ? 35 : 20));
    paint("risk");
    say(count === 1
      ? "Beaker destroyed. Deliberately, by the look of it. £0.00 charged."
      : `Beaker #${count} destroyed. The subject is enjoying this.`, "cat-alarm");
  });

  // Overheating a compound is worse. Technically. It is also the whole point.
  on(window, "whimsy:compound-overheated", (e) => {
    const count = (e.detail && e.detail.count) || 1;
    scores.risk = Math.max(0, scores.risk - 30);
    paint("risk");
    say(count === 1
      ? "Subject overheated a compound. It reacted. As advertised."
      : "Another compound gone. The lab replaces itself; the lesson stays.", "cat-alarm");
  });

  // Thoroughness, how much of the lab tour was actually taken
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

export default function initFeatureLab(root, opts) {
  if (!root || typeof window === "undefined") return () => {};

  // forceReduced can only ever ADD calm (the page's own reduced-motion
  // toggle); a visitor whose OS asks for reduced motion always gets it.
  const reduced =
    (opts && opts.forceReduced) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loops = [];
  const cleanups = [];

  initDrop(root, reduced, loops, cleanups);
  initWatch(root, reduced, cleanups);

  // For the visitors who open the console, WhimsyCat noticed
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
