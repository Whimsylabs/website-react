// Internationalization configuration for static builds
const SUPPORTED_LANGUAGES = {
  en: {
    code: "en",
    name: "English",
    flag: "🇬🇧",
    dir: "ltr",
  },
  es: {
    code: "es",
    name: "Español",
    flag: "🇪🇸",
    dir: "ltr",
  },
  fr: {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
    dir: "ltr",
  },
  de: {
    code: "de",
    name: "Deutsch",
    flag: "🇩🇪",
    dir: "ltr",
  },
  jp: {
    code: "jp",
    name: "日本語",
    flag: "🇯🇵",
    dir: "ltr",
  },
};

const DEFAULT_LANGUAGE = "en";

// Get current language from URL path
function getCurrentLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  const path = window.location.pathname;
  const langCode = path.split("/")[1];

  return SUPPORTED_LANGUAGES[langCode] ? langCode : DEFAULT_LANGUAGE;
}

// Get language-specific URL
function getLocalizedPath(path, lang = getCurrentLanguage()) {
  // Remove existing language prefix if present
  const cleanPath = path.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

  const localized = lang === DEFAULT_LANGUAGE ? cleanPath : `/${lang}${cleanPath}`;

  // Always emit trailing slashes: canonicals and the sitemap use them, and
  // slash-less internal links get indexed as duplicate URLs on GitHub Pages
  if (
    !localized.endsWith("/") &&
    !localized.includes(".") &&
    !localized.includes("#") &&
    !localized.includes("?")
  ) {
    return `${localized}/`;
  }
  return localized;
}

// Get path without language prefix
function getCleanPath(path) {
  return path.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
}

// Get alternate language URLs for hreflang
function getAlternateUrls(currentPath) {
  const alternates = {};

  Object.keys(SUPPORTED_LANGUAGES).forEach((lang) => {
    alternates[lang] = getLocalizedPath(currentPath, lang);
  });

  return alternates;
}

// Export for both CommonJS and ES modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    SUPPORTED_LANGUAGES,
    DEFAULT_LANGUAGE,
    getCurrentLanguage,
    getLocalizedPath,
    getCleanPath,
    getAlternateUrls,
  };
} else {
  // Browser globals
  window.SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES;
  window.DEFAULT_LANGUAGE = DEFAULT_LANGUAGE;
  window.getCurrentLanguage = getCurrentLanguage;
  window.getLocalizedPath = getLocalizedPath;
  window.getCleanPath = getCleanPath;
  window.getAlternateUrls = getAlternateUrls;
}
