const express = require('express');
const path = require('path');
const chokidar = require('chokidar');
const { build } = require('./build.js');
const fs = require('fs-extra');

class DevServer {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.buildDir = './build';
    this.isBuilding = false;
    this.buildQueue = [];
    
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

    // Catch-all handler for SPA routes
    this.app.get('*', (req, res, next) => {
      const filePath = this.resolveFilePath(req.path);
      
      if (fs.existsSync(filePath)) {
        res.sendFile(path.resolve(filePath));
      } else {
        // Try to serve index.html for SPA routes
        const indexPath = path.join(this.buildDir, 'index.html');
        if (fs.existsSync(indexPath)) {
          res.sendFile(path.resolve(indexPath));
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
      return path.join(this.buildDir, requestPath, 'index.html');
    }

    // Handle direct file requests
    const directPath = path.join(this.buildDir, requestPath);
    if (fs.existsSync(directPath)) {
      return directPath;
    }

    // Try with index.html
    const indexPath = path.join(this.buildDir, requestPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return indexPath;
    }

    return directPath; // Return original path even if it doesn't exist
  }

  setupFileWatcher() {
    console.log('👀 Setting up file watchers...');

    // Watch source files
    const srcWatcher = chokidar.watch([
      'src/**/*.js',
      'src/**/*.jsx',
      'src/**/*.css',
      'src/**/*.json',
      'src/data/**/*',
      'public/**/*',
      '!public/static/**/*', // Ignore built static files
      'build.js',
      'scripts/**/*.js'
    ], {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/build/**',
        '**/dist/**'
      ],
      persistent: true,
      ignoreInitial: true
    });

    srcWatcher.on('change', (filePath) => {
      console.log(`📝 File changed: ${filePath}`);
      this.triggerBuild(`File changed: ${filePath}`);
    });

    srcWatcher.on('add', (filePath) => {
      console.log(`➕ File added: ${filePath}`);
      this.triggerBuild(`File added: ${filePath}`);
    });

    srcWatcher.on('unlink', (filePath) => {
      console.log(`🗑️ File deleted: ${filePath}`);
      this.triggerBuild(`File deleted: ${filePath}`);
    });

    srcWatcher.on('error', (error) => {
      console.error('❌ File watcher error:', error);
    });

    console.log('✅ File watchers active');
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
      
      const startTime = Date.now();
      await build();
      const buildTime = Date.now() - startTime;
      
      this.lastBuildTime = new Date().toISOString();
      console.log(`✅ Build completed in ${buildTime}ms`);

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
      console.log('');
      console.log('📋 Available endpoints:');
      console.log(`   http://localhost:${this.port}/                - Homepage`);
      console.log(`   http://localhost:${this.port}/blog/           - Blog`);
      console.log(`   http://localhost:${this.port}/features/       - Features`);
      console.log(`   http://localhost:${this.port}/faq/            - FAQ`);
      console.log(`   http://localhost:${this.port}/api/status      - Build status`);
      console.log(`   http://localhost:${this.port}/api/files       - List files`);
      console.log(`   http://localhost:${this.port}/api/rebuild     - Manual rebuild (POST)`);
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