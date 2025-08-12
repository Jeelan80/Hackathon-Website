// Google Apps Script for Hackathon Registration
// Deploy this as a Web App to receive form submissions - Version 6

function doPost(e) {
  console.log('doPost called with:', e);
  
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
        if (contents.startsWith('data=')) {
          // URL-encoded form data - properly decode it
          console.log('Processing URL-encoded form data...');
          const params = new URLSearchParams(contents);
          const dataParam = params.get('data');
          console.log('Extracted data parameter:', dataParam);
          if (dataParam) {
            data = JSON.parse(dataParam);
          } else {
            throw new Error('No data parameter found in form data');
          }
        } else if (contents.startsWith('{')) {
          // Regular JSON
          console.log('Processing regular JSON...');
          data = JSON.parse(contents);
        } else {
          // Try URLSearchParams parsing first for form data
          console.log('Trying URLSearchParams parsing...');
          const params = new URLSearchParams(contents);
          const dataParam = params.get('data');
          if (dataParam) {
            data = JSON.parse(dataParam);
          } else {
            // Fallback to direct JSON parsing
            data = JSON.parse(contents);
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
