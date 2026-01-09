#!/bin/bash

echo "======================================"
echo "🆘 Disaster Relief Platform – Setup"
echo "======================================"

# Check Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed."
    echo "➡️  Please install Node.js (v18+) first."
    exit 1
fi

echo "✅ Node.js detected: $(node -v)"

# Backend setup
echo ""
echo "📦 Setting up backend..."
cd backend || exit

if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "⚠️  .env file created from .env.example"
        echo "➡️  Please update environment variables before running."
    else
        echo "❌ .env.example not found!"
    fi
fi

npm install

echo "✅ Backend dependencies installed."

# Frontend check
cd ../frontend || exit
echo ""
echo "🎨 Frontend ready (static files)."

# Final message
echo ""
echo "======================================"
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env"
echo "2. Start backend:"
echo "   cd backend && npm start"
echo ""
echo "Frontend:"
echo "Open frontend/index.html in browser"
echo "======================================"
