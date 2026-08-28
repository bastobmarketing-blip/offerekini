#!/bin/bash
# =============================================================================
# Offerekini — VPS Deploy Script
# Run this on your Contabo VPS after first-time setup
# =============================================================================

set -e

APP_DIR="/var/www/offerekini"
REPO="https://github.com/bastobmarketing-blip/offerekini.git"

echo "🚀 Deploying Offerekini..."

# ---- Pull latest code ----
if [ -d "$APP_DIR/.git" ]; then
  echo "📥 Pulling latest code..."
  cd $APP_DIR
  git pull origin main
else
  echo "📦 Cloning repo..."
  git clone $REPO $APP_DIR
  cd $APP_DIR
fi

# ---- Install dependencies ----
echo "📦 Installing dependencies..."
npm install --production=false

# ---- Restart app with PM2 ----
echo "🔄 Restarting app..."
pm2 startOrRestart ecosystem.config.cjs --env production
pm2 save

echo "✅ Deploy complete! App running on port 3000"
