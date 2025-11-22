const express = require('express');
const path = require('path');
const chokidar = require('chokidar');
const { build } = require('./build.js');
const fs = require('fs-extra');
const { execSync } = require('child_process');

class DevServer {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.buildDir = './build';
    this.isBuilding = false;
    this.buildQueue = [];
    this.sseClients = new Set(); // Track connected browsers for auto-refresh
    
    this.setupMiddleware();
    this.setupRoutes();
    this.setupFileWatcher();
  }

  setupMiddleware() {
    // Enable CORS for development
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    // Serve static files from build directory
    this.app.use(express.static(this.buildDir, {
      setHeaders: (res, path) => {
        // Disable caching for development
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      }
    }));

    // Log all requests
    this.app.use((req, res, next) => {
      console.log(`📄 ${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
      next();
    });
  }

  setupRoutes() {
    // API endpoint to trigger manual rebuild
    this.app.post('/api/rebuild', async (req, res) => {
      console.log('🔄 Manual rebuild triggered via API');
      try {
        await this.triggerBuild('Manual rebuild requested');
        res.json({ success: true, message: 'Rebuild completed' });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // API endpoint to get build status
    this.app.get('/api/status', (req, res) => {
      res.json({
        isBuilding: this.isBuilding,
        buildDir: this.buildDir,
        queueLength: this.buildQueue.length,
        lastBuild: this.lastBuildTime || null
      });
    });

    // API endpoint to list all generated files
    this.app.get('/api/files', async (req, res) => {
      try {
        const files = await this.getGeneratedFiles();
        res.json({ files });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Serve development dashboard
    this.app.get('/dev-dashboard', (req, res) => {
      res.sendFile(path.resolve('./dev-dashboard.html'));
    });

    // Manual test endpoint to verify file watching
    this.app.get('/api/test-watch', (req, res) => {
      console.log('🧪 Manual test triggered - simulating file change');
      this.triggerBuild('Manual test via /api/test-watch');
      res.json({ success: true, message: 'Test rebuild triggered' });
    });

    // Server-Sent Events endpoint for auto-refresh
    this.app.get('/api/events', (req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
      });

      // Send initial connection message
      res.write('data: {"type":"connected","message":"Auto-refresh connected"}\n\n');

      // Add client to the set
      this.sseClients.add(res);
      console.log(`📡 Auto-refresh client connected (${this.sseClients.size} total)`);

      // Handle client disconnect
      req.on('close', () => {
        this.sseClients.delete(res);
        console.log(`📡 Auto-refresh client disconnected (${this.sseClients.size} remaining)`);
      });
    });

    // Catch-all handler for SPA routes
    this.app.get('*', (req, res, next) => {
      const filePath = this.resolveFilePath(req.path);
      
      if (fs.existsSync(filePath)) {
        // For HTML files, inject auto-refresh script
        if (filePath.endsWith('.html')) {
          this.serveHTMLWithAutoRefresh(filePath, res);
        } else {
          res.sendFile(path.resolve(filePath));
        }
      } else {
        // Try to serve index.html for SPA routes
        const indexPath = path.join(this.buildDir, 'index.html');
        if (fs.existsSync(indexPath)) {
          this.serveHTMLWithAutoRefresh(indexPath, res);
        } else {
          res.status(404).send(`
            <html>
              <head><title>File Not Found</title></head>
              <body>
                <h1>404 - File Not Found</h1>
                <p>The requested file <code>${req.path}</code> was not found.</p>
                <p>Build directory: <code>${this.buildDir}</code></p>
                <p><a href="/">Go to homepage</a></p>
                <hr>
                <p><small>WhimsyLabs Development Server</small></p>
              </body>
            </html>
          `);
        }
      }
    });
  }

  resolveFilePath(requestPath) {
    // Handle root path
    if (requestPath === '/') {
      return path.join(this.buildDir, 'index.html');
    }

    // Handle paths ending with /
    if (requestPath.endsWith('/')) {
      const indexPath = path.join(this.buildDir, requestPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        return indexPath;
      }
    }

    // Handle direct file requests (for static assets)
    const directPath = path.join(this.buildDir, requestPath);
    if (fs.existsSync(directPath) && !fs.statSync(directPath).isDirectory()) {
      return directPath;
    }

    // Try with index.html for directory-like paths
    const indexPath = path.join(this.buildDir, requestPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return indexPath;
    }

    // For language-specific routes, check if the path exists
    // e.g., /de/faq -> build/de/faq/index.html
    const languageIndexPath = path.join(this.buildDir, requestPath, 'index.html');
    if (fs.existsSync(languageIndexPath)) {
      return languageIndexPath;
    }

    return directPath; // Return original path even if it doesn't exist
  }

  setupFileWatcher() {
    console.log('👀 Setting up file watchers...');

    // Watch source files - simplified for Windows compatibility
    const srcWatcher = chokidar.watch([
      './src',
      './public',
      './build.js'
    ], {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/build/**',
        '**/dist/**',
        '**/public/static/**'
      ],
      persistent: true,
      ignoreInitial: true,
      recursive: true,
      usePolling: false,
      awaitWriteFinish: {
        stabilityThreshold: 100,
        pollInterval: 100
      }
    });

    console.log('🔍 Watching directories: ./src, ./public, ./build.js');

    const shouldProcessFile = (filePath) => {
      const ext = path.extname(filePath);
      const relevantExtensions = ['.js', '.jsx', '.css', '.json', '.md'];
      return relevantExtensions.includes(ext) || filePath.endsWith('build.js');
    };

    srcWatcher.on('change', (filePath) => {
      if (!shouldProcessFile(filePath)) return;
      
      const normalizedPath = filePath.replace(/\\/g, '/');
      console.log(`📝 File changed: ${normalizedPath}`);
      this.triggerBuild(`File changed: ${normalizedPath}`);
    });

    srcWatcher.on('add', (filePath) => {
      if (!shouldProcessFile(filePath)) return;
      
      const normalizedPath = filePath.replace(/\\/g, '/');
      console.log(`➕ File added: ${normalizedPath}`);
      this.triggerBuild(`File added: ${normalizedPath}`);
    });

    srcWatcher.on('unlink', (filePath) => {
      if (!shouldProcessFile(filePath)) return;
      
      const normalizedPath = filePath.replace(/\\/g, '/');
      console.log(`🗑️ File deleted: ${normalizedPath}`);
      this.triggerBuild(`File deleted: ${normalizedPath}`);
    });

    srcWatcher.on('error', (error) => {
      console.error('❌ File watcher error:', error);
    });

    srcWatcher.on('ready', () => {
      const watchedPaths = srcWatcher.getWatched();
      console.log('✅ File watchers active and ready');
      console.log('📁 Watching paths:', Object.keys(watchedPaths).length > 0 ? watchedPaths : 'No paths detected');
      
      // If no paths are being watched, try polling mode
      if (Object.keys(watchedPaths).length === 0) {
        console.log('⚠️ No paths detected, trying polling mode...');
        this.setupPollingWatcher();
      }
    });

    // Debug: Log all watcher events (but filter out noise)
    srcWatcher.on('all', (event, filePath) => {
      if (shouldProcessFile(filePath)) {
        console.log(`🔍 Watcher event: ${event} - ${filePath}`);
      }
    });
  }

  setupPollingWatcher() {
    console.log('🔄 Setting up polling-based file watcher as fallback...');
    
    const pollingWatcher = chokidar.watch([
      './src',
      './public',
      './build.js'
    ], {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/build/**',
        '**/dist/**',
        '**/public/static/**'
      ],
      persistent: true,
      ignoreInitial: true,
      recursive: true,
      usePolling: true,
      interval: 1000, // Check every second
      binaryInterval: 1000
    });

    const shouldProcessFile = (filePath) => {
      const ext = path.extname(filePath);
      const relevantExtensions = ['.js', '.jsx', '.css', '.json', '.md'];
      return relevantExtensions.includes(ext) || filePath.endsWith('build.js');
    };

    pollingWatcher.on('change', (filePath) => {
      if (!shouldProcessFile(filePath)) return;
      
      const normalizedPath = filePath.replace(/\\/g, '/');
      console.log(`📝 [POLLING] File changed: ${normalizedPath}`);
      this.triggerBuild(`File changed: ${normalizedPath}`);
    });

    pollingWatcher.on('ready', () => {
      const watchedPaths = pollingWatcher.getWatched();
      console.log('✅ Polling watcher ready');
      console.log('📁 Polling paths:', watchedPaths);
    });

    pollingWatcher.on('error', (error) => {
      console.error('❌ Polling watcher error:', error);
    });
  }

  notifyClients(type, data) {
    if (this.sseClients.size === 0) return;

    const message = JSON.stringify({ type, ...data, timestamp: Date.now() });
    const sseData = `data: ${message}\n\n`;

    // Send to all connected clients
    for (const client of this.sseClients) {
      try {
        client.write(sseData);
      } catch (error) {
        // Remove disconnected clients
        this.sseClients.delete(client);
      }
    }

    if (type === 'reload') {
      console.log(`🔄 Sent reload notification to ${this.sseClients.size} browser(s)`);
    }
  }

  serveHTMLWithAutoRefresh(filePath, res) {
    try {
      let html = fs.readFileSync(filePath, 'utf8');
      
      // Auto-refresh script to inject - wait for React to load to avoid hydration issues
      const autoRefreshScript = `
<script>
(function() {
  // Wait for React to fully load to avoid hydration conflicts
  function initAutoRefresh() {
    console.log('🔄 WhimsyLabs Auto-Refresh: Connecting...');
    
    const eventSource = new EventSource('/api/events');
    let isReloading = false;
    
    // Show status indicator
    const indicator = document.createElement('div');
    indicator.id = 'whimsylabs-dev-indicator';
    indicator.style.cssText = \`
      position: fixed;
      top: 10px;
      right: 10px;
      background: #27ae60;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      transition: all 0.3s ease;
    \`;
    indicator.textContent = '🔄 Connected';
    document.body.appendChild(indicator);
    
    eventSource.onmessage = function(event) {
      try {
        const data = JSON.parse(event.data);
        console.log('🔄 Auto-refresh event:', data);
        
        if (data.type === 'building') {
          indicator.style.background = '#f39c12';
          indicator.textContent = '🔨 Building...';
        } else if (data.type === 'reload' && !isReloading) {
          isReloading = true;
          indicator.style.background = '#3498db';
          indicator.textContent = '🔄 Reloading...';
          
          // Small delay to show the message
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (e) {
        console.warn('Auto-refresh: Failed to parse event data');
      }
    };
    
    eventSource.onerror = function(event) {
      console.log('🔄 Auto-refresh disconnected');
      indicator.style.background = '#e74c3c';
      indicator.textContent = '❌ Disconnected';
    };
    
    eventSource.onopen = function(event) {
      console.log('🔄 Auto-refresh connected');
      indicator.style.background = '#27ae60';
      indicator.textContent = '🔄 Connected';
    };
  }
  
  // Wait for DOM and React to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(initAutoRefresh, 1000); // Extra delay for React hydration
    });
  } else {
    setTimeout(initAutoRefresh, 1000);
  }
})();
</script>`;
      
      // Only inject script if not already present and if it's not already injected
      if (!html.includes('whimsylabs-dev-indicator') && !html.includes('WhimsyLabs Auto-Refresh')) {
        // Inject script before closing body tag
        if (html.includes('</body>')) {
          html = html.replace('</body>', autoRefreshScript + '\n</body>');
        } else {
          // Fallback: append to end of HTML
          html += autoRefreshScript;
        }
      }
      
      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    } catch (error) {
      console.error('Error serving HTML with auto-refresh:', error);
      res.sendFile(path.resolve(filePath));
    }
  }

  async triggerBuild(reason) {
    // Add to queue
    this.buildQueue.push({ reason, timestamp: Date.now() });

    // If already building, just queue it
    if (this.isBuilding) {
      console.log(`⏳ Build queued: ${reason}`);
      return;
    }

    // Start building
    this.isBuilding = true;
    console.log(`🔨 Starting build: ${reason}`);

    try {
      // Small delay to batch multiple rapid changes
      await new Promise(resolve => setTimeout(resolve, 500));

      // Clear the queue and build
      const queuedBuilds = [...this.buildQueue];
      this.buildQueue = [];

      console.log(`🚀 Building (${queuedBuilds.length} queued changes)...`);
      
      // Notify clients that build is starting
      this.notifyClients('building', { 
        message: 'Files changed, rebuilding...', 
        changes: queuedBuilds.length 
      });
      
      const startTime = Date.now();
      
      // First, run React build if source files changed
      const needsReactBuild = queuedBuilds.some(build => 
        build.reason.includes('src/Components') || 
        build.reason.includes('src/data') ||
        build.reason.includes('.js') ||
        build.reason.includes('.jsx') ||
        build.reason.includes('.css')
      );

      if (needsReactBuild) {
        console.log('🔄 React source files changed, rebuilding React app...');
        try {
          execSync('npm run build-spa', { 
            stdio: 'pipe',
            cwd: process.cwd()
          });
          console.log('✅ React build completed');
        } catch (reactBuildError) {
          console.error('❌ React build failed:', reactBuildError.message);
          throw reactBuildError;
        }
      }

      // Then run static site generation
      await build();
      
      const buildTime = Date.now() - startTime;
      
      this.lastBuildTime = new Date().toISOString();
      console.log(`✅ Complete build finished in ${buildTime}ms`);

      // Notify connected browsers to refresh
      this.notifyClients('reload', { 
        message: 'Build completed, refreshing page...', 
        buildTime: buildTime 
      });

      // If more builds were queued during this build, trigger another
      if (this.buildQueue.length > 0) {
        console.log(`🔄 ${this.buildQueue.length} more changes detected, rebuilding...`);
        setImmediate(() => this.triggerBuild('Queued changes'));
      }

    } catch (error) {
      console.error('❌ Build failed:', error);
    } finally {
      this.isBuilding = false;
    }
  }

  async getGeneratedFiles() {
    const files = [];
    
    const scanDirectory = async (dir, basePath = '') => {
      try {
        const items = await fs.readdir(dir);
        
        for (const item of items) {
          const fullPath = path.join(dir, item);
          const relativePath = path.join(basePath, item);
          const stats = await fs.stat(fullPath);
          
          if (stats.isDirectory()) {
            await scanDirectory(fullPath, relativePath);
          } else {
            files.push({
              path: relativePath.replace(/\\/g, '/'), // Normalize path separators
              size: stats.size,
              modified: stats.mtime.toISOString(),
              url: `/${relativePath.replace(/\\/g, '/')}`
            });
          }
        }
      } catch (error) {
        console.warn(`Could not scan directory ${dir}:`, error.message);
      }
    };

    await scanDirectory(this.buildDir);
    return files.sort((a, b) => a.path.localeCompare(b.path));
  }

  async start() {
    // Ensure build directory exists and do initial build
    await fs.ensureDir(this.buildDir);
    
    console.log('🔨 Performing initial build...');
    await this.triggerBuild('Initial build');

    // Start the server
    this.server = this.app.listen(this.port, () => {
      console.log('\n🚀 WhimsyLabs Development Server Started!');
      console.log('==========================================');
      console.log(`📡 Server: http://localhost:${this.port}`);
      console.log(`📁 Serving: ${path.resolve(this.buildDir)}`);
      console.log(`🔄 Auto-rebuild: Enabled`);
      console.log(`🔄 Auto-refresh: Enabled (pages refresh automatically)`);
      console.log('');
      console.log('📋 Available endpoints:');
      console.log(`   http://localhost:${this.port}/                - Homepage (English)`);
      console.log(`   http://localhost:${this.port}/es/             - Homepage (Spanish)`);
      console.log(`   http://localhost:${this.port}/fr/             - Homepage (French)`);
      console.log(`   http://localhost:${this.port}/de/             - Homepage (German)`);
      console.log(`   http://localhost:${this.port}/blog/           - Blog (English)`);
      console.log(`   http://localhost:${this.port}/es/blog/        - Blog (Spanish)`);
      console.log(`   http://localhost:${this.port}/features/       - Features (English)`);
      console.log(`   http://localhost:${this.port}/de/faq/         - FAQ (German)`);
      console.log(`   http://localhost:${this.port}/api/status      - Build status`);
      console.log(`   http://localhost:${this.port}/api/files       - List files`);
      console.log(`   http://localhost:${this.port}/api/rebuild     - Manual rebuild (POST)`);
      console.log(`   http://localhost:${this.port}/api/events      - Auto-refresh events (SSE)`);
      console.log('');
      console.log('👀 Watching for changes in:');
      console.log('   - src/**/*.js');
      console.log('   - src/**/*.css');
      console.log('   - src/data/**/*');
      console.log('   - public/**/*');
      console.log('   - build.js');
      console.log('');
      console.log('💡 Tips:');
      console.log('   - Edit any source file to trigger auto-rebuild');
      console.log('   - Pages will refresh automatically when builds complete');
      console.log('   - Look for the green "🔄 Connected" indicator in top-right corner');
      console.log('   - Check /api/status for build status');
      console.log('   - Use Ctrl+C to stop the server');
      console.log('==========================================\n');
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down development server...');
      this.server.close(() => {
        console.log('✅ Server stopped');
        process.exit(0);
      });
    });
  }
}

// Start the development server if this file is run directly
if (require.main === module) {
  const devServer = new DevServer();
  devServer.start().catch(error => {
    console.error('❌ Failed to start development server:', error);
    process.exit(1);
  });
}

module.exports = DevServer;