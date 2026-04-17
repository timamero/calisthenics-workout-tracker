#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting cleanup of node_modules...${NC}"

# Delete root node_modules
if [ -d "node_modules" ]; then
    echo -e "${RED}Removing ./node_modules${NC}"
    rm -rf node_modules
fi

# Delete node_modules in apps
if [ -d "apps" ]; then
    for app_dir in apps/*/; do
        if [ -d "${app_dir}node_modules" ]; then
            echo -e "${RED}Removing ${app_dir}node_modules${NC}"
            rm -rf "${app_dir}node_modules"
        fi
    done
fi

# Delete node_modules in packages
if [ -d "packages" ]; then
    for pkg_dir in packages/*/; do
        if [ -d "${pkg_dir}node_modules" ]; then
            echo -e "${RED}Removing ${pkg_dir}node_modules${NC}"
            rm -rf "${pkg_dir}node_modules"
        fi
    done
fi

echo -e "${GREEN}Cleanup complete!${NC}"