const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const blogData = require('../src/i18n/blogData.generated.js');

const BUILD_DIR = path.join(__dirname, '../build');
const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de'];

describe('Static Build Verification', () => {
  // Helper to read HTML file
  const readHtmlFile = (filePath) => {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      return null;
    }
  };

  // Helper to get expected path
  const getExpectedPath = (lang, slug) => {
    const langPrefix = lang === 'en' ? '' : `/${lang}`;
    return path.join(BUILD_DIR, langPrefix, 'blog', slug, 'index.html');
  };

  test('Build directory exists', () => {
    expect(fs.existsSync(BUILD_DIR)).toBe(true);
  });

  describe('Blog Posts', () => {
    SUPPORTED_LANGUAGES.forEach(lang => {
      describe(`${lang.toUpperCase()} Blog Posts`, () => {
        const posts = blogData[lang] || [];

        posts.forEach(post => {
          test(`Should have correct content for ${post.slug}`, () => {
            const filePath = getExpectedPath(lang, post.slug);
            const html = readHtmlFile(filePath);

            // 1. File must exist
            expect(html).not.toBeNull();

            // 2. Parse HTML
            const $ = cheerio.load(html);

            // 3. Check Language Attribute
            expect($('html').attr('lang')).toBe(lang);

            // 4. Check Title (should match the translated title)
            expect($('title').text()).toContain(post.title);

            // 5. Check Description
            const metaDescription = $('meta[name="description"]').attr('content');
            expect(metaDescription).toBe(post.description);

            // 6. Check Content Specifics
            const h1Text = $('h1').first().text();
            expect(h1Text).toContain(post.title);
          });
        });
      });
    });
  });
});
