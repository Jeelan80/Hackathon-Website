# Google Apps Script Setup for Hackathon Registration

## Quick Setup Steps

### Step 1: Open Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. You should see a file called `Code.gs`

### Step 2: Replace the Code
1. Delete all the default code in `Code.gs`
2. Copy the entire content from `google-apps-script.js` in this project
3. Paste it into `Code.gs`
4. Click "Save" (Ctrl+S)
5. Give your project a name like "Hackathon Registration Handler"

### Step 3: Test the Setup
1. In the function dropdown, select `testSetup`
2. Click the "Run" button (▶️)
3. You may need to authorize the script (click "Review permissions" → "Go to [Project Name]" → "Allow")
4. Check the execution log - it should say "Setup OK - Can access spreadsheet: Hackathon Registrations 2025"

### Step 4: Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Click the gear icon ⚙️ next to "Type"
3. Select "Web app"
4. Fill in the settings:
   - **Description**: "Hackathon Registration API v1"
   - **Execute as**: "Me (your-email@gmail.com)"
   - **Who has access**: "Anyone"
5. Click "Deploy"
6. **IMPORTANT**: Copy the Web App URL (it looks like: `https://script.google.com/macros/s/XXXXXXXXX/exec`)

### Step 5: Update Your Environment
1. Open your `.env.local` file
2. Update the `VITE_GOOGLE_APPS_SCRIPT_URL` line:
   ```
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Save the file
4. Restart your development server if it's running

### Step 6: Test the Integration
1. Go to your website: http://localhost:3000
2. Fill out and submit the registration form
3. Check your Google Sheet - new registrations should appear automatically!

## Troubleshooting

### If you see "Authorization required"
- Make sure you ran the `testSetup` function first and granted permissions
- The script needs access to Google Sheets on your behalf

### If submissions aren't appearing
- Check the Apps Script execution log: Go to script.google.com → Your project → "Executions"
- Verify the Web App URL is correctly set in `.env.local`
- Make sure your development server was restarted after updating `.env.local`

### If you get permission errors
- Ensure the spreadsheet is accessible to your Google account
- Try sharing the spreadsheet with yourself if needed
