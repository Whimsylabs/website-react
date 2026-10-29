import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Header.css";
import LanguageSwitcher from "./LanguageSwitcher";
import withTranslation from "./withTranslation";
import { getLocalizedPath } from "../i18n";

/* Below this width the bar collapses to a hamburger. Chosen so the longest
   label set (German) still fits on one line above it, rather than shrinking
   type until the links squash together. Mirrored in Header.css. */
const MOBILE_BREAKPOINT = 900;

/* Stroked glyphs on the same 24x24 grid the subject-lab tabs use, so the Labs
   menu reads as part of the same system as /features and /chemistry. */
const GLYPHS = {
  biology: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round">
      <path d="M19,4.5 C19,13.5 13.5,19 4.5,19 C4.5,10 10,4.5 19,4.5 Z" />
      <path d="M5.5,18 C9,14 12.5,10.5 16.5,7" strokeLinecap="round" />
    </g>
  ),
  chemistry: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round">
      <path d="M10,3.5 L10,9 L5.2,16.8 C4.5,18 5.3,19.3 6.6,19.3 L17.4,19.3 C18.7,19.3 19.5,18 18.8,16.8 L14,9 L14,3.5" />
      <line x1="8.2" y1="3.5" x2="15.8" y2="3.5" strokeLinecap="round" />
    </g>
  ),
  physics: (
    <g fill="none" stroke="currentColor" strokeWidth="1.7">
      <ellipse cx="12" cy="12" rx="8.6" ry="3.4" />
      <ellipse cx="12" cy="12" rx="8.6" ry="3.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="8.6" ry="3.4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </g>
  ),
  guide: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round">
      <path d="M11.5,6 C10,4.6 7.8,4 4.5,4 L4.5,17.5 C7.8,17.5 10,18.1 11.5,19.5" />
      <path d="M12.5,6 C14,4.6 16.2,4 19.5,4 L19.5,17.5 C16.2,17.5 14,18.1 12.5,19.5" />
    </g>
  ),
};

/* Links either side of the Labs group */
const LEAD_LINKS = [
  { route: "/", key: "nav.home" },
  { route: "/features", key: "nav.features" },
];

const TRAIL_LINKS = [
  { route: "/blog", key: "nav.blog" },
  { route: "/faq", key: "nav.faq" },
  { route: "/grants", key: "nav.grants" },
  { route: "/contact", key: "nav.contact" },
];

/* Subject pages plus the buyer's guide. Labels reuse the footer keys, which
   already carry translations for all five languages. */
const LAB_LINKS = [
  { route: "/biology", key: "footer.biology", ariaKey: "footer.biologyLabel", glyph: "biology" },
  { route: "/chemistry", key: "footer.chemistry", ariaKey: "footer.chemistryLabel", glyph: "chemistry" },
  { route: "/physics", key: "footer.physics", ariaKey: "footer.physicsLabel", glyph: "physics" },
];

const GUIDE_LINK = {
  route: "/choose-virtual-lab",
  key: "footer.chooseVirtualLab",
  ariaKey: "footer.chooseVirtualLabLabel",
  glyph: "guide",
};

/* Strip any language prefix and force one trailing slash, so the current URL
   can be compared against the unlocalised routes above. */
function normalisePath(path) {
  const clean = path.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
  return clean.endsWith("/") ? clean : `${clean}/`;
}

const Header = ({ t, currentLang }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [labsOpen, setLabsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState("");

  const navRef = useRef(null);
  const burgerRef = useRef(null);
  const labsRef = useRef(null);
  const labsButtonRef = useRef(null);

  /* Everything below touches window/document from effects only, so the server
     render (renderToString in build.js) never sees them. */

  // Which page we are on. Server render has no active item, the client adds it.
  useEffect(() => {
    setActivePath(normalisePath(window.location.pathname));
  }, []);

  // Depth cue: the bar compacts and casts a shadow once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback((returnFocus) => {
    setMenuOpen(false);
    setLabsOpen(false);
    if (returnFocus && burgerRef.current) burgerRef.current.focus();
  }, []);

  // Escape closes whichever layer is open and hands focus back to its trigger.
  useEffect(() => {
    if (!menuOpen && !labsOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== "Escape" && event.key !== "Esc") return;
      if (labsOpen) {
        setLabsOpen(false);
        if (labsButtonRef.current) labsButtonRef.current.focus();
        return;
      }
      closeMenu(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, labsOpen, closeMenu]);

  // A click outside the Labs group dismisses its panel.
  useEffect(() => {
    if (!labsOpen) return undefined;
    const onPointerDown = (event) => {
      if (labsRef.current && !labsRef.current.contains(event.target)) setLabsOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [labsOpen]);

  /* The panel only ever opens from the hamburger, which is hidden above the
     breakpoint, so moving focus into it here is always the mobile case. */
  useEffect(() => {
    if (!menuOpen) return undefined;
    const first = navRef.current && navRef.current.querySelector("a, button");
    if (first) first.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onResize = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const isActive = (route) => activePath !== "" && activePath === normalisePath(route);
  const labsActive = [...LAB_LINKS, GUIDE_LINK].some((item) => isActive(item.route));

  const renderLink = ({ route, key }) => (
    <li className="site-nav-item" key={route}>
      <a
        href={getLocalizedPath(route, currentLang)}
        className={`site-nav-link ${isActive(route) ? "is-active" : ""}`}
        aria-current={isActive(route) ? "page" : undefined}
        onClick={() => closeMenu(false)}
      >
        {t(key)}
      </a>
    </li>
  );

  const renderLabLink = ({ route, key, ariaKey, glyph }, className) => (
    <li key={route}>
      <a
        href={getLocalizedPath(route, currentLang)}
        className={`site-labs-item ${className || ""} ${isActive(route) ? "is-active" : ""}`}
        aria-label={t(ariaKey)}
        aria-current={isActive(route) ? "page" : undefined}
        onClick={() => closeMenu(false)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          {GLYPHS[glyph]}
        </svg>
        <span>{t(key)}</span>
      </a>
    </li>
  );

  const headerClass = [
    "site-header",
    scrolled ? "is-scrolled" : "",
    menuOpen ? "is-menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="skip-link">
        {t("nav.skipToContent")}
      </a>

      <header className={headerClass} aria-label={t("nav.siteNavigation")}>
        <div className="site-header-inner">
          <a
            className="site-logo"
            href={getLocalizedPath("/", currentLang)}
            aria-label={t("nav.home")}
          >
            <img src="/images/logo.png" alt="Whimsylabs Logo" className="logo" />
          </a>

          <nav
            id="site-menu"
            ref={navRef}
            className={`site-nav ${menuOpen ? "is-open" : ""}`}
            aria-label={t("nav.primaryLabel")}
          >
            <ul className="site-nav-list">
              {LEAD_LINKS.map(renderLink)}

              <li className="site-nav-item site-labs" ref={labsRef}>
                <button
                  type="button"
                  ref={labsButtonRef}
                  className={`site-nav-link site-labs-trigger ${labsActive ? "is-active" : ""}`}
                  aria-expanded={labsOpen}
                  aria-controls="site-labs-menu"
                  onClick={() => setLabsOpen((open) => !open)}
                >
                  {t("nav.labs")}
                  <svg
                    className="site-labs-chevron"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M7,10 L12,15 L17,10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  id="site-labs-menu"
                  className={`site-labs-menu ${labsOpen ? "is-open" : ""}`}
                >
                  <ul className="site-labs-list">
                    {LAB_LINKS.map((item) => renderLabLink(item))}
                    {renderLabLink(GUIDE_LINK, "site-labs-guide")}
                  </ul>
                </div>
              </li>

              {TRAIL_LINKS.map(renderLink)}
            </ul>
          </nav>

          <div className="site-header-tools">
            <div className="site-lang">
              <LanguageSwitcher />
            </div>

            <button
              type="button"
              ref={burgerRef}
              className="site-burger"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              onClick={() => (menuOpen ? closeMenu(false) : setMenuOpen(true))}
            >
              <span className="site-burger-bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default withTranslation(Header);
