import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Phone } from 'lucide-react';
import { handleFormSubmission } from '@/utils/formHandler';
import { trackFormSubmission } from './analytics/GoogleAnalytics';

interface QuickContactFormProps {
  formTitle?: string;
  buttonText?: string;
  showPhoneOption?: boolean;
}

const QuickContactForm: React.FC<QuickContactFormProps> = ({
  formTitle = "Get Your Questions Answered",
  buttonText = "Get Free Consultation",
  showPhoneOption = true
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Split name into first and last
    const nameParts = formData.firstName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || 'Not Provided';
    
    const submissionData = {
      ...formData,
      firstName,
      lastName,
      caseType: 'quick-contact',
      organization: 'Not Provided'
    };
    
    const success = await handleFormSubmission(submissionData, 'contact');
    
    if (success) {
      trackFormSubmission('quick-contact', submissionData);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-foreground mb-4">{formTitle}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Your Name *"
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          required
          className="bg-background"
        />
        
        <Input
          type="tel"
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
          className="bg-background"
        />
        
        <Input
          type="email"
          placeholder="Email (Optional)"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="bg-background"
        />
        
        <Textarea
          placeholder="Brief description of your case (Optional)"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          rows={3}
          className="bg-background"
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          size="lg"
          disabled={isSubmitting}
        >
          <Send className="h-5 w-5 mr-2" />
          {isSubmitting ? 'Sending...' : buttonText}
        </Button>
      </form>
      
      {showPhoneOption && (
        <div className="mt-4 text-center">
          <div className="text-sm text-muted-foreground mb-2">Prefer to call?</div>
          <Button variant="outline" size="lg" className="w-full" asChild>
            <a href="tel:+12036052814">
              <Phone className="h-5 w-5 mr-2" />
              (203) 605-2814
            </a>
          </Button>
          <div className="text-xs text-muted-foreground mt-2">
            Available Mon-Fri 8AM-6PM EST
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickContactForm;