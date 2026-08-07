import React from "react";

// Dedicated header for the /industrial route.
// Deliberately not the main site Header: no language switcher (this route is
// English only), no schools navigation, and a black lockup rather than the
// purple education branding. Two links only, so no burger menu is needed.
const IndustrialHeader = () => (
  <>
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
    <header className="ind-header" aria-label="Industrial site navigation">
      <div className="ind-header-inner">
        <a
          href="/industrial/"
          className="ind-lockup"
          aria-label="WhimsyLabs Industrial, return to top"
        >
          <img src="/images/logo.png" alt="WhimsyLabs" className="ind-lockup-mark" />
          <span className="ind-lockup-word">Industrial</span>
        </a>

        <nav className="ind-nav" aria-label="Primary navigation">
          <a href="/" className="ind-nav-alt">
            Educational
          </a>
          <a href="/contact/" className="ind-nav-cta">
            Contact
          </a>
        </nav>
      </div>
    </header>
  </>
);

export default IndustrialHeader;
