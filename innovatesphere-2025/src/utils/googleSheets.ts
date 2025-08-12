interface RegistrationFormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution: string;
  degree: string;
  graduationYear: string;
  
  // Team Info
  teamName: string;
  teamSize: number;
  
  // Team Members (optional)
  teamMember2FirstName: string;
  teamMember2LastName: string;
  teamMember2Email: string;
  teamMember2Phone: string;
  teamMember2Institution: string;
  teamMember2Degree: string;
  teamMember2GraduationYear: string;
  
  teamMember3FirstName: string;
  teamMember3LastName: string;
  teamMember3Email: string;
  teamMember3Phone: string;
  teamMember3Institution: string;
  teamMember3Degree: string;
  teamMember3GraduationYear: string;
  
  // Terms and Payment
  agreeToTerms: boolean;
  paymentCompleted: boolean;
  paymentScreenshotBase64?: string;
}

// Interface for the form data as it comes from the component
interface ComponentFormData {
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
  paymentScreenshot: string;
  paymentScreenshotBase64: string;
}

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

export class GoogleSheetsService {
  // Google Apps Script Web App URL - Replace with your deployed script URL
  private static WEB_APP_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || '';
  
  constructor() {
    // Log the URL when the service is instantiated
    console.log('[GoogleSheetsService] Using Web App URL:', GoogleSheetsService.WEB_APP_URL);
    if (!GoogleSheetsService.WEB_APP_URL) {
      console.warn('[GoogleSheetsService] No Web App URL configured! Set VITE_GOOGLE_APPS_SCRIPT_URL in .env.local');
    }
  }

  /**
   * Transform component form data to the format expected by Google Sheets
   */
  private static transformFormData(formData: ComponentFormData): RegistrationFormData {
    return {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      institution: formData.institution,
      degree: formData.degree,
      graduationYear: formData.graduationYear,
      teamName: formData.teamName,
      teamSize: parseInt(formData.teamSize, 10),
      
      // Team Member 2
      teamMember2FirstName: formData.teamMember2.firstName,
      teamMember2LastName: formData.teamMember2.lastName,
      teamMember2Email: formData.teamMember2.email,
      teamMember2Phone: formData.teamMember2.phone,
      teamMember2Institution: formData.teamMember2.institution,
      teamMember2Degree: formData.teamMember2.degree,
      teamMember2GraduationYear: formData.teamMember2.graduationYear,
      
      // Team Member 3
      teamMember3FirstName: formData.teamMember3.firstName,
      teamMember3LastName: formData.teamMember3.lastName,
      teamMember3Email: formData.teamMember3.email,
      teamMember3Phone: formData.teamMember3.phone,
      teamMember3Institution: formData.teamMember3.institution,
      teamMember3Degree: formData.teamMember3.degree,
      teamMember3GraduationYear: formData.teamMember3.graduationYear,
      
      agreeToTerms: formData.agreeToTerms,
      paymentCompleted: formData.paymentCompleted,
      paymentScreenshotBase64: formData.paymentScreenshotBase64
    };
  }

  static async submitRegistration(formData: ComponentFormData): Promise<{ success: boolean; message: string }> {
    try {
      // Transform the form data to the format expected by Google Sheets
      const transformedData = this.transformFormData(formData);
      
      // Prepare the data for submission
      const submissionData = {
        submissionTime: new Date().toISOString(),
        ...transformedData
      };

      // If no web app URL is configured, just log the data
      if (!this.WEB_APP_URL) {
        console.log('Registration submission data (no URL configured):', submissionData);
        return {
          success: true,
          message: 'Registration data logged successfully (demo mode - configure VITE_GOOGLE_APPS_SCRIPT_URL)'
        };
      }

      // Use direct fetch request to Google Apps Script
      return new Promise((resolve) => {
        console.log('Starting direct submission to Google Apps Script...');
        console.log('Using URL:', this.WEB_APP_URL);
        
        try {
          // Convert the data to a JSON string
          const jsonData = JSON.stringify(submissionData);
          console.log('JSON data prepared (length):', jsonData.length);
          
          // Use a direct fetch request with JSON data
          fetch(this.WEB_APP_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: jsonData,
            mode: 'no-cors' // This is important for cross-origin requests to Google Apps Script
          }).then(() => {
            console.log('Fetch request completed successfully');
            resolve({
              success: true,
              message: 'Registration submitted successfully'
            });
          }).catch((fetchError) => {
            console.error('Error with fetch request:', fetchError);
            
            // Fallback to iframe method if fetch fails
            console.log('Falling back to iframe submission method...');
            
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.name = 'google-sheets-submit';
            
            document.body.appendChild(iframe);
            
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = this.WEB_APP_URL;
            form.target = 'google-sheets-submit';
            
            // Create a hidden input for the data
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'data';
            input.value = JSON.stringify(submissionData);
            form.appendChild(input);
            
            document.body.appendChild(form);
            form.submit();
            
            // Clean up and resolve after a short delay
            setTimeout(() => {
              try {
                document.body.removeChild(form);
                document.body.removeChild(iframe);
              } catch (e) {
                console.error('Error cleaning up form elements:', e);
              }
              resolve({
                success: true,
                message: 'Registration submitted successfully (iframe method)'
              });
            }, 5000);
          });
        } catch (error) {
          console.error('Error setting up fetch request:', error);
          resolve({
            success: true,
            message: 'Registration process completed (with errors)'
          });
        }
      });

    } catch (error) {
      console.error('Error submitting registration:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred'
      };
    }
  }
}
