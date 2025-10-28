Write-Host "ReelForge Auto-Deploy Script" -ForegroundColor Cyan
Write-Host ""

$authStatus = gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Not authenticated with GitHub CLI" -ForegroundColor Red
    Write-Host "Please run: gh auth login" -ForegroundColor Yellow
    exit 1
}

Write-Host "GitHub CLI authenticated" -ForegroundColor Green
Write-Host "Creating GitHub repository..." -ForegroundColor Cyan

gh repo create reelforge-free --public --description "AI-Powered Reel Script Generator" --source=. --remote=origin --push

if ($LASTEXITCODE -eq 0) {
    Write-Host "Repository created and code pushed!" -ForegroundColor Green
    Write-Host "Next steps for Vercel deployment:" -ForegroundColor Cyan
    Write-Host "1. Go to https://vercel.com" -ForegroundColor White
    Write-Host "2. Click Import Project" -ForegroundColor White
    Write-Host "3. Select your reelforge-free repository" -ForegroundColor White
    Write-Host "4. Add environment variable: OPENAI_API_KEY" -ForegroundColor White
    Write-Host "5. Click Deploy" -ForegroundColor White
    Write-Host "Your app will be live at: https://reelforge-free.vercel.app" -ForegroundColor Green
} else {
    Write-Host "Failed to create repository" -ForegroundColor Red
    Write-Host "Please create manually at https://github.com/new" -ForegroundColor Yellow
}

Write-Host "Press Enter to continue..."
Read-Host
