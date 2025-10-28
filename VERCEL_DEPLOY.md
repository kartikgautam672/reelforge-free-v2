# Deploy ReelForge to Vercel

## Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Connect your GitHub repository
   - Vercel will auto-detect Vite settings

3. **Add Environment Variable**
   - In Vercel project settings → Environment Variables
   - Add: `OPENAI_API_KEY` with your API key value
   - Deploy

4. **That's it!** Your app will be live with the API route working.

## API Route Configuration
The `/api/generate` endpoint is configured in `api/generate.js` and will automatically work as a serverless function on Vercel.

