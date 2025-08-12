import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from '../ui';
import { fadeInUp } from '../../utils/animations';
import { 
  FaUser, 
  FaGraduationCap, 
  FaCode,
  FaUsers,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Academic/Professional
  institution: string;
  degree: string;
  graduationYear: string;
  
  // Technical
  programmingLanguages: string[];
  experience: string;
  
  // Team
  teamName: string;
  teamSize: string;
  lookingForTeam: boolean;
  
  // Additional
  motivation: string;
  dietaryRestrictions: string;
  agreeToTerms: boolean;
}

interface RegistrationFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institution: '',
    degree: '',
    graduationYear: '',
    programmingLanguages: [],
    experience: '',
    teamName: '',
    teamSize: '1',
    lookingForTeam: false,
    motivation: '',
    dietaryRestrictions: '',
    agreeToTerms: false
  });

  const programmingOptions = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 
    'Machine Learning', 'AI/ML', 'Data Science', 'Mobile Development'
  ];

  const experienceOptions = [
    'Beginner (0-1 years)',
    'Intermediate (1-3 years)', 
    'Advanced (3-5 years)',
    'Expert (5+ years)'
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        break;
      
      case 2:
        if (!formData.institution.trim()) newErrors.institution = 'Institution is required';
        if (!formData.degree.trim()) newErrors.degree = 'Degree/Field is required';
        if (!formData.graduationYear.trim()) newErrors.graduationYear = 'Graduation year is required';
        break;
      
      case 3:
        if (formData.programmingLanguages.length === 0) {
          newErrors.programmingLanguages = ['At least one skill is required'] as any;
        }
        if (!formData.experience) newErrors.experience = 'Experience level is required';
        break;
      
      case 4:
        if (!formData.lookingForTeam && !formData.teamName.trim()) {
          newErrors.teamName = 'Team name is required if you have a team';
        }
        break;
      
      case 5:
        if (!formData.motivation.trim()) newErrors.motivation = 'Motivation is required';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms' as any;
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would submit to your backend or external service
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleProgrammingLanguage = (language: string) => {
    const current = formData.programmingLanguages;
    const updated = current.includes(language)
      ? current.filter(l => l !== language)
      : [...current, language];
    updateFormData('programmingLanguages', updated);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaUser className="text-primary-blue" />
              Personal Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className={`w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue ${
                    errors.firstName ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className={`w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue ${
                    errors.lastName ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={`w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue ${
                  errors.email ? 'ring-2 ring-red-500' : ''
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className={`w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue ${
                  errors.phone ? 'ring-2 ring-red-500' : ''
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaGraduationCap className="text-primary-blue" />
              Academic Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Institution/Company *</label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => updateFormData('institution', e.target.value)}
                className={`w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue ${
                  errors.institution ? 'ring-2 ring-red-500' : ''
                }`}
                placeholder="University or Company name"
              />
              {errors.institution && <p className="text-red-400 text-sm mt-1">{errors.institution}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Degree/Field of Study *</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => updateFormData('degree', e.target.value)}
                className={`w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue ${
                  errors.degree ? 'ring-2 ring-red-500' : ''
                }`}
                placeholder="e.g., Computer Science, Software Engineering"
              />
              {errors.degree && <p className="text-red-400 text-sm mt-1">{errors.degree}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Graduation Year *</label>
              <select
                value={formData.graduationYear}
                onChange={(e) => updateFormData('graduationYear', e.target.value)}
                className={`w-full glass-card p-3 text-white border-0 focus:ring-2 focus:ring-primary-blue ${
                  errors.graduationYear ? 'ring-2 ring-red-500' : ''
                }`}
              >
                <option value="">Select graduation year</option>
                {Array.from({ length: 10 }, (_, i) => 2025 + i).map(year => (
                  <option key={year} value={year} className="bg-gray-800">{year}</option>
                ))}
                {Array.from({ length: 5 }, (_, i) => 2024 - i).map(year => (
                  <option key={year} value={year} className="bg-gray-800">{year}</option>
                ))}
              </select>
              {errors.graduationYear && <p className="text-red-400 text-sm mt-1">{errors.graduationYear}</p>}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaCode className="text-primary-blue" />
              Technical Skills
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Programming Languages & Skills *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {programmingOptions.map(language => (
                  <motion.button
                    key={language}
                    type="button"
                    onClick={() => toggleProgrammingLanguage(language)}
                    className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                      formData.programmingLanguages.includes(language)
                        ? 'bg-primary-blue text-white'
                        : 'glass-card text-gray-300 hover:bg-white/10'
                    }`}
                    whileHover={{ opacity: 0.8 }}
                    whileTap={{ opacity: 0.6 }}
                  >
                    {language}
                  </motion.button>
                ))}
              </div>
              {errors.programmingLanguages && <p className="text-red-400 text-sm mt-1">At least one skill is required</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level *</label>
              <select
                value={formData.experience}
                onChange={(e) => updateFormData('experience', e.target.value)}
                className={`w-full glass-card p-3 text-white border-0 focus:ring-2 focus:ring-primary-blue ${
                  errors.experience ? 'ring-2 ring-red-500' : ''
                }`}
              >
                <option value="">Select your experience level</option>
                {experienceOptions.map(option => (
                  <option key={option} value={option} className="bg-gray-800">{option}</option>
                ))}
              </select>
              {errors.experience && <p className="text-red-400 text-sm mt-1">{errors.experience}</p>}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaUsers className="text-primary-blue" />
              Team Information
            </h3>
            
            <div className="glass-card p-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.lookingForTeam}
                  onChange={(e) => updateFormData('lookingForTeam', e.target.checked)}
                  className="w-4 h-4 text-primary-blue bg-transparent border-gray-300 rounded focus:ring-primary-blue"
                />
                <span className="text-white">I'm looking for teammates</span>
              </label>
            </div>
            
            {!formData.lookingForTeam && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Team Name</label>
                <input
                  type="text"
                  value={formData.teamName}
                  onChange={(e) => updateFormData('teamName', e.target.value)}
                  className={`w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue ${
                    errors.teamName ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="Enter your team name"
                />
                {errors.teamName && <p className="text-red-400 text-sm mt-1">{errors.teamName}</p>}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Team Size</label>
              <select
                value={formData.teamSize}
                onChange={(e) => updateFormData('teamSize', e.target.value)}
                className="w-full glass-card p-3 text-white border-0 focus:ring-2 focus:ring-primary-blue"
              >
                <option value="1" className="bg-gray-800">Solo (1 person)</option>
                <option value="2" className="bg-gray-800">2 people</option>
                <option value="3" className="bg-gray-800">3 people</option>
                <option value="4" className="bg-gray-800">4 people</option>
              </select>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Final Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Why do you want to participate? *</label>
              <textarea
                value={formData.motivation}
                onChange={(e) => updateFormData('motivation', e.target.value)}
                rows={4}
                className={`w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue resize-none ${
                  errors.motivation ? 'ring-2 ring-red-500' : ''
                }`}
                placeholder="Tell us about your motivation to participate in this hackathon..."
              />
              {errors.motivation && <p className="text-red-400 text-sm mt-1">{errors.motivation}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Dietary Restrictions (Optional)</label>
              <input
                type="text"
                value={formData.dietaryRestrictions}
                onChange={(e) => updateFormData('dietaryRestrictions', e.target.value)}
                className="w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue"
                placeholder="Any dietary restrictions or allergies?"
              />
            </div>
            
            <div className="glass-card p-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                  className="w-4 h-4 text-primary-blue bg-transparent border-gray-300 rounded focus:ring-primary-blue mt-1"
                />
                <span className="text-white text-sm">
                  I agree to the <a href="/terms" className="text-primary-blue hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-primary-blue hover:underline">Privacy Policy</a> *
                </span>
              </label>
              {errors.agreeToTerms && <p className="text-red-400 text-sm mt-1">You must agree to the terms</p>}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <FaCheckCircle className="text-6xl text-green-400 mx-auto mb-4" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3>
        <p className="text-gray-300">Welcome to InnovateSphere 2025! Check your email for confirmation details.</p>
      </motion.div>
    );
  }

  if (submitStatus === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <FaExclamationTriangle className="text-6xl text-red-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Registration Failed</h3>
        <p className="text-gray-300 mb-4">Something went wrong. Please try again.</p>
        <AnimatedButton
          variant="primary"
          size="md"
          onClick={() => setSubmitStatus('idle')}
        >
          Try Again
        </AnimatedButton>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Step {currentStep} of 5</span>
          <span>{Math.round((currentStep / 5) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-purple to-primary-blue h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <AnimatedButton
          variant="ghost"
          size="md"
          onClick={currentStep === 1 ? onClose : handlePrevious}
          disabled={isSubmitting}
        >
          {currentStep === 1 ? 'Cancel' : 'Previous'}
        </AnimatedButton>

        <AnimatedButton
          variant="primary"
          size="md"
          onClick={currentStep === 5 ? handleSubmit : handleNext}
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </div>
          ) : currentStep === 5 ? (
            'Submit Registration'
          ) : (
            'Next'
          )}
        </AnimatedButton>
      </div>
    </div>
  );
};

export default RegistrationForm;