#!/bin/sh

# Get NPM_PREFIX_DIR
. ./set-project-directory.sh
npm start --prefix "$NPM_PREFIX_DIR"
