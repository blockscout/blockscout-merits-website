#!/bin/bash

# Create envs.js file with run-time environment variables for the client app
./make_envs_script.sh

echo "Starting Next.js application"
exec "$@"
