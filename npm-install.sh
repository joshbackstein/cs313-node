#!/bin/sh

# Get NPM_PREFIX_DIR
. ./set-project-directory.sh
npm install --prefix "$NPM_PREFIX_DIR"
