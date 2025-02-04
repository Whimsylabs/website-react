const fs = require("fs");
const path = require("path");

const srcHtml = path.join(__dirname, "public", "blog.html");
const destHtml = path.join(__dirname, "build", "blog.html");
const manifest = require("./build/asset-manifest.json");

// Get the hashed main.js path
const mainJs = manifest["files"]["main.js"];

// Read blog.html
let html = fs.readFileSync(srcHtml, "utf8");

// Replace the placeholder script tag with the correct path
html = html.replace("/static/js/main.js", mainJs);

// Write updated blog.html to build folder
fs.writeFileSync(destHtml, html, "utf8");
// Print the nameof the updated file
console.log("✅ blog.html updated with correct main.js path! file name: ", mainJs);
