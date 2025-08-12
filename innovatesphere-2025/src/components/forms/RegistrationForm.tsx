import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from '../ui';
import { fadeInUp } from '../../utils/animations';
import { 
  FaUser, 
  FaGraduationCap, 
  FaUsers,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

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
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Academic/Professional
  institution: string;
  degree: string;
  graduationYear: string;
  
  // Team
  teamName: string;
  teamSize: string;
  teamMember2: TeamMember;
  teamMember3: TeamMember;
  
  // Additional
  agreeToTerms: boolean;
  paymentCompleted: boolean;
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
    teamName: '',
    teamSize: '1',
    teamMember2: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      institution: '',
      degree: '',
      graduationYear: '',
      sameAsLeader: false
    },
    teamMember3: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      institution: '',
      degree: '',
      graduationYear: '',
      sameAsLeader: false
    },
    agreeToTerms: false,
    paymentCompleted: false
  });



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
        if (!formData.teamName.trim()) {
          newErrors.teamName = 'Team name is required';
        }
        
        // Validate team member 2 if team size is 2 or 3
        if (parseInt(formData.teamSize) >= 2) {
          const member2 = formData.teamMember2;
          if (!member2.firstName.trim()) newErrors.teamMember2 = { ...newErrors.teamMember2 as any, firstName: 'First name is required' };
          if (!member2.lastName.trim()) newErrors.teamMember2 = { ...newErrors.teamMember2 as any, lastName: 'Last name is required' };
          if (!member2.email.trim()) newErrors.teamMember2 = { ...newErrors.teamMember2 as any, email: 'Email is required' };
          if (!member2.phone.trim()) newErrors.teamMember2 = { ...newErrors.teamMember2 as any, phone: 'Phone is required' };
          if (!member2.sameAsLeader && !member2.institution.trim()) newErrors.teamMember2 = { ...newErrors.teamMember2 as any, institution: 'Institution is required' };
          if (!member2.sameAsLeader && !member2.degree.trim()) newErrors.teamMember2 = { ...newErrors.teamMember2 as any, degree: 'Degree is required' };
          if (!member2.sameAsLeader && !member2.graduationYear.trim()) newErrors.teamMember2 = { ...newErrors.teamMember2 as any, graduationYear: 'Graduation year is required' };
        }
        
        // Validate team member 3 if team size is 3
        if (parseInt(formData.teamSize) === 3) {
          const member3 = formData.teamMember3;
          if (!member3.firstName.trim()) newErrors.teamMember3 = { ...newErrors.teamMember3 as any, firstName: 'First name is required' };
          if (!member3.lastName.trim()) newErrors.teamMember3 = { ...newErrors.teamMember3 as any, lastName: 'Last name is required' };
          if (!member3.email.trim()) newErrors.teamMember3 = { ...newErrors.teamMember3 as any, email: 'Email is required' };
          if (!member3.phone.trim()) newErrors.teamMember3 = { ...newErrors.teamMember3 as any, phone: 'Phone is required' };
          if (!member3.sameAsLeader && !member3.institution.trim()) newErrors.teamMember3 = { ...newErrors.teamMember3 as any, institution: 'Institution is required' };
          if (!member3.sameAsLeader && !member3.degree.trim()) newErrors.teamMember3 = { ...newErrors.teamMember3 as any, degree: 'Degree is required' };
          if (!member3.sameAsLeader && !member3.graduationYear.trim()) newErrors.teamMember3 = { ...newErrors.teamMember3 as any, graduationYear: 'Graduation year is required' };
        }
        break;
      
      case 4:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms' as any;
        if (!formData.paymentCompleted) newErrors.paymentCompleted = 'Payment must be completed' as any;
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

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

  const updateTeamMember = (memberKey: 'teamMember2' | 'teamMember3', field: keyof TeamMember, value: any) => {
    setFormData(prev => ({
      ...prev,
      [memberKey]: {
        ...prev[memberKey],
        [field]: value
      }
    }));
  };

  const handleSameAsLeader = (memberKey: 'teamMember2' | 'teamMember3', checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [memberKey]: {
          ...prev[memberKey],
          institution: prev.institution,
          degree: prev.degree,
          graduationYear: prev.graduationYear,
          sameAsLeader: true
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [memberKey]: {
          ...prev[memberKey],
          institution: '',
          degree: '',
          graduationYear: '',
          sameAsLeader: false
        }
      }));
    }
  };



  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaUser className="text-primary-blue" />
              Team Leader Info
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
                placeholder="+91 XXXXXXXXXX"
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
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaUsers className="text-primary-blue" />
              Team Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Team Name *</label>
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
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Team Size *</label>
              <select
                value={formData.teamSize}
                onChange={(e) => updateFormData('teamSize', e.target.value)}
                className="w-full glass-card p-3 text-white border-0 focus:ring-2 focus:ring-primary-blue"
              >
                <option value="1" className="bg-gray-800">1 member (Solo)</option>
                <option value="2" className="bg-gray-800">2 members</option>
                <option value="3" className="bg-gray-800">3 members</option>
              </select>
            </div>

            {/* Team Member 2 Details */}
            {parseInt(formData.teamSize) >= 2 && (
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Team Member 2 Details</h4>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={formData.teamMember2.firstName}
                      onChange={(e) => updateTeamMember('teamMember2', 'firstName', e.target.value)}
                      className="w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue"
                      placeholder="Enter first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={formData.teamMember2.lastName}
                      onChange={(e) => updateTeamMember('teamMember2', 'lastName', e.target.value)}
                      className="w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.teamMember2.email}
                      onChange={(e) => updateTeamMember('teamMember2', 'email', e.target.value)}
                      className="w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue"
                      placeholder="email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.teamMember2.phone}
                      onChange={(e) => updateTeamMember('teamMember2', 'phone', e.target.value)}
                      className="w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue"
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.teamMember2.sameAsLeader}
                      onChange={(e) => handleSameAsLeader('teamMember2', e.target.checked)}
                      className="w-4 h-4 text-primary-blue bg-transparent border-gray-300 rounded focus:ring-primary-blue"
                    />
                    <span className="text-white">Same as Team Leader (College & Degree)</span>
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Institution/College *</label>
                    <input
                      type="text"
                      value={formData.teamMember2.institution}
                      onChange={(e) => updateTeamMember('teamMember2', 'institution', e.target.value)}
                      disabled={formData.teamMember2.sameAsLeader}
                      className={`w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue ${
                        formData.teamMember2.sameAsLeader ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      placeholder="Institution or College name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Degree/Field of Study *</label>
                    <input
                      type="text"
                      value={formData.teamMember2.degree}
                      onChange={(e) => updateTeamMember('teamMember2', 'degree', e.target.value)}
                      disabled={formData.teamMember2.sameAsLeader}
                      className={`w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue ${
                        formData.teamMember2.sameAsLeader ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Graduation Year *</label>
                  <select
                    value={formData.teamMember2.graduationYear}
                    onChange={(e) => updateTeamMember('teamMember2', 'graduationYear', e.target.value)}
                    disabled={formData.teamMember2.sameAsLeader}
                    className={`w-full glass-card p-3 text-white border-0 focus:ring-2 focus:ring-primary-blue ${
                      formData.teamMember2.sameAsLeader ? 'opacity-50 cursor-not-allowed' : ''
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
                </div>
              </div>
            )}

            {/* Team Member 3 Details */}
            {parseInt(formData.teamSize) >= 3 && (
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Team Member 3 Details</h4>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={formData.teamMember3.firstName}
                      onChange={(e) => updateTeamMember('teamMember3', 'firstName', e.target.value)}
                      className="w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue"
                      placeholder="Enter first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={formData.teamMember3.lastName}
                      onChange={(e) => updateTeamMember('teamMember3', 'lastName', e.target.value)}
                      className="w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.teamMember3.email}
                      onChange={(e) => updateTeamMember('teamMember3', 'email', e.target.value)}
                      className="w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue"
                      placeholder="email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.teamMember3.phone}
                      onChange={(e) => updateTeamMember('teamMember3', 'phone', e.target.value)}
                      className="w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue"
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.teamMember3.sameAsLeader}
                      onChange={(e) => handleSameAsLeader('teamMember3', e.target.checked)}
                      className="w-4 h-4 text-primary-blue bg-transparent border-gray-300 rounded focus:ring-primary-blue"
                    />
                    <span className="text-white">Same as Team Leader (College & Degree)</span>
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Institution/College *</label>
                    <input
                      type="text"
                      value={formData.teamMember3.institution}
                      onChange={(e) => updateTeamMember('teamMember3', 'institution', e.target.value)}
                      disabled={formData.teamMember3.sameAsLeader}
                      className={`w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue ${
                        formData.teamMember3.sameAsLeader ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      placeholder="Institution or College name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Degree/Field of Study *</label>
                    <input
                      type="text"
                      value={formData.teamMember3.degree}
                      onChange={(e) => updateTeamMember('teamMember3', 'degree', e.target.value)}
                      disabled={formData.teamMember3.sameAsLeader}
                      className={`w-full glass-card p-3 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-primary-blue ${
                        formData.teamMember3.sameAsLeader ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Graduation Year *</label>
                  <select
                    value={formData.teamMember3.graduationYear}
                    onChange={(e) => updateTeamMember('teamMember3', 'graduationYear', e.target.value)}
                    disabled={formData.teamMember3.sameAsLeader}
                    className={`w-full glass-card p-3 text-white border-0 focus:ring-2 focus:ring-primary-blue ${
                      formData.teamMember3.sameAsLeader ? 'opacity-50 cursor-not-allowed' : ''
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
                </div>
              </div>
            )}
          </motion.div>
        );

      case 4:
        return (
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaCheckCircle className="text-primary-blue" />
              Payment & Confirmation
            </h3>
            
            {/* Registration Summary */}
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Registration Summary</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Team Leader:</span>
                  <span className="text-white">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Team Name:</span>
                  <span className="text-white">{formData.teamName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Team Size:</span>
                  <span className="text-white">{formData.teamSize} member{parseInt(formData.teamSize) > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span>Institution:</span>
                  <span className="text-white">{formData.institution}</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Payment Details</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-300">Registration Fee:</span>
                  <span className="text-white font-bold">₹1,499/-</span>
                </div>
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-white">Total Amount:</span>
                    <span className="text-primary-blue">₹1,499/-</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
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

            {/* Payment Button */}
            <div className="text-center">
              <div className="mb-4">
                <p className="text-gray-300 text-sm mb-2">
                  Click below to proceed with secure payment via Razorpay
                </p>
                <p className="text-gray-400 text-xs">
                  You will be redirected to Razorpay's secure payment gateway
                </p>
              </div>
              
              <a
                href="https://rzp.io/rzp/VffCf0iE"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (formData.agreeToTerms) {
                    updateFormData('paymentCompleted', true);
                  }
                }}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  formData.agreeToTerms
                    ? 'bg-gradient-to-r from-primary-purple to-primary-blue text-white hover:shadow-lg hover:shadow-primary-blue/25 transform hover:scale-105'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                style={{ pointerEvents: formData.agreeToTerms ? 'auto' : 'none' }}
              >
                <FaCheckCircle className="text-xl" />
                Pay ₹1,499 & Complete Registration
              </a>
              
              {!formData.agreeToTerms && (
                <p className="text-red-400 text-sm mt-2">Please agree to terms before proceeding with payment</p>
              )}
              
              {errors.paymentCompleted && (
                <p className="text-red-400 text-sm mt-2">Please complete the payment to finish registration</p>
              )}
            </div>

            {/* Payment Status */}
            {formData.paymentCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-4 border border-green-500"
              >
                <div className="flex items-center gap-3 text-green-400">
                  <FaCheckCircle className="text-xl" />
                  <span className="font-semibold">Your payment will be verified and you will be added to HACKFINITY.</span>
                </div>
              </motion.div>
            )}
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
        <p className="text-gray-300">Welcome to HACKFINITY! Check your email for confirmation details.</p>
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
          <span>Step {currentStep} of 4</span>
          <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-purple to-primary-blue h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / 4) * 100}%` }}
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
          onClick={currentStep === 4 ? handleSubmit : handleNext}
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </div>
          ) : currentStep === 4 ? (
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