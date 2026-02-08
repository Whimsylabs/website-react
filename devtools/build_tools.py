"""
Build tools for Website DevTools.
Handles npm build commands with streaming output.
"""
import json
import re
import subprocess
import sys
import time
from pathlib import Path
from typing import Callable, Optional

from .config import WEBSITE_DIR, BUILD_TIMEOUT


class BuildTools:
    """Handles website build operations."""
    
    def __init__(self, log_callback: Optional[Callable] = None):
        """
        Args:
            log_callback: Function to call with log lines (for MQTT streaming)
        """
        self.log_callback = log_callback or print
        self.website_dir = WEBSITE_DIR
    
    def _run_npm(self, script: str, timeout: int = BUILD_TIMEOUT) -> dict:
        """
        Run an npm script with streaming output.
        
        Args:
            script: npm script name (e.g., "build-static")
            timeout: Max seconds to wait
            
        Returns:
            dict with success, output, errors, duration_ms
        """
        cmd = ["npm", "run", script]
        
        self.log_callback("stdout", f"Running: {' '.join(cmd)}")
        self.log_callback("stdout", f"Working dir: {self.website_dir}")
        
        start_time = time.time()
        output_lines = []
        error_lines = []
        
        try:
            # On Windows with shell=True, pass command as string
            cmd_str = " ".join(cmd)
            process = subprocess.Popen(
                cmd_str,
                cwd=str(self.website_dir),
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                encoding='utf-8',
                errors='replace',  # Replace undecodable chars instead of crashing
                bufsize=1,
                shell=True  # Needed on Windows for npm
            )
            
            # Stream output
            for line in iter(process.stdout.readline, ''):
                line = line.rstrip()
                if line:
                    output_lines.append(line)
                    # Determine if error or regular output
                    if any(x in line.lower() for x in ['error', 'failed', '❌']):
                        self.log_callback("stderr", line)
                        error_lines.append(line)
                    else:
                        self.log_callback("stdout", line)
            
            process.wait(timeout=timeout)
            duration_ms = int((time.time() - start_time) * 1000)
            
            return {
                "success": process.returncode == 0,
                "return_code": process.returncode,
                "output": "\n".join(output_lines[-50:]),  # Last 50 lines
                "errors": error_lines,
                "duration_ms": duration_ms
            }
            
        except subprocess.TimeoutExpired:
            process.kill()
            return {
                "success": False,
                "error": f"Build timed out after {timeout}s",
                "duration_ms": timeout * 1000
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "duration_ms": int((time.time() - start_time) * 1000)
            }
    
    def build_static(self) -> dict:
        """
        Full build with all validations.
        Runs: npm run build-static
        """
        self.log_callback("step", "Starting full static build (this takes 2-3 minutes)...")
        result = self._run_npm("build-static", timeout=BUILD_TIMEOUT)
        
        # Parse validation results if present
        if result.get("success"):
            result["summary"] = "Full build completed successfully"
        
        return result
    
    def build_spa(self) -> dict:
        """
        React build only (faster).
        Runs: npm run build-spa
        """
        self.log_callback("step", "Starting SPA build (React only)...")
        return self._run_npm("build-spa", timeout=180)
    
    def build_quick(self) -> dict:
        """
        Quick build: SPA + static generation, no validations.
        Faster iteration for testing changes.
        """
        self.log_callback("step", "Starting quick build (SPA + SSR, no validations)...")
        
        # Step 1: Build SPA
        self.log_callback("step", "Step 1/2: Building React SPA...")
        spa_result = self._run_npm("build-spa", timeout=180)
        
        if not spa_result.get("success"):
            return spa_result
        
        # Step 2: Run build.js for static HTML generation
        self.log_callback("step", "Step 2/2: Generating static HTML...")
        
        start_time = time.time()
        try:
            process = subprocess.Popen(
                "node build.js",
                cwd=str(self.website_dir),
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                encoding='utf-8',
                errors='replace',
                bufsize=1,
                shell=True
            )
            
            output_lines = []
            for line in iter(process.stdout.readline, ''):
                line = line.rstrip()
                if line:
                    output_lines.append(line)
                    self.log_callback("stdout", line)
            
            process.wait(timeout=120)
            
            total_duration = spa_result["duration_ms"] + int((time.time() - start_time) * 1000)
            
            return {
                "success": process.returncode == 0,
                "spa_duration_ms": spa_result["duration_ms"],
                "total_duration_ms": total_duration,
                "output": "\n".join(output_lines[-30:]),
                "summary": "Quick build completed (SPA + static HTML)"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "spa_duration_ms": spa_result["duration_ms"]
            }
    
    def status(self) -> dict:
        """Check build directory status."""
        build_dir = self.website_dir / "build"
        
        if not build_dir.exists():
            return {"exists": False, "message": "No build directory"}
        
        # Count HTML files
        html_files = list(build_dir.rglob("*.html"))
        
        # Get last modified time
        try:
            mtime = build_dir.stat().st_mtime
            from datetime import datetime
            last_build = datetime.fromtimestamp(mtime).isoformat()
        except:
            last_build = "unknown"
        
        return {
            "exists": True,
            "html_pages": len(html_files),
            "last_build": last_build,
            "path": str(build_dir)
        }
