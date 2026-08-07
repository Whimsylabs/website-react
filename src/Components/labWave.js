import React from "react";

/**
 * labWave.js, the wave seam used at the edges of dark bands on the subject
 * pages: a static echo of the chemistry liquid divider, cut from the colour of
 * the neighbouring band so a dark band never meets a light one along a ruled
 * line. Styling lives in SubjectLab.css (.lab-wave and variants).
 *
 *   <Wave />          top edge, cut from --lab-paper
 *   <Wave ground />   top edge, cut from --lab-ground
 *   <Wave flip />     bottom edge
 */

const WAVE_FILL = "M0,0 L1440,0 L1440,20 C1260,38 1140,6 960,18 C780,30 660,4 480,16 C300,28 160,8 0,22 Z";
const WAVE_EDGE = "M1440,20 C1260,38 1140,6 960,18 C780,30 660,4 480,16 C300,28 160,8 0,22";

const Wave = ({ flip, ground }) => (
  <div
    className={`lab-wave${flip ? " lab-wave--flip" : ""}${ground ? " lab-wave--ground" : ""}`}
    aria-hidden="true"
  >
    <svg viewBox="0 0 1440 44" preserveAspectRatio="none" focusable="false">
      <path d={WAVE_FILL} fill="currentColor" />
      <path d={WAVE_EDGE} fill="none" stroke="var(--lab-accent-lit)" strokeWidth="2" opacity="0.35" />
    </svg>
  </div>
);

export default Wave;
