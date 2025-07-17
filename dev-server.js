const express = require('express');
const path = require('path');
const { build } = require('./build.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist directory
app.use(express.static('dist'));

// Fallback for SPA-like behavior (though we're generating static pages)
app.get('*', (req, res) => {
    // Try to serve the specific page first
    const requestedPath = req.path;
    let filePath;
    
    if (requestedPath === '/') {
        filePath = path.join(__dirname, 'dist', 'index.html');
    } else if (requestedPath.endsWith('/')) {
        filePath = path.join(__dirname, 'dist', requestedPath, 'index.html');
    } else {
        filePath = path.join(__dirname, 'dist', requestedPath + '/index.html');
    }
    
    // Check if the file exists
    res.sendFile(filePath, (err) => {
        if (err) {
            // If file doesn't exist, serve 404 or redirect to home
            res.status(404).sendFile(path.join(__dirname, 'dist', '404.html'));
        }
    });
});

async function startServer() {
    try {
        // Build the site first
        console.log('🔨 Building site...');
        await build();
        
        // Start the server
        app.listen(PORT, () => {
            console.log(`🚀 Development server running at http://localhost:${PORT}`);
            console.log('📁 Serving files from ./dist directory');
            console.log('🔄 Rebuild with: npm run build');
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    startServer();
}

module.exports = app;
