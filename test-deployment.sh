#!/bin/bash

echo "🧪 Testing deployment build..."
echo ""

# Check if all required files exist
echo "📁 Checking files..."
files=(
  "src/app/page.tsx"
  "src/app/layout.tsx"
  "src/app/components/SpinningWheel.tsx"
  "src/app/components/CelebrationScreen.tsx"
  "src/app/components/ParticipantList.tsx"
  "src/app/components/EditListModal.tsx"
  "src/app/utils/storage.ts"
  "Dockerfile"
  "e2b.Dockerfile"
)

all_found=true
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file NOT FOUND"
    all_found=false
  fi
done

if [ "$all_found" = false ]; then
  echo ""
  echo "❌ Some files are missing!"
  exit 1
fi

echo ""
echo "📦 Building project..."
bun run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""
echo "📊 Build statistics:"
ls -lh .next/server/app/index.html 2>/dev/null && echo "✅ index.html exists"
ls -lh .next/server/app/page.js 2>/dev/null && echo "✅ page.js exists"

echo ""
echo "🔍 Checking HTML content..."
if grep -q "Рулетка Ведущих" .next/server/app/index.html; then
  echo "✅ Russian title found in HTML"
else
  echo "❌ Russian title NOT found!"
  exit 1
fi

if grep -q "Добавить участников" .next/server/app/index.html; then
  echo "✅ Russian button text found in HTML"
else
  echo "❌ Russian button text NOT found!"
  exit 1
fi

echo ""
echo "🎉 All tests passed! Ready to deploy!"
echo ""
echo "Next steps:"
echo "1. Commit changes: git add . && git commit -m 'Ready for deployment'"
echo "2. Publish through Onlook"
echo "3. Wait for deployment to complete"
echo "4. Test: https://a79174bd-3229-4489-9969-269ce314fce7.onlook.live"
