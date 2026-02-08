"""
Serve tools for Website DevTools.
Manages the npx serve preview server.
"""
import json
import os
import signal
import socket
import subprocess
import time
from pathlib import Path
from typing import Callable, Optional

from .config import WEBSITE_DIR, BUILD_DIR, SERVE_PORT, SERVE_START_TIMEOUT


class ServeTools:
    """Manages the preview server."""
    
    # File to track server PID
    PID_FILE = WEBSITE_DIR / "devtools" / ".serve.pid"
    
    def __init__(self, log_callback: Optional[Callable] = None):
        self.log_callback = log_callback or (lambda t, m: print(f"[{t}] {m}"))
        self.port = SERVE_PORT
    
    def _is_port_in_use(self, port: int) -> bool:
        """Check if a port is in use."""
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            return s.connect_ex(('localhost', port)) == 0
    
    def _get_saved_pid(self) -> Optional[int]:
        """Get PID from file if exists."""
        try:
            if self.PID_FILE.exists():
                return int(self.PID_FILE.read_text().strip())
        except:
            pass
        return None
    
    def _save_pid(self, pid: int):
        """Save PID to file."""
        self.PID_FILE.parent.mkdir(parents=True, exist_ok=True)
        self.PID_FILE.write_text(str(pid))
    
    def _clear_pid(self):
        """Remove PID file."""
        try:
            self.PID_FILE.unlink()
        except:
            pass
    
    def _is_process_running(self, pid: int) -> bool:
        """Check if a process is running."""
        try:
            # On Windows, this doesn't actually kill - just checks
            os.kill(pid, 0)
            return True
        except (OSError, ProcessLookupError):
            return False
    
    def start(self, port: Optional[int] = None) -> dict:
        """
        Start the preview server.
        
        Args:
            port: Port to serve on (default: 4000)
        """
        port = port or self.port
        
        # Check if already running
        if self._is_port_in_use(port):
            saved_pid = self._get_saved_pid()
            return {
                "success": True,
                "already_running": True,
                "port": port,
                "pid": saved_pid,
                "url": f"http://localhost:{port}"
            }
        
        # Check build directory exists
        if not BUILD_DIR.exists():
            return {
                "success": False,
                "error": "No build directory. Run build.quick or build.static first."
            }
        
        self.log_callback("step", f"Starting server on port {port}...")
        
        try:
            # Start serve in background
            # Using npx serve with specific options
            cmd = ["npx", "serve", "build", "-l", str(port), "--no-clipboard"]
            
            # Start detached process
            if os.name == 'nt':  # Windows
                # CREATE_NEW_PROCESS_GROUP allows it to run independently
                process = subprocess.Popen(
                    cmd,
                    cwd=str(WEBSITE_DIR),
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                    creationflags=subprocess.CREATE_NEW_PROCESS_GROUP | subprocess.DETACHED_PROCESS,
                    shell=True
                )
            else:  # Unix
                process = subprocess.Popen(
                    cmd,
                    cwd=str(WEBSITE_DIR),
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                    start_new_session=True
                )
            
            # Save PID
            self._save_pid(process.pid)
            
            # Wait for server to start
            self.log_callback("step", "Waiting for server to start...")
            for i in range(SERVE_START_TIMEOUT):
                time.sleep(1)
                if self._is_port_in_use(port):
                    self.log_callback("step", f"Server started successfully!")
                    return {
                        "success": True,
                        "port": port,
                        "pid": process.pid,
                        "url": f"http://localhost:{port}"
                    }
            
            # Timeout - server didn't start
            return {
                "success": False,
                "error": f"Server didn't start within {SERVE_START_TIMEOUT}s",
                "pid": process.pid
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def stop(self) -> dict:
        """Stop the preview server."""
        saved_pid = self._get_saved_pid()
        
        # Try to kill by PID
        if saved_pid:
            self.log_callback("step", f"Stopping server (PID: {saved_pid})...")
            try:
                if os.name == 'nt':  # Windows
                    # Use taskkill for Windows
                    subprocess.run(
                        ["taskkill", "/F", "/PID", str(saved_pid), "/T"],
                        capture_output=True
                    )
                else:
                    os.kill(saved_pid, signal.SIGTERM)
                
                self._clear_pid()
                time.sleep(1)
                
                if not self._is_port_in_use(self.port):
                    return {
                        "success": True,
                        "message": f"Server stopped (was PID {saved_pid})"
                    }
            except Exception as e:
                self.log_callback("stderr", f"Error killing PID {saved_pid}: {e}")
        
        # Fallback: kill any process on the port (Windows)
        if os.name == 'nt' and self._is_port_in_use(self.port):
            self.log_callback("step", f"Killing process on port {self.port}...")
            try:
                # Find PID using netstat
                result = subprocess.run(
                    f'netstat -ano | findstr :{self.port}',
                    capture_output=True, text=True, shell=True
                )
                for line in result.stdout.strip().split('\n'):
                    if 'LISTENING' in line:
                        pid = line.strip().split()[-1]
                        subprocess.run(["taskkill", "/F", "/PID", pid], capture_output=True)
                        self._clear_pid()
                        time.sleep(1)
                        break
            except Exception as e:
                self.log_callback("stderr", f"Error finding process: {e}")
        
        self._clear_pid()
        
        if self._is_port_in_use(self.port):
            return {
                "success": False,
                "error": f"Could not stop server on port {self.port}"
            }
        
        return {
            "success": True,
            "message": "Server stopped"
        }
    
    def restart(self) -> dict:
        """Stop and start the server."""
        self.log_callback("step", "Restarting server...")
        
        stop_result = self.stop()
        if not stop_result.get("success") and self._is_port_in_use(self.port):
            return stop_result
        
        time.sleep(1)
        return self.start()
    
    def status(self) -> dict:
        """Get server status."""
        port = self.port
        running = self._is_port_in_use(port)
        saved_pid = self._get_saved_pid()
        
        result = {
            "running": running,
            "port": port,
        }
        
        if running:
            result["url"] = f"http://localhost:{port}"
        
        if saved_pid:
            result["pid"] = saved_pid
            result["pid_alive"] = self._is_process_running(saved_pid)
        
        return result
