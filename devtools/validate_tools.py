"""
Validation tools for Website DevTools.
Runs npm validation scripts and parses output.
"""
import re
import subprocess
from typing import Callable, Optional

from .config import WEBSITE_DIR


class ValidateTools:
    """Runs validation scripts and parses results."""
    
    def __init__(self, log_callback: Optional[Callable] = None):
        self.log_callback = log_callback or (lambda t, m: print(f"[{t}] {m}"))
        self.website_dir = WEBSITE_DIR
    
    def _run_validation(self, script: str, timeout: int = 60) -> dict:
        """
        Run a validation script and capture output.
        
        Args:
            script: npm script name (e.g., "validate-meta-descriptions")
            timeout: Max seconds
        """
        cmd = f"npm run {script}"
        
        self.log_callback("step", f"Running: {script}")
        
        try:
            result = subprocess.run(
                cmd,
                cwd=str(self.website_dir),
                capture_output=True,
                text=True,
                encoding='utf-8',
                errors='replace',
                timeout=timeout,
                shell=True
            )
            
            output = result.stdout + result.stderr
            
            # Stream output to logs
            for line in output.split('\n'):
                if line.strip():
                    if any(x in line.lower() for x in ['error', 'failed', '❌']):
                        self.log_callback("stderr", line)
                    else:
                        self.log_callback("stdout", line)
            
            return {
                "success": result.returncode == 0,
                "return_code": result.returncode,
                "output": output
            }
            
        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "error": f"Validation timed out after {timeout}s"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def meta_descriptions(self) -> dict:
        """
        Run meta description validation.
        Parses output to extract error details.
        """
        result = self._run_validation("validate-meta-descriptions")
        
        if not result.get("output"):
            return result
        
        output = result["output"]
        
        # Parse summary line
        # Example: "✅ Passed: 170" or "❌ Failed: 3"
        parsed = {
            "passed": 0,
            "failed": 0,
            "warnings": 0,
            "failures": []
        }
        
        # Extract counts
        passed_match = re.search(r'Passed:\s*(\d+)', output)
        failed_match = re.search(r'Failed:\s*(\d+)', output)
        warnings_match = re.search(r'warnings:\s*(\d+)', output, re.IGNORECASE)
        
        if passed_match:
            parsed["passed"] = int(passed_match.group(1))
        if failed_match:
            parsed["failed"] = int(failed_match.group(1))
        if warnings_match:
            parsed["warnings"] = int(warnings_match.group(1))
        
        # Extract failure details
        # Pattern: /path/to/page/ (123 chars):
        #            - Description too short
        failure_pattern = r'(/[^\s]+/)\s*\((\d+)\s*chars\):\s*\n\s*-\s*([^\n]+)'
        for match in re.finditer(failure_pattern, output):
            parsed["failures"].append({
                "url": match.group(1),
                "chars": int(match.group(2)),
                "issue": match.group(3).strip()
            })
        
        result["parsed"] = parsed
        result["summary"] = f"Passed: {parsed['passed']}, Failed: {parsed['failed']}, Warnings: {parsed['warnings']}"
        
        return result
    
    def all_checks(self) -> dict:
        """
        Run all validation scripts.
        Returns summary of all validations.
        """
        validations = [
            "validate-sitemap",
            "validate-internal-links",
            "validate-meta-tags",
            "validate-title-length",
            "validate-meta-descriptions",
            "validate-hreflang",
            "validate-opengraph",
            "validate-blog-seo",
            "validate-seo-uniqueness",
        ]
        
        results = {}
        failed = []
        
        for script in validations:
            self.log_callback("step", f"Running {script}...")
            result = self._run_validation(script, timeout=60)
            results[script] = result.get("success", False)
            
            if not result.get("success"):
                failed.append(script)
        
        return {
            "success": len(failed) == 0,
            "total": len(validations),
            "passed": len(validations) - len(failed),
            "failed": failed,
            "results": results
        }
    
    def seo_checks(self) -> dict:
        """
        Run SEO-specific validations.
        """
        validations = [
            "validate-meta-descriptions",
            "validate-blog-seo",
            "validate-seo-uniqueness",
            "validate-keyword-targeting",
        ]
        
        results = {}
        failed = []
        
        for script in validations:
            self.log_callback("step", f"Running {script}...")
            result = self._run_validation(script, timeout=60)
            results[script] = {
                "success": result.get("success", False),
                "output_summary": result.get("output", "")[-500:]  # Last 500 chars
            }
            
            if not result.get("success"):
                failed.append(script)
        
        return {
            "success": len(failed) == 0,
            "total": len(validations),
            "passed": len(validations) - len(failed),
            "failed": failed,
            "results": results
        }
    
    def status(self) -> dict:
        """Get validation status (just confirms scripts exist)."""
        return {
            "available_scripts": [
                "validate-meta-descriptions",
                "validate-sitemap",
                "validate-internal-links",
                "validate-blog-seo",
                "validate-seo-uniqueness",
            ],
            "ready": True
        }
