// Google Apps Script for Hackathon Registration
// Deploy this as a Web App to receive form submissions

function doPost(e) {
  console.log('doPost called with:', e);
  
  // Special debug line to log all incoming data exactly as received
  console.log('FULL REQUEST DATA:', JSON.stringify(e));
  
  try {
    let data;
    
    // Log all possible data sources
    console.log('e.postData:', e.postData);
    console.log('e.parameter:', e.parameter);
    console.log('e.parameters:', e.parameters);
    
    // Handle both JSON and form data
    if (e.postData && e.postData.contents) {
      console.log('Using postData.contents');
      console.log('Raw contents:', e.postData.contents);
      
      // Check if it's JSON or URL-encoded data
      const contents = e.postData.contents;
      try {
        // Try multiple approaches to parse the data
        
        if (contents.startsWith('data=')) {
          // URL-encoded form data with data= prefix
          console.log('Processing URL-encoded form data with data= prefix...');
          
          try {
            // Method 1: Using URLSearchParams
            const params = new URLSearchParams(contents);
            const dataParam = params.get('data');
            console.log('Method 1 - URLSearchParams result:', dataParam ? 'Found data parameter' : 'No data parameter');
            
            if (dataParam) {
              data = JSON.parse(dataParam);
              console.log('Parsed using URLSearchParams');
            }
          } catch (error) {
            console.log('URLSearchParams method failed:', error);
            
            // Method 2: Manual extraction for data= prefix
            try {
              const encodedData = contents.substring(5); // Remove 'data=' prefix
              const decodedData = decodeURIComponent(encodedData);
              console.log('Method 2 - Manually decoded data:', decodedData.substring(0, 50) + '...');
              data = JSON.parse(decodedData);
              console.log('Parsed using manual decoding');
            } catch (error2) {
              console.log('Manual decoding method failed:', error2);
              throw error2;
            }
          }
        } else if (contents.startsWith('{')) {
          // Regular JSON
          console.log('Processing regular JSON...');
          data = JSON.parse(contents);
          console.log('Parsed as regular JSON');
        } else {
          console.log('Content does not start with data= or {');
          
          // Method 3: Try URLSearchParams for generic form data
          try {
            console.log('Trying generic URLSearchParams...');
            const params = new URLSearchParams(contents);
            
            // List all form parameters received
            console.log('Form parameters received:');
            for (const [key, value] of params.entries()) {
              console.log(`- ${key}: ${value.substring(0, 30)}${value.length > 30 ? '...' : ''}`);
            }
            
            const dataParam = params.get('data');
            if (dataParam) {
              data = JSON.parse(dataParam);
              console.log('Parsed from form parameter "data"');
            } else if (params.has('firstName')) {
              // Method 4: Direct form fields
              console.log('Attempting to construct data object from direct form fields');
              data = {
                firstName: params.get('firstName') || '',
                lastName: params.get('lastName') || '',
                email: params.get('email') || '',
                phone: params.get('phone') || '',
                institution: params.get('institution') || '',
                degree: params.get('degree') || '',
                graduationYear: params.get('graduationYear') || '',
                teamName: params.get('teamName') || '',
                teamSize: params.get('teamSize') || '',
                // Add other fields as needed
              };
              console.log('Constructed data object from form fields');
            } else {
              // Method 5: Last resort - try parsing the content directly
              console.log('Last resort - direct parsing');
              data = JSON.parse(contents);
              console.log('Parsed with direct JSON parsing');
            }
          } catch (error) {
            console.log('All parsing methods failed:', error);
            throw error;
          }
        }
      } catch (parseError) {
        console.error('Parse error:', parseError);
        console.log('All parsing methods failed');
        throw new Error('Unable to parse data: ' + parseError.message);
      }
    } else if (e.parameter && e.parameter.data) {
      console.log('Using parameter.data');
      data = JSON.parse(e.parameter.data);
    } else if (e.parameters && e.parameters.data && e.parameters.data[0]) {
      console.log('Using parameters.data[0]');
      data = JSON.parse(e.parameters.data[0]);
    } else {
      console.log('Using parameter directly');
      data = e.parameter || {};
    }
    
    console.log('Parsed data:', data);
    console.log('Data type:', typeof data);
    console.log('Data keys:', Object.keys(data));
    
    // Validate we have actual data
    if (!data || Object.keys(data).length === 0) {
      console.error('No data received');
      throw new Error('No data received');
    }
    
    // Your spreadsheet ID from the URL
    const SPREADSHEET_ID = '1sytwgPgO7G_L0hJGNekLfkPFHQEHiGPl1Cu8LcMNn9U';
    const SHEET_NAME = 'Registrations';
    
    // Headers for the sheet
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
      'Payment Completed'
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
      data.paymentCompleted ? 'Yes' : 'No'
    ];
    
    console.log('Adding row data:', rowData);
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better visibility
    sheet.autoResizeColumns(1, HEADERS.length);
    
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

// Handle OPTIONS requests for CORS preflight
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doGet() {
  return ContentService
    .createTextOutput('Hackathon Registration Service is running. Last updated: ' + new Date().toISOString())
    .setMimeType(ContentService.MimeType.TEXT);
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
    paymentCompleted: true
  };
  
  // Simulate the doPost function with test data
  const mockEvent = {
    parameter: { data: JSON.stringify(testData) }
  };
  
  return doPost(mockEvent);
}

// Debug function to log sheet data and check permissions
function debugSheetAccess() {
  try {
    console.log('Starting debug check...');
    
    // Your spreadsheet ID from the URL
    const SPREADSHEET_ID = '1sytwgPgO7G_L0hJGNekLfkPFHQEHiGPl1Cu8LcMNn9U';
    const SHEET_NAME = 'Registrations';
    
    console.log('Attempting to access spreadsheet ID:', SPREADSHEET_ID);
    
    // Try to open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Successfully opened spreadsheet:', spreadsheet.getName());
    
    // List all sheets
    const allSheets = spreadsheet.getSheets();
    console.log('All sheets in spreadsheet:');
    allSheets.forEach(sheet => console.log('- ' + sheet.getName()));
    
    // Check for Registrations sheet
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      console.log('Registrations sheet not found - creating it');
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      console.log('Created new sheet:', SHEET_NAME);
    } else {
      console.log('Found existing Registrations sheet');
    }
    
    // Get current data
    const data = sheet.getDataRange().getValues();
    console.log('Current sheet data rows:', data.length);
    
    // Show headers
    if (data.length > 0) {
      console.log('Headers:', data[0]);
    }
    
    // Show last few entries
    if (data.length > 1) {
      console.log('Last entry:', data[data.length - 1]);
    }
    
    // Test a write operation
    const testRow = ['Debug test ' + new Date().toISOString(), 'Debug', 'User'];
    sheet.appendRow(testRow);
    console.log('Test row added:', testRow);
    
    return 'Debug completed successfully. Check logs for details.';
  } catch (error) {
    console.error('Error in debug function:', error);
    return 'Error: ' + error.toString();
  }
}

// Simple test to directly write to the spreadsheet
function writeDirectlyToSheet() {
  try {
    const SPREADSHEET_ID = '1sytwgPgO7G_L0hJGNekLfkPFHQEHiGPl1Cu8LcMNn9U';
    console.log('Opening spreadsheet with ID:', SPREADSHEET_ID);
    
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Spreadsheet name:', spreadsheet.getName());
    
    // List all sheets in the spreadsheet
    const sheets = spreadsheet.getSheets();
    console.log('All sheets in spreadsheet:');
    for (const s of sheets) {
      console.log('- ' + s.getName());
    }
    
    // Try to get Registrations sheet
    let sheet = spreadsheet.getSheetByName('Registrations');
    
    if (!sheet) {
      console.log('Registrations sheet does not exist, creating it');
      sheet = spreadsheet.insertSheet('Registrations');
      sheet.appendRow(['Timestamp', 'Test Value']);
    } else {
      console.log('Found Registrations sheet');
    }
    
    // Write to sheet
    console.log('Writing test row to sheet');
    sheet.appendRow(['Direct Test ' + new Date().toLocaleString(), 'This is a direct write test']);
    
    console.log('Successfully wrote to sheet');
    return 'Successfully wrote to sheet';
  } catch (error) {
    console.error('Error in writeDirectlyToSheet:', error);
    return 'Error: ' + error.toString();
  }
}
