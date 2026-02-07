#!/bin/bash

# Name of the output file
OUTPUT_FILE="cookie-copy-extension.zip"

# Re-create the build directory if needed
echo "📦 Packaging Cookie Copy Extension..."

# Remove old build if exists
if [ -f "$OUTPUT_FILE" ]; then
    rm "$OUTPUT_FILE"
fi

# Create a temporary list of files to include
# We exclude the build script itself, README, and any hidden files/folders
zip -r "$OUTPUT_FILE" . -x "*.git*" "build.sh" "README.md" ".DS_Store" "icons/.DS_Store"

echo "✅ Done! Extension packaged in $OUTPUT_FILE"
