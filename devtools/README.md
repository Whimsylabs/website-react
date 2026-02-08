# Website DevTools - MQTT Bridge

Control website builds and preview server from Whimsycat (running on Linux VM).

## Setup

### Prerequisites

1. **Mosquitto MQTT broker** running on the Linux VM
2. **Port forwarding** from Windows host port 1883 to VM port 1883
3. **Python 3.10+** with paho-mqtt

### Install dependencies

```powershell
pip install paho-mqtt
```

## Usage

### Start the broker (on Windows)

```powershell
cd website-react
python devtools/website_broker.py
```

Keep this running while developing. It will:
- Listen for commands from Whimsycat
- Execute builds, manage server, run validations
- Stream logs back to Whimsycat

### From Whimsycat (Linux VM)

```bash
# Health check
python ~/clawd/tools/website_client.py ping

# Quick build (SPA + static HTML, no validations)
python ~/clawd/tools/website_client.py build.quick

# Full build with all validations
python ~/clawd/tools/website_client.py build.static

# Start preview server (port 4000)
python ~/clawd/tools/website_client.py serve.start

# Stop server, rebuild, restart
python ~/clawd/tools/website_client.py rebuild

# Check meta descriptions
python ~/clawd/tools/website_client.py validate.meta
```

## Architecture

```
Linux VM (Clawdbot)              Windows Host
─────────────────────            ─────────────
                                 
website_client.py ──MQTT──► website_broker.py
                                    │
                                    ├── build_tools.py (npm run build-*)
                                    ├── serve_tools.py (npx serve)
                                    └── validate_tools.py (npm run validate-*)
```

## MQTT Topics

| Topic | Direction | Purpose |
|-------|-----------|---------|
| `whimsycat/website/command` | → | Commands |
| `whimsycat/website/response` | ← | Results |
| `whimsycat/website/logs` | ← | Streaming output |
| `whimsycat/website/status` | ← | Server status |

## Files

- `config.py` - Configuration (ports, paths, topics)
- `website_broker.py` - Main MQTT listener/dispatcher
- `build_tools.py` - npm build commands
- `serve_tools.py` - Preview server management
- `validate_tools.py` - Validation scripts
