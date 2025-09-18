import { toast } from "@/hooks/use-toast";

export interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  organization?: string;
  caseType?: string;
  message?: string;
  urgency?: string;
  preferredDate?: string;
  preferredTime?: string;
  consultationType?: string;
  timeline?: string;
  deadline?: string;
  budget?: string;
  contactMethod?: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s()+-]+$/;
  return phone.length >= 10 && phoneRegex.test(phone);
};

export const handleFormSubmission = async (
  formData: FormData,
  formType: 'contact' | 'schedule' | 'emergency'
): Promise<boolean> => {
  try {
    // Validate required fields
    if (!formData.firstName || !formData.lastName) {
      toast({
        title: "Validation Error",
        description: "Please provide your first and last name.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.email || !validateEmail(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please provide a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      toast({
        title: "Validation Error",
        description: "Please provide a valid phone number.",
        variant: "destructive",
      });
      return false;
    }

    // For emergency forms, validate urgency and deadline
    if (formType === 'emergency') {
      if (!formData.urgency || !formData.deadline) {
        toast({
          title: "Validation Error",
          description: "Please specify urgency level and deadline for emergency requests.",
          variant: "destructive",
        });
        return false;
      }
    }

    // Prepare submission data with form type
    const submissionData = {
      ...formData,
      formType: formType,
      submittedAt: new Date().toISOString(),
      subject: `${formType.charAt(0).toUpperCase() + formType.slice(1)} Form Submission - ${formData.firstName} ${formData.lastName}`
    };

    // Submit to Formspree
    const response = await fetch('https://formspree.io/f/mnnvgzgd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(submissionData)
    });

    if (!response.ok) {
      throw new Error('Form submission failed');
    }

    // Show success message
    const successMessages = {
      contact: "Your consultation request has been received. We'll contact you within 24 hours.",
      schedule: "Your appointment request has been received. We'll confirm your consultation time shortly.",
      emergency: "Emergency request received! We'll contact you within 2 hours during business hours."
    };

    toast({
      title: "Success!",
      description: successMessages[formType],
    });

    return true;
  } catch (error) {
    console.error('Form submission error:', error);
    toast({
      title: "Submission Error",
      description: "There was an error submitting your request. Please try again or call us directly at (201) 343-0700.",
      variant: "destructive",
    });
    return false;
  }
};

// Email service configuration for production
export const getEmailServiceConfig = () => {
  return {
    serviceId: process.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: process.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: process.env.VITE_EMAILJS_PUBLIC_KEY || '',
  };
};

// Format form data for email
export const formatEmailContent = (formData: FormData, formType: string): string => {
  const lines = [
    `Form Type: ${formType}`,
    `Name: ${formData.firstName} ${formData.lastName}`,
    `Email: ${formData.email}`,
    `Phone: ${formData.phone || 'Not provided'}`,
    `Organization: ${formData.organization || 'Not provided'}`,
  ];

  if (formData.caseType) {
    lines.push(`Case Type: ${formData.caseType}`);
  }

  if (formData.urgency) {
    lines.push(`Urgency: ${formData.urgency}`);
  }

  if (formData.deadline) {
    lines.push(`Deadline: ${formData.deadline}`);
  }

  if (formData.consultationType) {
    lines.push(`Consultation Type: ${formData.consultationType}`);
  }

  if (formData.preferredDate) {
    lines.push(`Preferred Date: ${formData.preferredDate}`);
  }

  if (formData.preferredTime) {
    lines.push(`Preferred Time: ${formData.preferredTime}`);
  }

  if (formData.timeline) {
    lines.push(`Timeline: ${formData.timeline}`);
  }

  if (formData.budget) {
    lines.push(`Budget: ${formData.budget}`);
  }

  if (formData.message) {
    lines.push(`\nMessage:\n${formData.message}`);
  }

  return lines.join('\n');
};