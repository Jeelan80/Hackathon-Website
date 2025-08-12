# Troubleshooting and Updating Google Apps Script - Version 9

## Overview
This document provides instructions for deploying and troubleshooting the updated Google Apps Script (version 9) that fixes issues with form data processing and payment screenshot uploads.

## The Issue
You encountered the following error in the Google Apps Script logs:
```
Error in doPost: [SyntaxError: Unexpected token 'd', "data=%7B%2"... is not valid JSON]
TypeError: ContentService.createTextOutput(...).setMimeType(...).setHeaders is not a function
```

This error occurs because the script was expecting JSON data but received URL-encoded form data instead. Version 9 fixes this issue by properly handling both data formats.

## Deployment Steps

### 1. Open the Google Apps Script Editor
1. Go to [Google Apps Script](https://script.google.com/) and open your current project
2. Delete all existing code in the editor

### 2. Deploy the New Script
1. Copy the entire content from `google-apps-script-v9.js` file
2. Paste it into the Google Apps Script editor
3. Save the project (Ctrl+S or File > Save)
4. Click "Deploy" > "New deployment"
5. Select "Web app" as the deployment type
6. Configure the deployment:
   - Description: "Registration Form v9 - Fix Form Data Handling"
   - Execute as: "Me" (your Google account)
   - Who has access: "Anyone" or "Anyone, even anonymous"
7. Click "Deploy"
8. Copy the new Web App URL provided

### 3. Update Environment Variable
1. Open `.env.local` in your project
2. Update the following line with your new deployment URL:
   ```
   VITE_GOOGLE_APPS_SCRIPT_URL=YOUR_NEW_WEBAPP_URL
   ```

### 4. Test the Script
1. In the Google Apps Script editor, select the `testUrlEncodedSubmission` function
2. Click the "Run" button
3. Review the execution logs to confirm successful processing
4. Check your Google Sheet for the test entry

## Key Improvements in Version 9

1. **Better Form Data Handling**: Now properly extracts and processes URL-encoded form data
2. **Improved Error Detection**: More comprehensive error logging and better error messages
3. **Robust Base64 Image Processing**: Enhanced payment screenshot handling
4. **Test Functions**: Added test functions specifically for URL-encoded data
5. **Better CORS Handling**: Improved OPTIONS request handling for cross-origin requests

## Client-Side Changes

The front-end code has also been updated to use a more reliable submission method:

1. First attempts a direct JSON fetch request
2. Falls back to form submission if fetch fails
3. Ensures data is properly formatted regardless of submission method

## Troubleshooting

If you encounter issues after deploying the new script:

1. **Check Permissions**:
   - The script needs permission to access your Google Sheets and Google Drive
   - When running for the first time, make sure to grant all requested permissions

2. **View Execution Logs**:
   - In the Google Apps Script editor, go to "Executions" to view logs
   - Look for specific error messages that might indicate what's wrong

3. **Test Form Submission**:
   - Run the `testUrlEncodedSubmission` function to verify form data handling
   - Run the `testImageSaving` function to verify screenshot processing

4. **Verify Spreadsheet Access**:
   - Run the `checkSpreadsheetAccess` function to verify the script can access your Google Sheet

5. **Common Issues**:
   - Missing permissions - run test functions and grant permissions when prompted
   - Incorrect spreadsheet ID - verify the ID in the script matches your sheet
   - Image size too large - ensure uploaded images are reasonably sized

## Next Steps

After successful deployment:

1. Test the form submission with a real payment screenshot
2. Verify the screenshot appears in Google Drive
3. Confirm the screenshot link appears in your Google Sheet
4. Make sure the form works on all devices and browsers
