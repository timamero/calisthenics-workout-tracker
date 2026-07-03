#!/bin/bash

# change-env.sh: Switches environment variables for backend, web, and mobile .env files
# Usage: ./change-env.sh [-l | -i] [-b] [-w] [-m]
#   -l: Set environment to local-isolated
#   -i: Set environment to local-integration
#   -b: Update backend .env (ENVIRONMENT)
#   -w: Update web .env (VITE_ENVIRONMENT)
#   -m: Update mobile .env (EXPO_PUBLIC_ENVIRONMENT)
#   Any combination of -b, -w, -m is allowed (e.g., -wb, -bm, -bwm, etc.)

set -e

# Default values
TARGET_ENV=""
UPDATE_BACKEND=false
UPDATE_WEB=false
UPDATE_MOBILE=false

# Parse options
while getopts ":libwm" opt; do
  case $opt in
    l)
      TARGET_ENV="local-isolated"
      ;;
    i)
      TARGET_ENV="local-integration"
      ;;
    b)
      UPDATE_BACKEND=true
      ;;
    w)
      UPDATE_WEB=true
      ;;
    m)
      UPDATE_MOBILE=true
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

# Check for required environment
if [[ -z "$TARGET_ENV" ]]; then
  echo "Error: You must specify -l (local-isolated) or -i (local-integration)."
  exit 1
fi

# Check for at least one target
if ! $UPDATE_BACKEND && ! $UPDATE_WEB && ! $UPDATE_MOBILE; then
  echo "Error: You must specify at least one of -b (backend), -w (web), or -m (mobile)."
  exit 1
fi

# Helper function to update a variable in a .env file
# $1 = file, $2 = variable name, $3 = value
update_env_var() {
  local file="$1"
  local var="$2"
  local value="$3"
  if [ ! -f "$file" ]; then
    echo "Error: $file not found."
    exit 1
  fi
  # If variable exists, replace its value; otherwise, add it
  if grep -q "^$var=" "$file"; then
    sed -i.bak "s/^$var=.*/$var=$value/" "$file"
  else
    echo "$var=$value" >> "$file"
  fi
}

# Update backend .env
if $UPDATE_BACKEND; then
  update_env_var "./apps/backend/.env" "ENVIRONMENT" "$TARGET_ENV"
  echo "Backend environment set to $TARGET_ENV."
fi

# Update web .env
if $UPDATE_WEB; then
  update_env_var "./apps/frontend/web/.env" "VITE_ENVIRONMENT" "$TARGET_ENV"
  echo "Web environment set to $TARGET_ENV."
fi

# Update mobile .env
if $UPDATE_MOBILE; then
  update_env_var "./apps/frontend/mobile/.env" "EXPO_PUBLIC_ENVIRONMENT" "$TARGET_ENV"
  echo "Mobile environment set to $TARGET_ENV."
fi

exit 0
