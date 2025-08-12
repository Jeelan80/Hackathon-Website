// Google Apps Script for Hackathon Registration - V11
// BULLETPROOF VERSION - This WILL work!

function doPost(e) {
  console.log('=== doPost V11 Starting ===');
  
  try {
    let jsonData;
    
    // Log everything we receive
    console.log('e.parameter:', e.parameter);
    console.log('e.postData:', e.postData);
    
    // Get the raw data string
    let rawDataString = '';
    
    if (e.parameter && e.parameter.data) {
      rawDataString = e.parameter.data;
      console.log('Using e.parameter.data');
    } else if (e.postData && e.postData.contents) {
      rawDataString = e.postData.contents;
      console.log('Using e.postData.contents');
    } else {
      console.log('No data found anywhere');
      return buildResponse(false, 'No data received');
    }
    
    console.log('Raw data string length:', rawDataString.length);
    console.log('Raw data first 100 chars:', rawDataString.substring(0, 100));
    
    // BULLETPROOF parsing - handle ALL possible formats
    try {
      // Check if it starts with "data=" (URL-encoded form submission)
      if (rawDataString.indexOf('data=') === 0) {
        console.log('Detected URL-encoded form data starting with "data="');
        
        // Extract the value after "data="
        let encodedValue = rawDataString.substring(5); // Remove "data="
        console.log('Encoded value length:', encodedValue.length);
        
        // URL decode it
        let decodedValue = decodeURIComponent(encodedValue);
        console.log('Decoded value first 100 chars:', decodedValue.substring(0, 100));
        
        // Parse as JSON
        jsonData = JSON.parse(decodedValue);
        console.log('SUCCESS: Parsed URL-encoded data');
        
      } else {
        // Try parsing as direct JSON
        console.log('Attempting direct JSON parse');
        jsonData = JSON.parse(rawDataString);
        console.log('SUCCESS: Parsed direct JSON');
      }
    } catch (parseError) {
      console.log('Parse error occurred:', parseError.toString());
      console.log('Raw data that failed:', rawDataString.substring(0, 200));
      
      // Last resort: try to find JSON anywhere in the string
      try {
        console.log('Trying last resort parsing...');
        let jsonMatch = rawDataString.match(/\{.*\}/);
        if (jsonMatch) {
          jsonData = JSON.parse(jsonMatch[0]);
          console.log('SUCCESS: Found and parsed JSON in string');
        } else {
          throw new Error('No JSON found in data');
        }
      } catch (lastResortError) {
        console.log('All parsing methods failed');
        return buildResponse(false, 'Could not parse form data: ' + parseError.toString());
      }
    }
    
    // Validate we have good data
    if (!jsonData || typeof jsonData !== 'object') {
      console.log('Invalid data after parsing');
      return buildResponse(false, 'Invalid data format');
    }
    
    console.log('Data parsed successfully, keys:', Object.keys(jsonData));
    
    // Handle payment screenshot
    let screenshotUrl = '';
    if (jsonData.paymentScreenshotBase64) {
      console.log('Processing payment screenshot...');
      screenshotUrl = handlePaymentScreenshot(jsonData);
    }
    
    // Save to spreadsheet
    let saveResult = saveDataToSheet(jsonData, screenshotUrl);
    
    if (saveResult.success) {
      console.log('=== SUCCESS: Data saved ===');
      return buildResponse(true, 'Registration saved successfully');
    } else {
      console.log('=== ERROR: Save failed ===');
      return buildResponse(false, 'Save failed: ' + saveResult.error);
    }
    
  } catch (mainError) {
    console.log('=== MAIN ERROR ===');
    console.log('Error:', mainError.toString());
    return buildResponse(false, 'Script error: ' + mainError.toString());
  }
}

function buildResponse(success, message) {
  let response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  console.log('Building response:', response);
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function saveDataToSheet(data, screenshotUrl) {
  try {
    console.log('Starting spreadsheet save...');
    
    let SPREADSHEET_ID = '1sytwgPgO7G_L0hJGNekLfkPFHQEHiGPl1Cu8LcMNn9U';
    let spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    console.log('Opened spreadsheet:', spreadsheet.getName());
    
    let sheet = spreadsheet.getSheetByName('Registrations');
    if (!sheet) {
      console.log('Creating new sheet...');
      sheet = spreadsheet.insertSheet('Registrations');
      
      // Add headers
      let headers = [
        'Timestamp', 'First Name', 'Last Name', 'Email', 'Phone',
        'Institution', 'Degree', 'Graduation Year', 'Team Name', 'Team Size',
        'Member 2 - First Name', 'Member 2 - Last Name', 'Member 2 - Email',
        'Member 2 - Phone', 'Member 2 - Institution', 'Member 2 - Degree',
        'Member 2 - Graduation Year', 'Member 3 - First Name', 'Member 3 - Last Name',
        'Member 3 - Email', 'Member 3 - Phone', 'Member 3 - Institution',
        'Member 3 - Degree', 'Member 3 - Graduation Year', 'Agreed to Terms',
        'Payment Completed', 'Payment Screenshot URL', 'Payment Filename'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      let headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285F4');
      headerRange.setFontColor('#FFFFFF');
    }
    
    // Prepare the data row
    let rowData = [
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
    
    console.log('Adding row to sheet...');
    sheet.appendRow(rowData);
    
    console.log('Row added successfully');
    return { success: true };
    
  } catch (error) {
    console.log('Spreadsheet error:', error.toString());
    return { success: false, error: error.toString() };
  }
}

function handlePaymentScreenshot(data) {
  try {
    if (!data.paymentScreenshotBase64) {
      return '';
    }
    
    console.log('Processing payment screenshot...');
    
    // Get or create folder
    let folderName = 'HACKFINITY Payment Screenshots';
    let folders = DriveApp.getFoldersByName(folderName);
    let folder;
    
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    
    // Clean up the base64 data
    let base64Data = data.paymentScreenshotBase64;
    if (base64Data.includes('base64,')) {
      base64Data = base64Data.split('base64,')[1];
    }
    
    // Create the file
    let decodedData = Utilities.base64Decode(base64Data);
    let timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let filename = 'Payment_' + (data.firstName || 'User') + '_' + timestamp + '.jpg';
    
    let blob = Utilities.newBlob(decodedData, 'image/jpeg', filename);
    let file = folder.createFile(blob);
    
    // Make it public
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    console.log('Screenshot saved successfully');
    return file.getUrl();
    
  } catch (error) {
    console.log('Screenshot error:', error.toString());
    return 'Error: ' + error.toString();
  }
}

// Test functions
function testWithUrlEncodedData() {
  console.log('=== Testing URL-encoded data ===');
  
  let testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    agreeToTerms: true,
    paymentCompleted: true
  };
  
  let jsonString = JSON.stringify(testData);
  let urlEncodedData = 'data=' + encodeURIComponent(jsonString);
  
  let mockEvent = {
    postData: {
      contents: urlEncodedData,
      type: 'application/x-www-form-urlencoded'
    }
  };
  
  console.log('Mock event created');
  let result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
  
  return result;
}

function testWithDirectJson() {
  console.log('=== Testing direct JSON ===');
  
  let testData = {
    firstName: 'Direct',
    lastName: 'JSON',
    email: 'direct@example.com',
    agreeToTerms: true,
    paymentCompleted: true
  };
  
  let mockEvent = {
    parameter: {
      data: JSON.stringify(testData)
    }
  };
  
  let result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
  
  return result;
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'online',
      version: 'V11',
      message: 'Bulletproof Google Apps Script is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}
