#!/bin/bash
set -e

echo "🚀 Starting Meeting Host Roulette..."
echo ""

# Check if build exists
if [ ! -d ".next" ]; then
  echo "📦 Building application..."
  bun run build
  echo "✅ Build complete!"
else
  echo "✅ Build already exists"
fi

echo ""
echo "🌐 Starting production server on port 3000..."
echo ""

# Start the server
exec bun run start
