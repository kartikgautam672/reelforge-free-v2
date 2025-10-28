# Auto-deploy script for ReelForge

echo "Setting up GitHub repository..."

# Create repository on GitHub (requires manual step)
echo "Please follow these steps:"
echo "1. Go to https://github.com/new"
echo "2. Repository name: reelforge-free"
echo "3. Make it public"
echo "4. Don't initialize with README (we already have files)"
echo "5. Click 'Create repository'"
echo ""
echo "After creating the repository, run:"
echo "git remote add origin https://github.com/YOUR_USERNAME/reelforge-free.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""
echo "Then deploy to Vercel:"
echo "1. Go to https://vercel.com"
echo "2. Import your GitHub repository"
echo "3. Add environment variable: OPENAI_API_KEY"
echo "4. Deploy!"

pause
