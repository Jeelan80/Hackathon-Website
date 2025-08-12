# Payment Screenshot Feature Instructions

## 1. Update Google Apps Script

To enable the payment screenshot feature, you need to update the Google Apps Script with the latest version that supports image uploads.

1. Open your Google Apps Script project
2. Replace your existing code with the content of `google-apps-script-v8.js` file
3. Save and deploy the updated script as a new version

## 2. How the Payment Screenshot Feature Works

The new payment screenshot upload feature:

1. Allows users to upload a screenshot of their payment confirmation
2. Saves the screenshot to Google Drive in a folder named "HACKFINITY Payment Screenshots"
3. Creates a link to the image that's stored in the Google Sheet
4. Makes the image viewable by anyone with the link

## 3. Viewing Uploaded Screenshots

To view the uploaded screenshots:

1. Open your Google Sheet where registrations are stored
2. Look for the "Payment Screenshot" column (second-to-last column)
3. Click on any link in that column to view the uploaded screenshot
4. The last column "Payment Filename" shows the original filename that was uploaded

## 4. Troubleshooting

If screenshots aren't appearing in the sheet:

1. Make sure you've deployed the latest version of the Apps Script
2. Check that your Google Apps Script has permission to:
   - Access and modify your spreadsheets
   - Create files in Google Drive
   - Access files in Google Drive
3. Look at the execution logs in the Google Apps Script dashboard for any errors

## 5. Updating the Registration Form

The registration form has been updated to include an extra step for uploading the payment screenshot. Users will now:

1. Fill in personal details
2. Add academic information
3. Provide team information
4. Make the payment
5. Upload a screenshot of their payment

This ensures all registrations are properly documented and verified.
