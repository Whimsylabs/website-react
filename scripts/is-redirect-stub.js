/**
 * Detects a generated redirect-stub page.
 *
 * Region-specific blog posts (see src/i18n/blogPostLanguageRestrictions.json) are
 * English-only. For the languages they are NOT published in, build.js writes a small
 * 200-status redirect page (noindex + meta-refresh) that bounces to the English URL.
 *
 * These pages intentionally have no meta description, Open Graph tags, schema, or unique
 * content, so SEO/content validators should skip them. They are identified by having
 * BOTH a meta-refresh and a robots "noindex" directive.
 *
 * @param {string} html - Raw HTML of the page.
 * @returns {boolean}
 */
function isRedirectStub(html) {
  if (!html || typeof html !== 'string') return false;
  const hasRefresh = /http-equiv=["']refresh["']/i.test(html);
  const hasNoindex = /name=["']robots["'][^>]*noindex/i.test(html);
  return hasRefresh && hasNoindex;
}

module.exports = { isRedirectStub };
