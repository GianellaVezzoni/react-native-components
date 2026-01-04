#!/bin/bash
# Wrapper script to fix kconv issue with Ruby 3.4

# Load kconv patch before running pod install
export RUBYOPT="-r$(pwd)/../kconv_patch"

# Set UTF-8 encoding
export LANG=en_US.UTF-8

# Run pod install
cd "$(dirname "$0")"
bundle exec pod install

