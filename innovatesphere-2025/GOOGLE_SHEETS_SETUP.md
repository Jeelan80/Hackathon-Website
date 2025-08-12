# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets API integration to automatically store registration form data.

## Prerequisites

1. Google account
2. Google Cloud Project
3. Google Sheets spreadsheet

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

## Step 2: Create Service Account Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `hackathon-registration-service`
   - Description: `Service account for hackathon registration form`
4. Click "Create and Continue"
5. Skip role assignment for now (click "Continue")
6. Click "Done"

## Step 3: Generate Service Account Key

1. Find your service account in the credentials list
2. Click on the service account email
3. Go to the "Keys" tab
4. Click "Add Key" > "Create New Key"
5. Select "JSON" format
6. Download the JSON file (keep it secure!)

## Step 4: Create Google Sheets Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Hackathon Registrations 2025"
4. Copy the spreadsheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the `SPREADSHEET_ID` part

## Step 5: Share Spreadsheet with Service Account

1. In your Google Sheets spreadsheet, click "Share"
2. Add the service account email (from the JSON file: `client_email`)
3. Give "Editor" permissions
4. Click "Send"

## Step 6: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and fill in the values:
   ```env
   # Google Sheets Configuration
   VITE_GOOGLE_SHEETS_ID=your_actual_spreadsheet_id
   VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   VITE_GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
   VITE_ENABLE_GOOGLE_SHEETS=true
   ```

   **Note:** For the private key, copy the entire `private_key` value from your JSON file, including the `\n` characters.

## Step 7: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Fill out and submit the registration form
3. Check your Google Sheets spreadsheet - you should see a new row with the registration data

## Data Structure

The Google Sheets will have the following columns:

| Column | Description |
|--------|-------------|
| Timestamp | When the form was submitted |
| First Name | Participant's first name |
| Last Name | Participant's last name |
| Email | Participant's email |
| Phone | Participant's phone number |
| Institution | Participant's institution |
| Degree | Participant's degree |
| Graduation Year | Participant's graduation year |
| Team Name | Team name |
| Team Size | Number of team members |
| Member 2 - First Name | Second team member's first name |
| Member 2 - Last Name | Second team member's last name |
| Member 2 - Email | Second team member's email |
| Member 2 - Phone | Second team member's phone |
| Member 2 - Institution | Second team member's institution |
| Member 2 - Degree | Second team member's degree |
| Member 2 - Graduation Year | Second team member's graduation year |
| Member 3 - First Name | Third team member's first name |
| Member 3 - Last Name | Third team member's last name |
| Member 3 - Email | Third team member's email |
| Member 3 - Phone | Third team member's phone |
| Member 3 - Institution | Third team member's institution |
| Member 3 - Degree | Third team member's degree |
| Member 3 - Graduation Year | Third team member's graduation year |
| Agreed to Terms | Whether participant agreed to terms |
| Payment Completed | Whether payment was completed |

## Security Notes

- **Never commit your `.env.local` file to version control**
- Keep your service account JSON file secure
- Consider using Google Cloud Secret Manager for production
- The current implementation is suitable for client-side apps, but consider server-side implementation for production

## Troubleshooting

### Common Issues:

1. **"Access denied" error**: Make sure the service account has access to the spreadsheet
2. **"Spreadsheet not found"**: Double-check the spreadsheet ID
3. **"Invalid credentials"**: Verify the service account email and private key
4. **Headers not appearing**: The service will automatically create headers on first run

### Logs:

Check the browser console for detailed error messages. The service logs successful submissions and any errors that occur.

## Production Considerations

For production deployment:

1. Use server-side API instead of client-side Google Sheets API
2. Implement proper error handling and retry logic
3. Add data validation and sanitization
4. Consider using Google Cloud Secret Manager
5. Implement rate limiting
6. Add backup storage options
