const fs = require('fs');
const path = require('path');

/**
 * Asset Extraction System - Identifies and manages CSS/JS assets for components
 */
class AssetExtractor {
  constructor(buildDir = './build') {
    this.buildDir = buildDir;
    this.assetManifest = null;
    this.loadAssetManifest();
  }

  /**
   * Load the React build asset manifest
   */
  loadAssetManifest() {
    try {
      const manifestPath = path.join(this.buildDir, 'asset-manifest.json');
      if (fs.existsSync(manifestPath)) {
        const manifestContent = fs.readFileSync(manifestPath, 'utf8');
        this.assetManifest = JSON.parse(manifestContent);
      } else {
        console.warn('Asset manifest not found. Run React build first.');
        this.assetManifest = { files: {}, entrypoints: [] };
      }
    } catch (error) {
      console.error('Error loading asset manifest:', error);
      this.assetManifest = { files: {}, entrypoints: [] };
    }
  }

  /**
   * Get critical CSS files that should be included in all pages
   * @returns {Array} - Array of CSS file paths
   */
  getCriticalCSS() {
    if (!this.assetManifest) return [];
    
    const cssFiles = [];
    
    // Get main CSS file
    if (this.assetManifest.files['main.css']) {
      cssFiles.push(this.assetManifest.files['main.css']);
    }
    
    // Get any other CSS files from entrypoints
    this.assetManifest.entrypoints?.forEach(entrypoint => {
      if (entrypoint.endsWith('.css') && !cssFiles.includes(entrypoint)) {
        cssFiles.push(entrypoint);
      }
    });
    
    return cssFiles;
  }

  /**
   * Get JavaScript files required for the application
   * @returns {Array} - Array of JS file paths
   */
  getJavaScriptFiles() {
    if (!this.assetManifest) return [];
    
    const jsFiles = [];
    
    // Get main JS file
    if (this.assetManifest.files['main.js']) {
      jsFiles.push(this.assetManifest.files['main.js']);
    }
    
    // Get chunk files
    Object.keys(this.assetManifest.files).forEach(key => {
      if (key.includes('.chunk.js') && !key.includes('.map')) {
        jsFiles.push(this.assetManifest.files[key]);
      }
    });
    
    return jsFiles;
  }

  /**
   * Extract critical CSS content for inlining
   * @returns {string} - Critical CSS content
   */
  extractCriticalCSSContent() {
    const criticalCSSFiles = this.getCriticalCSS();
    let criticalCSS = '';
    
    criticalCSSFiles.forEach(cssFile => {
      try {
        const cssPath = path.join(this.buildDir, cssFile);
        if (fs.existsSync(cssPath)) {
          const cssContent = fs.readFileSync(cssPath, 'utf8');
          criticalCSS += cssContent + '\n';
        }
      } catch (error) {
        console.warn(`Could not read CSS file ${cssFile}:`, error.message);
      }
    });
    
    return criticalCSS;
  }

  /**
   * Get all static media assets
   * @returns {Array} - Array of media asset paths
   */
  getMediaAssets() {
    if (!this.assetManifest) return [];
    
    const mediaAssets = [];
    
    Object.keys(this.assetManifest.files).forEach(key => {
      if (key.startsWith('static/media/')) {
        mediaAssets.push({
          key,
          path: this.assetManifest.files[key]
        });
      }
    });
    
    return mediaAssets;
  }

  /**
   * Create asset bundle for a specific component/page
   * @param {string} componentName - Name of the component
   * @returns {Object} - Asset bundle for the component
   */
  createAssetBundle(componentName = 'default') {
    return {
      css: this.getCriticalCSS(),
      js: this.getJavaScriptFiles(),
      media: this.getMediaAssets(),
      criticalCSS: this.extractCriticalCSSContent(),
      componentName
    };
  }

  /**
   * Generate HTML link tags for CSS files
   * @param {Array} cssFiles - Array of CSS file paths
   * @returns {string} - HTML link tags
   */
  generateCSSLinks(cssFiles = null) {
    const files = cssFiles || this.getCriticalCSS();
    return files.map(file => 
      `<link href="${file}" rel="stylesheet">`
    ).join('\n  ');
  }

  /**
   * Generate HTML script tags for JS files
   * @param {Array} jsFiles - Array of JS file paths
   * @returns {string} - HTML script tags
   */
  generateJSScripts(jsFiles = null) {
    const files = jsFiles || this.getJavaScriptFiles();
    return files.map(file => 
      `<script defer="defer" src="${file}"></script>`
    ).join('\n  ');
  }

  /**
   * Generate preload links for critical assets
   * @returns {string} - HTML preload link tags
   */
  generatePreloadLinks() {
    const criticalAssets = [
      ...this.getCriticalCSS().map(file => ({ href: file, as: 'style' })),
      ...this.getJavaScriptFiles().slice(0, 1).map(file => ({ href: file, as: 'script' }))
    ];
    
    return criticalAssets.map(asset => 
      `<link rel="preload" href="${asset.href}" as="${asset.as}">`
    ).join('\n  ');
  }

  /**
   * Get optimized asset loading configuration
   * @returns {Object} - Optimized asset configuration
   */
  getOptimizedAssets() {
    return {
      preload: this.generatePreloadLinks(),
      css: this.generateCSSLinks(),
      js: this.generateJSScripts(),
      criticalCSS: this.extractCriticalCSSContent(),
      media: this.getMediaAssets()
    };
  }
}

module.exports = AssetExtractor;