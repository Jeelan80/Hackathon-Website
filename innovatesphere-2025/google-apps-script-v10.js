// Google Apps Script for Hackathon Registration - V10
// COMPLETELY FIXED to handle URL-encoded form data properly

function doPost(e) {
  console.log('doPost called');
  
  try {
    let data;
    let rawData = '';
    
    // First, let's safely extract the raw data
    if (e.parameter && e.parameter.data) {
      rawData = e.parameter.data;
      console.log('Found data in e.parameter.data');
    } else if (e.postData && e.postData.contents) {
      rawData = e.postData.contents;
      console.log('Found data in e.postData.contents');
    } else {
      console.error('No data found in request');
      return createResponse(false, 'No data received');
    }
    
    console.log('Raw data type:', typeof rawData);
    console.log('Raw data length:', rawData.length);
    console.log('Raw data preview:', rawData.substring(0, 50) + '...');
    
    // Now let's parse the data step by step
    try {
      // If the data starts with "data=", it's URL-encoded form data
      if (rawData.startsWith('data=')) {
        console.log('Processing URL-encoded form data');
        
        // Extract everything after "data="
        const encodedJson = rawData.substring(5);
        console.log('Encoded JSON length:', encodedJson.length);
        
        // Decode the URL-encoded data
        const decodedJson = decodeURIComponent(encodedJson);
        console.log('Decoded JSON preview:', decodedJson.substring(0, 100) + '...');
        
        // Parse the JSON
        data = JSON.parse(decodedJson);
        console.log('Successfully parsed URL-encoded data');
        
      } else {
        // Try to parse as direct JSON
        console.log('Attempting to parse as direct JSON');
        data = JSON.parse(rawData);
        console.log('Successfully parsed direct JSON');
      }
    } catch (parseError) {
      console.error('Parse error:', parseError.toString());
      console.error('Failed to parse data:', rawData.substring(0, 200));
      return createResponse(false, 'Failed to parse form data: ' + parseError.toString());
    }
    
    // Validate the parsed data
    if (!data || typeof data !== 'object') {
      console.error('Invalid data format after parsing');
      return createResponse(false, 'Invalid data format');
    }
    
    console.log('Parsed data successfully');
    console.log('Data keys:', Object.keys(data));
    
    // Process payment screenshot if present
    let screenshotUrl = '';
    if (data.paymentScreenshotBase64) {
      console.log('Processing payment screenshot...');
      screenshotUrl = savePaymentScreenshot(data);
      console.log('Screenshot saved:', screenshotUrl ? 'Success' : 'Failed');
    }
    
    // Save to spreadsheet
    const result = saveToSpreadsheet(data, screenshotUrl);
    
    if (result.success) {
      console.log('Data saved to spreadsheet successfully');
      return createResponse(true, 'Registration submitted successfully');
    } else {
      console.error('Failed to save to spreadsheet:', result.error);
      return createResponse(false, 'Failed to save registration: ' + result.error);
    }
    
  } catch (error) {
    console.error('Unexpected error in doPost:', error.toString());
    return createResponse(false, 'Unexpected error: ' + error.toString());
  }
}

/**
 * Create a standardized response
 */
function createResponse(success, message) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Save data to the spreadsheet
 */
function saveToSpreadsheet(data, screenshotUrl) {
  try {
    const SPREADSHEET_ID = '1sytwgPgO7G_L0hJGNekLfkPFHQEHiGPl1Cu8LcMNn9U';
    const SHEET_NAME = 'Registrations';
    
    // Headers for the spreadsheet
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
      'Payment Screenshot URL',
      'Payment Filename'
    ];
    
    // Open spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285F4');
      headerRange.setFontColor('#FFFFFF');
    }
    
    // Ensure headers are present
    const firstRow = sheet.getRange(1, 1, 1, Math.min(HEADERS.length, sheet.getLastColumn() || HEADERS.length)).getValues()[0];
    if (!firstRow[0] || firstRow[0] !== 'Timestamp') {
      sheet.insertRowBefore(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285F4');
      headerRange.setFontColor('#FFFFFF');
    }
    
    // Prepare row data
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
      screenshotUrl || '',
      data.paymentScreenshot || ''
    ];
    
    // Add the row to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, rowData.length);
    
    return { success: true };
    
  } catch (error) {
    console.error('Error saving to spreadsheet:', error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Save payment screenshot to Google Drive
 */
function savePaymentScreenshot(data) {
  try {
    if (!data.paymentScreenshotBase64) {
      console.log('No payment screenshot data provided');
      return '';
    }
    
    // Get or create folder
    const folderName = 'HACKFINITY Payment Screenshots';
    let folder;
    const folderIterator = DriveApp.getFoldersByName(folderName);
    
    if (folderIterator.hasNext()) {
      folder = folderIterator.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    
    // Process base64 data
    let base64Data = data.paymentScreenshotBase64;
    
    // Remove data URL prefix if present
    if (base64Data.includes('base64,')) {
      base64Data = base64Data.split('base64,')[1];
    }
    
    // Decode base64
    const decodedData = Utilities.base64Decode(base64Data);
    
    // Create filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `Payment_${data.firstName || 'Unknown'}_${data.lastName || 'User'}_${timestamp}.jpg`;
    
    // Create and save file
    const blob = Utilities.newBlob(decodedData, 'image/jpeg', filename);
    const file = folder.createFile(blob);
    
    // Make file accessible
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    console.log('Payment screenshot saved successfully');
    return file.getUrl();
    
  } catch (error) {
    console.error('Error saving payment screenshot:', error.toString());
    return 'Error: ' + error.toString();
  }
}

// Handle OPTIONS requests
function doOptions() {
  console.log('Handling OPTIONS request');
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Handle GET requests
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'online',
      message: 'Google Apps Script V10 is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function for direct parameter data
function testParameterSubmission() {
  const testData = {
    submissionTime: new Date().toISOString(),
    firstName: 'Test',
    lastName: 'Parameter',
    email: 'test-param@example.com',
    phone: '1234567890',
    institution: 'Test University',
    degree: 'Computer Science',
    graduationYear: '2025',
    teamName: 'Test Team',
    teamSize: '1',
    agreeToTerms: true,
    paymentCompleted: true,
    paymentScreenshot: 'test.jpg'
  };
  
  const mockEvent = {
    parameter: {
      data: JSON.stringify(testData)
    }
  };
  
  console.log('Testing parameter submission');
  const result = doPost(mockEvent);
  console.log('Parameter test result:', result.getContent());
  return result;
}

// Test function for URL-encoded form data
function testFormSubmission() {
  const testData = {
    submissionTime: new Date().toISOString(),
    firstName: 'Test',
    lastName: 'Form',
    email: 'test-form@example.com',
    phone: '0987654321',
    institution: 'Form University',
    degree: 'Web Development',
    graduationYear: '2024',
    teamName: 'Form Team',
    teamSize: '2',
    agreeToTerms: true,
    paymentCompleted: true,
    paymentScreenshot: 'form-test.jpg'
  };
  
  const jsonString = JSON.stringify(testData);
  const formData = 'data=' + encodeURIComponent(jsonString);
  
  const mockEvent = {
    postData: {
      contents: formData,
      type: 'application/x-www-form-urlencoded'
    }
  };
  
  console.log('Testing form submission');
  const result = doPost(mockEvent);
  console.log('Form test result:', result.getContent());
  return result;
}

// Test spreadsheet access
function testSpreadsheetAccess() {
  const SPREADSHEET_ID = '1sytwgPgO7G_L0hJGNekLfkPFHQEHiGPl1Cu8LcMNn9U';
  
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Spreadsheet access successful:', spreadsheet.getName());
    
    const sheets = spreadsheet.getSheets();
    console.log('Available sheets:');
    sheets.forEach(sheet => console.log('- ' + sheet.getName()));
    
    return 'Success: Can access spreadsheet';
  } catch (error) {
    console.error('Spreadsheet access failed:', error.toString());
    return 'Error: ' + error.toString();
  }
}

// Test image saving
function testImageSaving() {
  const testData = {
    firstName: 'Test',
    lastName: 'Image',
    paymentScreenshotBase64: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  };
  
  const url = savePaymentScreenshot(testData);
  console.log('Image saving test result:', url);
  return url;
}
