Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   FRESH SUTRA: ENVIRONMENT FIX SCRIPT    " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Stop any running node processes (optional but safer)
Write-Host "`n[1/5] Stopping Node.js processes..." -ForegroundColor Yellow
Stop-Process -Name "node" -ErrorAction SilentlyContinue

# 2. Delete Cache and Dependencies
Write-Host "`n[2/5] Deleting corrupted folders..." -ForegroundColor Yellow

if (Test-Path "node_modules") {
    Write-Host "  - Removing node_modules..."
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
}

if (Test-Path "package-lock.json") {
    Write-Host "  - Removing package-lock.json..."
    Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
}

# 3. Clean NPM Cache
Write-Host "`n[3/5] Cleaning NPM cache..." -ForegroundColor Yellow
npm cache clean --force

# 4. Re-install Dependencies
Write-Host "`n[4/5] Installing fresh dependencies..." -ForegroundColor Yellow
npm install

# 5. Start Dev Server
Write-Host "`n[5/5] Starting server with fresh cache..." -ForegroundColor Green
Write-Host "The app will open shortly. Please HARD REFRESH your browser (Ctrl + Shift + R)." -ForegroundColor Magenta
npm run dev -- --force
