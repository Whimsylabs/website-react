#!/usr/bin/env python3
"""
Website DevTools Broker - MQTT command dispatcher for website builds.

Listens for commands from Whimsycat and dispatches to build/serve/validate tools.
Run this on Windows where npm/node run natively.

Usage:
    cd website-react
    python devtools/website_broker.py
"""
import json
import sys
import threading
import time
import traceback
from datetime import datetime
from pathlib import Path
from uuid import uuid4

# Add parent to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

try:
    import paho.mqtt.client as mqtt
except ImportError:
    print("ERROR: paho-mqtt not installed. Run: pip install paho-mqtt")
    sys.exit(1)

from devtools.config import MQTT_BROKER, MQTT_PORT, MQTT_TOPICS
from devtools.build_tools import BuildTools
from devtools.serve_tools import ServeTools
from devtools.validate_tools import ValidateTools


class WebsiteBroker:
    """Main MQTT command dispatcher for website devtools."""
    
    def __init__(self):
        self.client = None
        self.connected = False
        self.running = False
        self.current_build = None  # Track if build is in progress
        
        # Initialize tool handlers with log callback
        self.build_tools = BuildTools(log_callback=self._publish_log)
        self.serve_tools = ServeTools(log_callback=self._publish_log)
        self.validate_tools = ValidateTools(log_callback=self._publish_log)
        
        # Command routing table
        self.handlers = {
            # System
            "ping": self._handle_ping,
            "status": self._handle_status,
            
            # Build
            "build.static": self.build_tools.build_static,
            "build.spa": self.build_tools.build_spa,
            "build.quick": self.build_tools.build_quick,
            "build.status": self.build_tools.status,
            
            # Server
            "serve.start": self.serve_tools.start,
            "serve.stop": self.serve_tools.stop,
            "serve.restart": self.serve_tools.restart,
            "serve.status": self.serve_tools.status,
            
            # Validation
            "validate.meta": self.validate_tools.meta_descriptions,
            "validate.all": self.validate_tools.all_checks,
            "validate.seo": self.validate_tools.seo_checks,
            "validate.status": self.validate_tools.status,
            
            # Combo operations
            "rebuild": self._handle_rebuild,
        }
    
    def connect(self) -> bool:
        """Connect to MQTT broker."""
        try:
            self.client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
            self.client.on_connect = self._on_connect
            self.client.on_disconnect = self._on_disconnect
            self.client.on_message = self._on_message
            
            print(f"[BROKER] Connecting to MQTT at {MQTT_BROKER}:{MQTT_PORT}...")
            self.client.connect(MQTT_BROKER, MQTT_PORT, keepalive=60)
            return True
        except Exception as e:
            print(f"[BROKER] Connection failed: {e}")
            print(f"[BROKER] Make sure Mosquitto is running on the VM and port 1883 is forwarded.")
            return False
    
    def _on_connect(self, client, userdata, flags, reason_code, properties):
        """Handle connection established."""
        if reason_code == 0:
            self.connected = True
            print(f"[BROKER] ✅ Connected to MQTT broker")
            
            # Subscribe to command topic
            client.subscribe(MQTT_TOPICS["command"])
            print(f"[BROKER] Subscribed to {MQTT_TOPICS['command']}")
            
            # Announce presence
            self._publish_status("online", "Website DevTools broker started")
        else:
            print(f"[BROKER] ❌ Connection failed: {reason_code}")
    
    def _on_disconnect(self, client, userdata, flags, reason_code, properties):
        """Handle disconnection."""
        self.connected = False
        print(f"[BROKER] Disconnected: {reason_code}")
    
    def _on_message(self, client, userdata, msg):
        """Handle incoming command message."""
        try:
            payload = json.loads(msg.payload.decode('utf-8'))
            cmd_id = payload.get("id", str(uuid4()))
            action = payload.get("action", "unknown")
            params = payload.get("params", {})
            
            print(f"[BROKER] 📥 Received: {action} (id={cmd_id[:8]}...)")
            
            # Check if build is already in progress
            if action.startswith("build.") and self.current_build:
                self._publish_response(cmd_id, action, "error",
                    error=f"Build already in progress (started {self.current_build})")
                return
            
            # Dispatch to handler
            handler = self.handlers.get(action)
            if handler:
                # Run in thread to not block MQTT loop
                thread = threading.Thread(
                    target=self._execute_handler,
                    args=(cmd_id, action, handler, params)
                )
                thread.start()
            else:
                self._publish_response(cmd_id, action, "error",
                    error=f"Unknown action: {action}")
                
        except json.JSONDecodeError as e:
            print(f"[BROKER] ❌ Invalid JSON: {e}")
        except Exception as e:
            print(f"[BROKER] ❌ Error handling message: {e}")
            traceback.print_exc()
    
    def _execute_handler(self, cmd_id: str, action: str, handler, params: dict):
        """Execute a command handler and publish response."""
        start_time = time.time()
        
        # Track build in progress
        if action.startswith("build."):
            self.current_build = datetime.now().isoformat()
        
        try:
            # Notify running
            self._publish_response(cmd_id, action, "running")
            
            # Execute handler
            result = handler(**params) if params else handler()
            
            # Calculate duration
            duration_ms = int((time.time() - start_time) * 1000)
            
            # Determine status from result
            status = "success" if result.get("success", True) else "error"
            
            # Publish response
            self._publish_response(
                cmd_id, action, status,
                data=result,
                duration_ms=duration_ms
            )
            
        except Exception as e:
            duration_ms = int((time.time() - start_time) * 1000)
            self._publish_response(
                cmd_id, action, "error",
                error=str(e),
                duration_ms=duration_ms
            )
            traceback.print_exc()
        finally:
            if action.startswith("build."):
                self.current_build = None
    
    def _publish_response(self, cmd_id: str, action: str, status: str,
                          data=None, error=None, duration_ms=None):
        """Publish a response message."""
        response = {
            "id": cmd_id,
            "action": action,
            "status": status,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
        if data is not None:
            response["data"] = data
        if error is not None:
            response["error"] = error
        if duration_ms is not None:
            response["duration_ms"] = duration_ms
        
        self.client.publish(MQTT_TOPICS["response"], json.dumps(response))
        
        status_icon = "✅" if status == "success" else "❌" if status == "error" else "🔄"
        print(f"[BROKER] {status_icon} Response: {action} -> {status}")
    
    def _publish_status(self, state: str, message: str):
        """Publish a status message."""
        status = {
            "state": state,
            "message": message,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
        self.client.publish(MQTT_TOPICS["status"], json.dumps(status))
    
    def _publish_log(self, log_type: str, content: str):
        """Publish a log message (for streaming build output)."""
        log = {
            "type": log_type,
            "content": content,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
        self.client.publish(MQTT_TOPICS["logs"], json.dumps(log))
        
        # Also print locally
        prefix = "📝" if log_type == "stdout" else "⚠️" if log_type == "stderr" else "📌"
        print(f"[LOG] {prefix} {content}")
    
    # Built-in handlers
    
    def _handle_ping(self) -> dict:
        """Health check."""
        return {
            "pong": True,
            "broker": "website-devtools",
            "version": "1.0.0",
            "serve_status": self.serve_tools.status()
        }
    
    def _handle_status(self) -> dict:
        """Get overall status."""
        return {
            "broker": "online",
            "build": self.build_tools.status(),
            "serve": self.serve_tools.status(),
            "current_build": self.current_build
        }
    
    def _handle_rebuild(self, skip_validations: bool = False) -> dict:
        """
        Full rebuild cycle: stop server → build → start server.
        
        Args:
            skip_validations: If True, use build.quick instead of build.static
        """
        steps = []
        
        # Step 1: Stop server
        self._publish_log("step", "Step 1/3: Stopping server...")
        stop_result = self.serve_tools.stop()
        steps.append({"step": "stop", "result": stop_result})
        
        time.sleep(1)
        
        # Step 2: Build
        self._publish_log("step", "Step 2/3: Building...")
        if skip_validations:
            build_result = self.build_tools.build_quick()
        else:
            build_result = self.build_tools.build_static()
        steps.append({"step": "build", "result": build_result})
        
        if not build_result.get("success"):
            return {
                "success": False,
                "error": "Build failed",
                "steps": steps
            }
        
        # Step 3: Start server
        self._publish_log("step", "Step 3/3: Starting server...")
        start_result = self.serve_tools.start()
        steps.append({"step": "start", "result": start_result})
        
        return {
            "success": start_result.get("success", False),
            "steps": steps,
            "url": start_result.get("url")
        }
    
    def run(self):
        """Main run loop."""
        if not self.connect():
            return
        
        self.running = True
        print("")
        print("=" * 60)
        print("[BROKER] 🚀 Website DevTools broker running!")
        print("[BROKER] Waiting for commands from Whimsycat...")
        print("[BROKER] Press Ctrl+C to stop.")
        print("=" * 60)
        print("")
        
        try:
            self.client.loop_forever()
        except KeyboardInterrupt:
            print("\n[BROKER] Shutting down...")
        finally:
            self._publish_status("offline", "Website DevTools broker stopped")
            self.client.disconnect()
            self.running = False


def main():
    broker = WebsiteBroker()
    broker.run()


if __name__ == "__main__":
    main()
