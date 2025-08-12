# Google Apps Script Setup - Updated for Payment Screenshots

## Overview

This document explains how to set up the Google Apps Script to handle form submissions from the hackathon registration form, including the new payment screenshot feature.

## Steps to Set Up

1. Go to [Google Apps Script](https://script.google.com/) and create a new project
2. Copy the entire content from `google-apps-script-v8.js` in this project
3. Paste it into the Google Apps Script editor, replacing any existing code
4. Save the project with a meaningful name like "Hackathon Registration Processor"

## Deploy as Web App

1. Click on "Deploy" > "New deployment"
2. Select "Web app" as the deployment type
3. Set the following options:
   - Description: "Hackathon Registration Processor"
   - Execute as: "Me" (your Google account)
   - Who has access: "Anyone" or "Anyone, even anonymous" 
4. Click "Deploy"
5. Copy the Web App URL that is provided

## Set Up Environment Variables

1. Create a `.env.local` file in the root of this project if it doesn't exist
2. Add the following line, replacing `YOUR_WEBAPP_URL` with the URL from the previous step:
   ```
   VITE_GOOGLE_APPS_SCRIPT_URL=YOUR_WEBAPP_URL
   ```

## Testing the Integration

1. In Google Apps Script, go to the editor
2. Click on the "testSubmission" function in the editor
3. Click "Run" to test the function
4. Check the execution logs to ensure everything works correctly
5. Check your Google Sheet to see if the test data appears

## Permissions Required

The script needs several permissions to function properly:
- Spreadsheet access (to write registration data)
- Drive access (to save payment screenshots)
- URL Fetch (to handle API requests)

You'll be prompted to grant these permissions when you first run the script.

## How It Works

1. When a user submits the registration form, the data is sent to the Google Apps Script
2. The script processes the form data, including any payment screenshot
3. If a screenshot is included, it's saved to Google Drive and a shareable link is created
4. The registration data and screenshot link are added to the Google Sheet
5. A confirmation message is returned to the user

## Troubleshooting

If you're having issues:
1. Check the execution logs in Google Apps Script
2. Ensure permissions are granted properly
3. Verify the Web App URL is correct in your `.env.local` file
4. Try running the test functions in the script editor
