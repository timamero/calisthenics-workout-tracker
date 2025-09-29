#!/bin/bash

# This script switches bewtween local environment (mobile only development) and development environment (mobile and backend development)

# Define the target file
ENV_FILE=".env"

# Check if the .env file exists
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: The file $ENV_FILE was not found in the current directory."
    exit 1
fi

# Use getopts for command-line options
while getopts ":ld" opt; do
    case $opt in
        l)
            # --- Local Environment (-l) ---
            
            # 1. Comment out development line: Add "# " (hash followed by a space)
            sed -i.bak '/^EXPO_PUBLIC_ENVIRONMENT=development$/s/^/# /' "$ENV_FILE"

            # 2. Uncomment local line: Remove either "#" or "# " from the start of the line
            # This uses a slightly broader match to handle both previous states: #... and # ...
            sed -i.bak '/^#[[:space:]]*EXPO_PUBLIC_ENVIRONMENT=local$/s/^#[[:space:]]*//' "$ENV_FILE"

            # Display confirmation
            echo "Switched to local environment"
            exit 0
            ;;
        d)
            # --- Development Environment (-d) ---
            
            # 1. Comment out local line: Add "# " (hash followed by a space)
            sed -i.bak '/^EXPO_PUBLIC_ENVIRONMENT=local$/s/^/# /' "$ENV_FILE"

            # 2. Uncomment development line: Remove either "#" or "# " from the start of the line
            # This uses a slightly broader match to handle both previous states: #... and # ...
            sed -i.bak '/^#[[:space:]]*EXPO_PUBLIC_ENVIRONMENT=development$/s/^#[[:space:]]*//' "$ENV_FILE"

            # Display confirmation
            echo "Switched to development environment"
            exit 0
            ;;
        \?)
            # Handle invalid options
            echo "Invalid option: -$OPTARG" >&2
            exit 1
            ;;
        :)
            # Handle missing arguments (though not applicable for these flags)
            echo "Option -$OPTARG requires an argument." >&2
            exit 1
            ;;
    esac
done

# If no options are provided, display usage
if [ $OPTIND -eq 1 ]; then
    echo "Usage: $0 [-l | -d]"
    echo "  -l: Switch to local environment"
    echo "  -d: Switch to development environment"
    exit 1
fi
