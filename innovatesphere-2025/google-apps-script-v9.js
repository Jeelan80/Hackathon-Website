// Google Apps Script for Hackathon Registration - V9
// Fixed to handle URL-encoded form data properly

function doPost(e) {
  console.log('doPost called with:', e);
  
  try {
    let data;
    
    // Log all possible data sources
    console.log('e.postData:', e.postData);
    console.log('e.parameter:', e.parameter);
    console.log('e.parameters:', e.parameters);
    
    // Handle data from different sources with better error handling
    if (e.parameter && e.parameter.data) {
      console.log('Found data in e.parameter.data');
      try {
        data = JSON.parse(e.parameter.data);
        console.log('Successfully parsed e.parameter.data');
      } catch (parseError) {
        console.error('Error parsing e.parameter.data:', parseError);
        // Try to decode URL-encoded data
        try {
          const decodedData = decodeURIComponent(e.parameter.data);
          data = JSON.parse(decodedData);
          console.log('Successfully parsed decoded e.parameter.data');
        } catch (decodeError) {
          console.error('Error decoding e.parameter.data:', decodeError);
          throw new Error('Failed to parse form data: ' + decodeError);
        }
      }
    } else if (e.postData && e.postData.contents) {
      console.log('Using postData.contents');
      console.log('Raw contents (first 100 chars):', e.postData.contents.substring(0, 100) + '...');
      
      try {
        // Try to parse directly as JSON
        data = JSON.parse(e.postData.contents);
        console.log('Successfully parsed postData.contents as JSON');
      } catch (jsonError) {
        console.error('Error parsing postData.contents as JSON:', jsonError);
        
        // Check if it's URL-encoded form data
        if (e.postData.contents.indexOf('=') > -1) {
          console.log('Content appears to be URL-encoded form data');
          
          try {
            // Extract data parameter from the URL-encoded form data
            const formData = e.postData.contents;
            const dataParamMatch = formData.match(/data=([^&]+)/);
            
            if (dataParamMatch && dataParamMatch[1]) {
              const encodedData = dataParamMatch[1];
              console.log('Found data parameter in URL-encoded form');
              
              const decodedData = decodeURIComponent(encodedData);
              console.log('Decoded data (first 100 chars):', decodedData.substring(0, 100) + '...');
              
              data = JSON.parse(decodedData);
              console.log('Successfully parsed URL-encoded data parameter');
            } else {
              throw new Error('No data parameter found in form data');
            }
          } catch (formError) {
            console.error('Error processing URL-encoded form data:', formError);
            throw new Error('Failed to extract data from form submission: ' + formError);
          }
        } else {
          throw new Error('Content is not valid JSON or URL-encoded form data');
        }
      }
    } else {
      console.error('No recognized data format found');
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'No data received'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    console.log('Parsed data:', data ? 'Data found' : 'No data parsed');
    console.log('Data type:', typeof data);
    console.log('Data keys:', data ? Object.keys(data) : 'N/A');

    // Validate required data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format');
    }
    
    // Check if we have a payment screenshot to process
    let screenshotUrl = '';
    if (data.paymentScreenshotBase64) {
      console.log('Payment screenshot found, processing...');
      screenshotUrl = savePaymentScreenshot(data);
      console.log('Payment screenshot saved:', screenshotUrl);
    }

    // Define spreadsheet constants
    const SPREADSHEET_ID = '1sytwgPgO7G_L0hJGNekLfkPFHQEHiGPl1Cu8LcMNn9U';
    const SHEET_NAME = 'Registrations';

    // Define headers for the spreadsheet
    const HEADERS = [
      'Timestamp',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Institution',
      'Degree',
      'Graduation Year',
      'Team Name',
      'Team Size',
      'Member 2 - First Name',
      'Member 2 - Last Name',
      'Member 2 - Email',
      'Member 2 - Phone',
      'Member 2 - Institution',
      'Member 2 - Degree',
      'Member 2 - Graduation Year',
      'Member 3 - First Name',
      'Member 3 - Last Name',
      'Member 3 - Email',
      'Member 3 - Phone',
      'Member 3 - Institution',
      'Member 3 - Degree',
      'Member 3 - Graduation Year',
      'Agreed to Terms',
      'Payment Completed',
      'Payment Screenshot',
      'Payment Filename'
    ];
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Add headers
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285F4');
      headerRange.setFontColor('#FFFFFF');
    }
    
    // Check if headers exist, if not add them
    const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
    if (firstRow[0] !== 'Timestamp') {
      sheet.insertRowBefore(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285F4');
      headerRange.setFontColor('#FFFFFF');
    }
    
    // Prepare the row data
    const rowData = [
      data.submissionTime || new Date().toISOString(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.institution || '',
      data.degree || '',
      data.graduationYear || '',
      data.teamName || '',
      data.teamSize || '',
      data.teamMember2FirstName || '',
      data.teamMember2LastName || '',
      data.teamMember2Email || '',
      data.teamMember2Phone || '',
      data.teamMember2Institution || '',
      data.teamMember2Degree || '',
      data.teamMember2GraduationYear || '',
      data.teamMember3FirstName || '',
      data.teamMember3LastName || '',
      data.teamMember3Email || '',
      data.teamMember3Phone || '',
      data.teamMember3Institution || '',
      data.teamMember3Degree || '',
      data.teamMember3GraduationYear || '',
      data.agreeToTerms ? 'Yes' : 'No',
      data.paymentCompleted ? 'Yes' : 'No',
      screenshotUrl, // Add the screenshot URL to the sheet
      data.paymentScreenshot || '' // Also store the filename
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better visibility
    sheet.autoResizeColumns(1, rowData.length);
    
    console.log('Data added successfully');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Registration submitted successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: ' + error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Save the payment screenshot to Google Drive and return the URL
 */
function savePaymentScreenshot(data) {
  try {
    // Get or create folder for payment screenshots
    const folderName = 'HACKFINITY Payment Screenshots';
    let folder;
    const folderIterator = DriveApp.getFoldersByName(folderName);
    
    if (folderIterator.hasNext()) {
      folder = folderIterator.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    
    // Process the base64 data
    if (!data.paymentScreenshotBase64) {
      return '';
    }
    
    // Extract the base64 data (remove data:image/jpeg;base64, prefix if present)
    let base64Data = data.paymentScreenshotBase64;
    if (base64Data.indexOf('base64,') !== -1) {
      base64Data = base64Data.split('base64,')[1];
    }
    
    // Decode the base64 data
    const decodedData = Utilities.base64Decode(base64Data);
    
    // Create a filename for the screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `Payment_${data.firstName}_${data.lastName}_${timestamp}.jpg`;
    
    // Create a blob from the decoded data
    const blob = Utilities.newBlob(decodedData, 'image/jpeg', filename);
    
    // Save the file to Drive
    const file = folder.createFile(blob);
    
    // Make it accessible via link
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // Return the URL to the file
    return file.getUrl();
  } catch (error) {
    console.error('Error saving payment screenshot:', error);
    return 'Error saving screenshot: ' + error.toString();
  }
}

// Handle OPTIONS requests for CORS preflight
function doOptions(e) {
  console.log('Handling OPTIONS request');
  
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
  
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'online',
      message: 'Google Apps Script is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to manually test data submission
function testSubmission() {
  const testData = {
    submissionTime: new Date().toISOString(),
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '1234567890',
    institution: 'Test University',
    degree: 'Computer Science',
    graduationYear: '2025',
    teamName: 'Test Team',
    teamSize: '2',
    teamMember2FirstName: 'Jane',
    teamMember2LastName: 'Doe',
    teamMember2Email: 'jane@example.com',
    teamMember2Phone: '0987654321',
    teamMember2Institution: 'Test University',
    teamMember2Degree: 'Computer Science',
    teamMember2GraduationYear: '2025',
    teamMember3FirstName: '',
    teamMember3LastName: '',
    teamMember3Email: '',
    teamMember3Phone: '',
    teamMember3Institution: '',
    teamMember3Degree: '',
    teamMember3GraduationYear: '',
    agreeToTerms: true,
    paymentCompleted: true,
    paymentScreenshot: 'test_screenshot.jpg',
    paymentScreenshotBase64: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD'
  };

  // Create a mock event object
  const mockEvent = {
    parameter: {
      data: JSON.stringify(testData)
    }
  };

  console.log('Testing submission with mock data');
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
  return result;
}

// Function to test form submission with URL-encoded data
function testUrlEncodedSubmission() {
  const testData = {
    submissionTime: new Date().toISOString(),
    firstName: 'Test',
    lastName: 'URL',
    email: 'test-url@example.com'
  };
  
  const jsonString = JSON.stringify(testData);
  const encodedData = 'data=' + encodeURIComponent(jsonString);
  
  const mockEvent = {
    postData: {
      contents: encodedData,
      type: 'application/x-www-form-urlencoded'
    }
  };
  
  console.log('Testing URL-encoded submission');
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
  return result;
}

// Function to test the image saving logic
function testImageSaving() {
  const testData = {
    firstName: 'Test',
    lastName: 'Image',
    paymentScreenshotBase64: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD'
  };
  
  const url = savePaymentScreenshot(testData);
  console.log('Saved test image URL:', url);
  return url;
}

// Function to check if the spreadsheet is accessible
function checkSpreadsheetAccess() {
  const SPREADSHEET_ID = '1sytwgPgO7G_L0hJGNekLfkPFHQEHiGPl1Cu8LcMNn9U';
  
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Successfully opened spreadsheet:', spreadsheet.getName());
    
    const sheets = spreadsheet.getSheets();
    console.log('Sheets in spreadsheet:');
    sheets.forEach(sheet => {
      console.log('- ' + sheet.getName());
    });
    
    return 'Spreadsheet access successful';
  } catch (error) {
    console.error('Error accessing spreadsheet:', error);
    return 'Error accessing spreadsheet: ' + error.toString();
  }
}
