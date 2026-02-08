"""
Configuration for Website DevTools MQTT bridge.
"""
from pathlib import Path

# MQTT Settings
# From Windows perspective: connect to VM's Mosquitto via port forwarding
MQTT_BROKER = "localhost"  
MQTT_PORT = 1883

# Topics (separate namespace from backend devtools)
MQTT_TOPICS = {
    "command": "whimsycat/website/command",
    "response": "whimsycat/website/response",
    "logs": "whimsycat/website/logs",
    "status": "whimsycat/website/status",
}

# Paths
WEBSITE_DIR = Path(__file__).parent.parent  # website-react root
BUILD_DIR = WEBSITE_DIR / "build"

# Server settings
SERVE_PORT = 4000  # Avoid 3000 conflicts

# Timeouts (seconds)
BUILD_TIMEOUT = 300  # 5 minutes for full build
SERVE_START_TIMEOUT = 10
