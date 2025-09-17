import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Shield,
  FileCheck,
  Users
} from "lucide-react";
import QuickContactForm from "./QuickContactForm";
import PhoneClickTracker from "./PhoneClickTracker";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Get Expert Economic Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Contact us for a confidential consultation about your forensic economics needs. 
            We respond to all inquiries within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8 shadow-card border-0 bg-card">
              <QuickContactForm 
                formTitle="Request Expert Consultation"
                buttonText="Get Free Case Review"
                showPhoneOption={true}
              />
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 shadow-card border-0 bg-card">
              <h3 className="text-xl font-semibold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <PhoneClickTracker
                      phoneNumber="2036052814"
                      displayText="(203) 605-2814"
                      location="contact-component-sidebar"
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    />
                    <div className="text-sm text-muted-foreground">Direct Cell</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">chris@kweconomics.com</div>
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

            <Card className="p-6 shadow-card border-0 bg-card">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why Choose Us</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Confidential</div>
                    <div className="text-sm text-muted-foreground">Secure and confidential communications</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileCheck className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Thorough</div>
                    <div className="text-sm text-muted-foreground">Comprehensive analysis & documentation</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Experienced</div>
                    <div className="text-sm text-muted-foreground">500+ completed case analyses</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card border-0 bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold text-primary mb-2">Rush Cases Welcome</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We understand litigation timelines can be urgent. We offer expedited analysis 
                for time-sensitive cases.
              </p>
              <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                <a href="/emergency-consultation">Emergency Consultation</a>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;