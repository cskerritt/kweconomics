import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  Shield,
  FileCheck,
  Users,
  Calendar,
  MessageSquare,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { handleFormSubmission, FormData } from "@/utils/formHandler";
import PhoneClickTracker from "@/components/PhoneClickTracker";
import QuickContactForm from "@/components/QuickContactForm";

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    caseType: '',
    message: '',
    timeline: '',
    contactMethod: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await handleFormSubmission(formData, 'contact');
    
    if (success) {
      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        caseType: '',
        message: '',
        timeline: '',
        contactMethod: 'email'
      });
    }
    
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Schedule Consultation Request",
      description: "Direct line for immediate consultation",
      contact: "(203) 605-2814",
      availability: "Mon-Fri: 8AM-6PM EST"
    },
    {
      icon: Mail,
      title: "Email Inquiry",
      description: "Detailed case information and documents",
      contact: "chris@kweconomics.com",
      availability: "Prompt response time"
    },
  ];


  const caseTypes = [
    "Personal Injury",
    "Wrongful Death", 
    "Workers' Compensation",
    "Social Security Disability",
    "Medical Malpractice",
    "Employment Litigation",
    "Business Valuation",
    "Life Care Planning",
    "Catastrophic Injury",
    "Economic Loss Assessment"
  ];

  const whyChoose = [
    {
      icon: Shield,
      title: "Confidential & Secure",
      description: "Secure communications and confidential document handling"
    },
    {
      icon: FileCheck,
      title: "Daubert Compliant",
      description: "All analyses meet Federal Rules of Evidence standards for expert testimony"
    },
    {
      icon: Users,
      title: "Experienced Team",
      description: "10+ years of experience with 2,500+ cases across multiple jurisdictions"
    },
    {
      icon: Clock,
      title: "Responsive Service",
      description: "24-hour response time with rush case capabilities for urgent matters"
    }
  ];

  const currentUrl = "https://kweconomics.com/contact";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Expert Economics - Forensic Economic Analysis Consultation",
    "description": "Contact KW Economics for expert forensic economic analysis, vocational rehabilitation, and life care planning consultation.",
    "url": currentUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "KW Economics",
      "telephone": "(203) 605-2814",
      "email": "chris@kweconomics.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "400 Putnam Pike Ste J",
        "addressLocality": "Smithfield", 
        "addressRegion": "RI",
        "postalCode": "02917",
        "addressCountry": "US"
      },
      "openingHours": "Mo-Fr 08:00-18:00"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://skerritteconomics.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": currentUrl
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Contact Expert Economics - Forensic Economic Analysis Consultation"
        description="Contact Skerritt Economics for expert forensic economic analysis, vocational rehabilitation, and life care planning consultation. Prompt response time. Rush cases welcome. Call (203) 605-2814."
        canonical={currentUrl}
        keywords={["contact expert economist", "forensic economics consultation", "expert witness contact", "economic analysis consultation", "litigation support contact", "rush cases", "expert testimony", "economic damages"]}
        schema={structuredData}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-primary-foreground">
            <h1 className="text-5xl font-bold mb-6">
              Get Expert Economic Analysis
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Contact Skerritt Economics & Consulting for confidential consultation 
              about your forensic economics, vocational rehabilitation, or life care planning needs.
            </p>
            <Button variant="hero" size="lg" className="group" asChild>
              <a href="/schedule-consultation">
                Schedule Consultation
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">How to Reach Us</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Multiple convenient ways to initiate consultation for your expert economic analysis needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16 justify-center max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card key={index} className="p-8 text-center shadow-card border-0 bg-card">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6">
                  <method.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{method.title}</h3>
                <p className="text-muted-foreground mb-4">{method.description}</p>
                {method.contact.includes('203') ? (
                  <PhoneClickTracker
                    phoneNumber="2036052814"
                    displayText="(203) 605-2814"
                    location="contact-method-card"
                    className="font-medium text-primary text-lg mb-2 hover:underline"
                  />
                ) : (
                  <div className="font-medium text-primary text-lg mb-2">{method.contact}</div>
                )}
                <div className="text-sm text-muted-foreground">{method.availability}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-card border-0 bg-card">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Request Expert Consultation
                </h3>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <Input 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John" 
                        className="bg-background border-border" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <Input 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Smith" 
                        className="bg-background border-border" 
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@lawfirm.com" 
                        className="bg-background border-border" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567" 
                        className="bg-background border-border" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Law Firm / Organization
                    </label>
                    <Input 
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder="Smith & Associates Law Firm" 
                      className="bg-background border-border" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Case Type *
                    </label>
                    <select 
                      name="caseType"
                      value={formData.caseType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                      required
                    >
                      <option value="">Select case type</option>
                      {caseTypes.map((type, index) => (
                        <option key={index} value={type.toLowerCase().replace(/\s+/g, '-')}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Case Details *
                    </label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide a brief description of your case, type of analysis needed, and any specific deadlines or requirements..."
                      rows={4}
                      className="bg-background border-border"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Timeline / Urgency
                      </label>
                      <select 
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                      >
                        <option value="">Select urgency</option>
                        <option value="immediate">Immediate (Rush)</option>
                        <option value="1-2-weeks">1-2 Weeks</option>
                        <option value="1-month">Within 1 Month</option>
                        <option value="flexible">Flexible Timeline</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Preferred Contact Method
                      </label>
                      <select 
                        name="contactMethod"
                        value={formData.contactMethod}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="either">Either</option>
                      </select>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    variant="professional" 
                    size="lg" 
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    <Send className="h-5 w-5 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Consultation Request'}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card className="p-6 shadow-card border-0 bg-card">
                <h3 className="text-xl font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <PhoneClickTracker
                        phoneNumber="2036052814"
                        displayText="(203) 605-2814"
                        location="contact-sidebar"
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      />
                      <div className="text-sm text-muted-foreground">Direct Cell</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">chris@skerritteconomics.com</div>
                      <div className="text-sm text-muted-foreground">Primary Email</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">400 Putnam Pike Ste J</div>
                      <div className="text-muted-foreground">Smithfield, RI 02917</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">Mon-Fri: 8AM-6PM EST</div>
                      <div className="text-sm text-muted-foreground">Emergency consultations available</div>
                    </div>
                  </div>
                </div>
              </Card>


              {/* Why Choose Us */}
              <Card className="p-6 shadow-card border-0 bg-card">
                <h3 className="text-xl font-semibold text-foreground mb-4">Why Choose Us</h3>
                <div className="space-y-4">
                  {whyChoose.map((reason, index) => (
                    <div key={index} className="flex items-start">
                      <reason.icon className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-foreground text-sm">{reason.title}</div>
                        <div className="text-xs text-muted-foreground">{reason.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Rush Cases */}
              <Card className="p-6 shadow-card border-0 bg-primary/5 border-primary/20">
                <h3 className="text-lg font-semibold text-primary mb-2">Rush Cases Welcome</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We understand litigation timelines can be urgent. We offer expedited analysis 
                  for time-sensitive cases with 24-48 hour turnaround capabilities.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;