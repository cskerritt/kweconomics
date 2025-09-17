import React from 'react';
import { trackPhoneClick } from './analytics/GoogleAnalytics';

interface PhoneClickTrackerProps {
  phoneNumber: string;
  displayText?: string;
  location: string;
  className?: string;
  children?: React.ReactNode;
}

const PhoneClickTracker: React.FC<PhoneClickTrackerProps> = ({
  phoneNumber,
  displayText,
  location,
  className = '',
  children
}) => {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const phoneLink = `tel:+1${cleanPhone}`;
  
  const handleClick = () => {
    trackPhoneClick(phoneNumber, location);
  };

  return (
    <a 
      href={phoneLink}
      onClick={handleClick}
      className={className}
    >
      {children || displayText || phoneNumber}
    </a>
  );
};

export default PhoneClickTracker;