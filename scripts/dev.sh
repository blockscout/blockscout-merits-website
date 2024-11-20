#!/bin/bash

while [ $# -gt 0 ]; do
  case "$1" in
    --preset=*)
      preset_name="${1#*=}"
      ;;
    *)
      echo "Invalid argument provided. Exiting..."
      echo "Usage: npm run dev -- --preset=<preset_name>"
      exit 1
  esac
  shift
done

if [ -z "$preset_name" ]; then
    echo "Preset name is not provided. Exiting..."
    echo "Usage: npm run dev -- --preset=<preset_name>"
    exit 1
fi

config_file="./envs/.env.${preset_name}"
secrets_file="./envs/.env.secrets"

if [ ! -f "$config_file" ]; then
    echo "Error: File '$config_file' not found."
    exit 1
fi

npm run svg:build-sprite
echo ""

# generate envs.js file and run the app
dotenv \
  -e $config_file \
  -e $secrets_file \
  -- bash -c './deploy/make_envs_script.sh && next dev' |
pino-pretty
