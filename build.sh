#!/bin/bash

# Name of the output file
OUTPUT_FILE="cookie-copy-extension.zip"

# Re-create the build directory if needed
echo "📦 Packaging Cookie Copy Extension..."

# Remove old build if exists
if [ -f "$OUTPUT_FILE" ]; then
    rm "$OUTPUT_FILE"
fi

# Package the contents of the src directory
cd src
zip -r "../$OUTPUT_FILE" .
cd ..

echo "✅ Done! Extension packaged in $OUTPUT_FILE"
