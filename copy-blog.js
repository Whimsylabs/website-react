const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "public", "blog.html");
const dest = path.join(__dirname, "build", "blog.html");

// Ensure the build directory exists
if (!fs.existsSync(path.join(__dirname, "build"))) {
  fs.mkdirSync(path.join(__dirname, "build"), { recursive: true });
}

// Copy the file
fs.copyFileSync(src, dest);
console.log("✅ blog.html copied to build directory!");
