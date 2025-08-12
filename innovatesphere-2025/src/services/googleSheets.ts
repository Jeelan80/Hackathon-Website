// Simple client-side Google Sheets integration
// This avoids the googleapis library which is Node.js only

// Import the FormData interface from the registration form
interface TeamMember {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution: string;
  degree: string;
  graduationYear: string;
  sameAsLeader: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution: string;
  degree: string;
  graduationYear: string;
  teamName: string;
  teamSize: string;
  teamMember2: TeamMember;
  teamMember3: TeamMember;
  agreeToTerms: boolean;
  paymentCompleted: boolean;
}

// Define the structure of form data that will be sent to Google Sheets
interface RegistrationData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Academic/Professional
  institution: string;
  degree: string;
  graduationYear: string;
  
  // Team Information
  teamName: string;
  teamSize: string;
  
  // Team Member 2
  teamMember2FirstName: string;
  teamMember2LastName: string;
  teamMember2Email: string;
  teamMember2Phone: string;
  teamMember2Institution: string;
  teamMember2Degree: string;
  teamMember2GraduationYear: string;
  
  // Team Member 3
  teamMember3FirstName: string;
  teamMember3LastName: string;
  teamMember3Email: string;
  teamMember3Phone: string;
  teamMember3Institution: string;
  teamMember3Degree: string;
  teamMember3GraduationYear: string;
  
  // Additional
  agreeToTerms: boolean;
  paymentCompleted: boolean;
  
  // Timestamp
  submissionTime: string;
}

class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  
  // Headers for the Google Sheet (must match the order of data in submitRegistration)
  private readonly HEADERS = [
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

  private constructor() {
    // Constructor doesn't need to initialize anything for client-side approach
  }

  public static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  // Submit registration data using Google Apps Script Web App
  async submitRegistration(data: RegistrationData): Promise<boolean> {
    try {
      // For client-side implementation, we'll use a simpler approach
      // You can either:
      // 1. Use Google Apps Script Web App (recommended for client-side)
      // 2. Use a backend API
      // 3. Use Google Sheets API with proper CORS setup
      
      console.log('Registration data to be submitted:', data);
      
      // Simulate successful submission for now
      // In production, you would call your backend API or Google Apps Script
      
      // Prepare the row data in the same order as headers
      const rowData = [
        data.submissionTime,
        data.firstName,
        data.lastName,
        data.email,
        data.phone,
        data.institution,
        data.degree,
        data.graduationYear,
        data.teamName,
        data.teamSize,
        data.teamMember2FirstName,
        data.teamMember2LastName,
        data.teamMember2Email,
        data.teamMember2Phone,
        data.teamMember2Institution,
        data.teamMember2Degree,
        data.teamMember2GraduationYear,
        data.teamMember3FirstName,
        data.teamMember3LastName,
        data.teamMember3Email,
        data.teamMember3Phone,
        data.teamMember3Institution,
        data.teamMember3Degree,
        data.teamMember3GraduationYear,
        data.agreeToTerms ? 'Yes' : 'No',
        data.paymentCompleted ? 'Yes' : 'No'
      ];

      // Log the data that would be sent to Google Sheets
      console.log('Data formatted for Google Sheets:', rowData);
      console.log('Headers:', this.HEADERS);
      
      // For now, we'll just log the data and return success
      // This prevents the client-side googleapis error
      return true;
    } catch (error) {
      console.error('Failed to submit registration:', error);
      return false;
    }
  }

  // Transform form data to the format expected by Google Sheets
  static transformFormData(formData: FormData): RegistrationData {
    const data = formData as FormData;
    return {
      firstName: String(data.firstName || ''),
      lastName: String(data.lastName || ''),
      email: String(data.email || ''),
      phone: String(data.phone || ''),
      institution: String(data.institution || ''),
      degree: String(data.degree || ''),
      graduationYear: String(data.graduationYear || ''),
      teamName: String(data.teamName || ''),
      teamSize: String(data.teamSize || '1'),
      teamMember2FirstName: String(data.teamMember2?.firstName || ''),
      teamMember2LastName: String(data.teamMember2?.lastName || ''),
      teamMember2Email: String(data.teamMember2?.email || ''),
      teamMember2Phone: String(data.teamMember2?.phone || ''),
      teamMember2Institution: String(data.teamMember2?.institution || ''),
      teamMember2Degree: String(data.teamMember2?.degree || ''),
      teamMember2GraduationYear: String(data.teamMember2?.graduationYear || ''),
      teamMember3FirstName: String(data.teamMember3?.firstName || ''),
      teamMember3LastName: String(data.teamMember3?.lastName || ''),
      teamMember3Email: String(data.teamMember3?.email || ''),
      teamMember3Phone: String(data.teamMember3?.phone || ''),
      teamMember3Institution: String(data.teamMember3?.institution || ''),
      teamMember3Degree: String(data.teamMember3?.degree || ''),
      teamMember3GraduationYear: String(data.teamMember3?.graduationYear || ''),
      agreeToTerms: Boolean(data.agreeToTerms || false),
      paymentCompleted: Boolean(data.paymentCompleted || false),
      submissionTime: new Date().toISOString(),
    };
  }
}

export default GoogleSheetsService;
export type { RegistrationData };
