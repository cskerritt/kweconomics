// Alternative form submission handlers for different services

import { FormData } from './formHandler';

// 1. FormSubmit.co - No registration required
export const submitToFormSubmit = async (formData: FormData, recipientEmail: string) => {
  const response = await fetch(`https://formsubmit.co/${recipientEmail}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      ...formData,
      _subject: `New form submission from ${formData.firstName} ${formData.lastName}`,
      _captcha: 'false', // Disable captcha for testing
      _template: 'table' // Use table template for emails
    })
  });
  return response.ok;
};

// 2. Web3Forms - Privacy focused
export const submitToWeb3Forms = async (formData: FormData, accessKey: string) => {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      access_key: accessKey,
      ...formData,
      from_name: `${formData.firstName} ${formData.lastName}`
    })
  });
  return response.ok;
};

// 3. EmailJS - Direct email sending
export const submitToEmailJS = async (
  formData: FormData,
  serviceId: string,
  templateId: string,
  publicKey: string
) => {
  // Dynamic import to avoid loading EmailJS unless needed
  const emailjs = await import('@emailjs/browser');
  
  const templateParams = {
    from_name: `${formData.firstName} ${formData.lastName}`,
    from_email: formData.email,
    message: formData.message,
    phone: formData.phone,
    organization: formData.organization,
    case_type: formData.caseType
  };

  const response = await emailjs.send(
    serviceId,
    templateId,
    templateParams,
    publicKey
  );
  
  return response.status === 200;
};

// 4. Custom API endpoint (if you add a backend)
export const submitToCustomAPI = async (formData: FormData, apiUrl: string) => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });
  return response.ok;
};

// 5. Webhook integration (works with Make, Zapier, n8n, etc.)
export const submitToWebhook = async (formData: FormData, webhookUrl: string) => {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...formData,
      timestamp: new Date().toISOString(),
      source: 'website_contact_form'
    })
  });
  return response.ok;
};

// 6. Multiple submission strategy (redundancy)
export const submitWithFallback = async (
  formData: FormData,
  primaryHandler: (data: FormData) => Promise<boolean>,
  fallbackHandler: (data: FormData) => Promise<boolean>
) => {
  try {
    const primaryResult = await primaryHandler(formData);
    if (primaryResult) return true;
  } catch (error) {
    console.error('Primary handler failed:', error);
  }
  
  // Try fallback if primary fails
  try {
    return await fallbackHandler(formData);
  } catch (error) {
    console.error('Fallback handler also failed:', error);
    return false;
  }
};

// 7. Local storage backup (in case of network issues)
export const saveToLocalStorage = (formData: FormData) => {
  const submissions = JSON.parse(localStorage.getItem('pending_submissions') || '[]');
  submissions.push({
    ...formData,
    savedAt: new Date().toISOString(),
    status: 'pending'
  });
  localStorage.setItem('pending_submissions', JSON.stringify(submissions));
};

// Retry failed submissions from local storage
export const retryPendingSubmissions = async (
  submitFunction: (data: FormData) => Promise<boolean>
) => {
  const submissions = JSON.parse(localStorage.getItem('pending_submissions') || '[]');
  const failed: FormData[] = [];
  
  for (const submission of submissions) {
    const success = await submitFunction(submission);
    if (!success) {
      failed.push(submission);
    }
  }
  
  localStorage.setItem('pending_submissions', JSON.stringify(failed));
  return submissions.length - failed.length; // Return number of successful submissions
};