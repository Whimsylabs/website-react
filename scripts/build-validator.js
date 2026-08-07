/**
 * Build Validation System - Ensures consistency between build folder, sitemap, and robots.txt
 */
const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');
const { isRedirectStub } = require('./is-redirect-stub');

class BuildValidator {
  constructor(buildDir = './build', siteUrl = 'https://whimsylabs.ai') {
    this.buildDir = buildDir;
    this.siteUrl = siteUrl;
    this.errors = [];
    this.warnings = [];
  }

  /**
   * Scan build directory and return all HTML files as URLs
   */
  async scanBuildDirectory() {
    try {
      const htmlFiles = await glob(`${this.buildDir}/**/*.html`);

      const entries = htmlFiles
        .map(file => {
          // Convert to forward slashes
          const normalizedFile = file.replace(/\\/g, '/');
          let normalizedBuildDir = this.buildDir.replace(/\\/g, '/');
          
          // Handle relative path like "./build" -> "build"
          if (normalizedBuildDir.startsWith('./')) {
            normalizedBuildDir = normalizedBuildDir.substring(2);
          }
          
          // Find where the build directory ends in the file path
          let url;
          const buildDirIndex = normalizedFile.indexOf(normalizedBuildDir);
          if (buildDirIndex !== -1) {
            url = normalizedFile.substring(buildDirIndex + normalizedBuildDir.length);
          } else {
            // Fallback: assume everything after 'build' is the path
            url = normalizedFile.replace(/^.*\/build/, '');
          }
          
          // Clean up the URL
          url = url
            .replace(/^\/+/, '') // Remove leading slashes
            .replace(/index\.html$/, '') // Anchored: leading slashes are already gone, so root index.html matches too
            .replace(/\.html$/, '')
            .replace(/\/+$/, '');

          // Add leading slash and trailing slash for proper URL format
          if (!url || url === '') {
            url = '/'; // Root path
          } else {
            url = '/' + url + '/';
          }
          
          return { file, url };
        })
        .filter(({ url }) => {
          // Filter out non-page files and system paths
          return !url.includes('/static/') &&
                 !url.includes('/images/') &&
                 !url.includes('/videos/') &&
                 !url.includes('/js/') &&
                 !url.includes('/css/') &&
                 url !== '/404/' &&
                 url !== '/manifest.json/' &&
                 url !== '/spa/';      // SPA fallback page
        });

      // Redirect stubs for region-specific posts are noindex + meta-refresh and are
      // deliberately kept out of the sitemap, so they must not count as indexable pages.
      const pages = [];
      let stubCount = 0;
      for (const { file, url } of entries) {
        if (isRedirectStub(await fs.readFile(file, 'utf8'))) {
          stubCount++;
          continue;
        }
        pages.push(url);
      }
      const urls = pages.sort();

      console.log(`📁 Found ${urls.length} HTML pages in build directory` +
        (stubCount > 0 ? ` (skipped ${stubCount} redirect stubs)` : ''));
      return urls;
    } catch (error) {
      this.errors.push(`Failed to scan build directory: ${error.message}`);
      return [];
    }
  }

  /**
   * Parse sitemap.xml and return all URLs
   */
  async parseSitemap() {
    try {
      const sitemapPath = path.join(this.buildDir, 'sitemap.xml');
      if (!await fs.pathExists(sitemapPath)) {
        this.errors.push('sitemap.xml not found in build directory');
        return [];
      }

      const sitemapContent = await fs.readFile(sitemapPath, 'utf8');
      const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
      
      const urls = urlMatches
        .map(match => {
          const url = match.replace(/<loc>|<\/loc>/g, '');
          return url.replace(this.siteUrl, '');
        })
        .sort();

      console.log(`🗺️  Found ${urls.length} URLs in sitemap.xml`);
      return urls;
    } catch (error) {
      this.errors.push(`Failed to parse sitemap.xml: ${error.message}`);
      return [];
    }
  }

  /**
   * Parse robots.txt and return allowed/disallowed patterns
   */
  async parseRobotsTxt() {
    try {
      const robotsPath = path.join(this.buildDir, 'robots.txt');
      if (!await fs.pathExists(robotsPath)) {
        this.errors.push('robots.txt not found in build directory');
        return { allowed: [], disallowed: [] };
      }

      const robotsContent = await fs.readFile(robotsPath, 'utf8');
      const lines = robotsContent.split('\\n');
      
      const allowed = [];
      const disallowed = [];

      lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('Allow:')) {
          allowed.push(line.replace('Allow:', '').trim());
        } else if (line.startsWith('Disallow:')) {
          disallowed.push(line.replace('Disallow:', '').trim());
        }
      });

      console.log(`🤖 Found ${allowed.length} Allow and ${disallowed.length} Disallow rules in robots.txt`);
      return { allowed, disallowed };
    } catch (error) {
      this.errors.push(`Failed to parse robots.txt: ${error.message}`);
      return { allowed: [], disallowed: [] };
    }
  }

  /**
   * Validate consistency between build, sitemap, and robots.txt
   */
  async validate() {
    console.log('\\n🔍 Starting build validation...');
    console.log('=================================');

    const buildUrls = await this.scanBuildDirectory();
    const sitemapUrls = await this.parseSitemap();
    const robotsRules = await this.parseRobotsTxt();

    // Check for missing pages in sitemap
    const missingInSitemap = buildUrls.filter(url => !sitemapUrls.includes(url));
    if (missingInSitemap.length > 0) {
      this.errors.push(`Pages in build but missing from sitemap (${missingInSitemap.length}):\n${missingInSitemap.map(url => `  - ${url}`).join('\n')}`);
    }

    // Check for phantom URLs in sitemap
    const phantomInSitemap = sitemapUrls.filter(url => {
      // Special handling for root URL
      if (url === '/') {
        return !buildUrls.includes('/');
      }
      
      // Convert sitemap URL back to what the build URL would be
      let buildEquivalent = url;
      if (!buildEquivalent.endsWith('/') && buildEquivalent !== '/') {
        buildEquivalent += '/';
      }
      return !buildUrls.includes(buildEquivalent);
    });
    
    if (phantomInSitemap.length > 0) {
      this.warnings.push(`URLs in sitemap but missing from build (${phantomInSitemap.length}):\n${phantomInSitemap.map(url => `  - ${url}`).join('\n')}`);
    }

    // Check robots.txt patterns against actual URLs
    const actualDisallowedUrls = buildUrls.filter(url => {
      return robotsRules.disallowed.some(pattern => {
        if (pattern.endsWith('*')) {
          return url.startsWith(pattern.slice(0, -1));
        }
        return url === pattern || url.startsWith(pattern);
      });
    });

    if (actualDisallowedUrls.length > 0) {
      this.warnings.push(`URLs in build that match robots.txt Disallow patterns (${actualDisallowedUrls.length}):\n${actualDisallowedUrls.map(url => `  - ${url}`).join('\n')}`);
    }

    // Summary
    console.log('\\n📊 Validation Summary:');
    console.log('=====================');
    console.log(`Build pages: ${buildUrls.length}`);
    console.log(`Sitemap URLs: ${sitemapUrls.length}`);
    console.log(`Robots Allow rules: ${robotsRules.allowed.length}`);
    console.log(`Robots Disallow rules: ${robotsRules.disallowed.length}`);

    if (this.errors.length > 0) {
      console.log('\\n❌ ERRORS:');
      this.errors.forEach(error => console.log(`   ${error}`));
    }

    if (this.warnings.length > 0) {
      console.log('\\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => console.log(`   ${warning}`));
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\\n✅ All validation checks passed!');
    }

    return {
      success: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      stats: {
        buildPages: buildUrls.length,
        sitemapUrls: sitemapUrls.length,
        robotsAllowed: robotsRules.allowed.length,
        robotsDisallowed: robotsRules.disallowed.length
      }
    };
  }

  /**
   * Generate updated robots.txt based on actual build content
   */
  async generateRobotsTxt(posts = []) {
    const buildUrls = await this.scanBuildDirectory();
    
    let robotsTxt = `# https://www.robotstxt.org/robotstxt.html
# WhimsyLabs Virtual Laboratory Software
# Generated automatically based on build content
# Last updated: ${new Date().toISOString().split('T')[0]}

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${this.siteUrl}/sitemap.xml

# Crawl delay to prevent server overload
Crawl-delay: 1

# Disallow access to temporary and system files
Disallow: /tmp/
Disallow: /*.json$
Disallow: /*.js$
Disallow: /*.css$
Disallow: /static/
Disallow: /manifest.json

# Disallow phantom nested URLs (known issues)
Disallow: /features/faq/
Disallow: /features/contact/
Disallow: /features/features/
Disallow: /services/contact/
Disallow: /*/features/faq/
Disallow: /*/features/contact/
Disallow: /*/features/features/
Disallow: /*/services/contact/

# Disallow email protection service
Disallow: /cdn-cgi/

# Explicitly allow all actual pages in build
# This ensures Google can crawl all legitimate pages`;

    // Extract main page categories from build URLs
    const pageCategories = new Set();
    const blogPosts = [];
    
    buildUrls.forEach(url => {
      if (url.includes('/blog/') && url !== '/blog/' && !url.match(/^\/[a-z]{2}\/blog\/$/)) {
        blogPosts.push(url);
      } else {
        const pathParts = url.split('/').filter(part => part);
        if (pathParts.length > 0) {
          pageCategories.add('/' + pathParts[0] + '/');
        }
      }
    });

    // Add explicit Allow rules for main categories
    robotsTxt += '\n\n# Main page categories - explicitly allowed for crawling';
    Array.from(pageCategories).sort().forEach(category => {
      if (category !== '/cdn-cgi/' && category !== '/static/' && category !== '/tmp/') {
        robotsTxt += `\nAllow: ${category}`;
      }
    });

    // Add explicit Allow directives for ALL valid pages (comprehensive Google crawling)
    const allValidUrls = [...buildUrls]
      .filter(url => 
        !url.includes('/static/') && 
        !url.includes('/cdn-cgi/') &&
        !url.includes('/tmp/') &&
        !url.endsWith('.json') && 
        !url.endsWith('.js') && 
        !url.endsWith('.css') &&
        !url.endsWith('.map')
      )
      .sort();
    
    if (allValidUrls.length > 0) {
      robotsTxt += '\n\n# All valid pages - explicitly allowed for Google crawling';
      allValidUrls.forEach(url => {
        robotsTxt += `\nAllow: ${url}`;
      });
    }

    // Add blog posts summary
    if (blogPosts.length > 0) {
      robotsTxt += `\n\n# Blog posts summary: ${blogPosts.length} total (included above)`;
    }

    robotsTxt += `\n\n# Total pages in build: ${buildUrls.length}`;
    robotsTxt += `\n# This file is generated automatically - do not edit manually`;

    return robotsTxt;
  }
}

module.exports = BuildValidator;