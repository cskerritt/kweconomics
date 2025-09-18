import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin, FileText, Scale, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import PhoneClickTracker from "./PhoneClickTracker";
const Footer = () => {
  const onKWLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget as HTMLImageElement;
    const stage = el.getAttribute('data-fallback') || '0';
    if (stage === '0') {
      el.setAttribute('data-fallback', '1');
      el.src = "/lovable-uploads/kincaid-wolstein-logo.jpg"; // try JPG variant
    } else if (stage === '1') {
      el.setAttribute('data-fallback', '2');
      el.src = "/lovable-uploads/kw-logo-cropped.jpg"; // alternate filename
    } else if (stage === '2') {
      el.setAttribute('data-fallback', '3');
      el.src = "/lovable-uploads/Photoshop-KW%20Logo_Cropped.jpg"; // original with spaces
    }
  };
  return <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">KW Economics</h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Kincaid Wolstein Economics provides expert forensic economic analysis, vocational rehabilitation, 
              and life care planning services. Comprehensive expertise in economic loss assessment 
              and expert testimony for litigation support.
            </p>
            <div className="mt-2">
              <div className="text-primary-foreground/80 text-sm">
                In association with
                {" "}
                <a
                  href="https://kwvrs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline hover:text-primary-foreground"
                >
                  Kincaid Wolstein Vocational & Rehabilitation Services
                </a>
              </div>
              <a 
                href="https://kwvrs.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block mt-3 px-4 py-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
              >
                <span className="text-sm font-medium text-primary-foreground">
                  Visit KWVRS.com
                </span>
              </a>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <a href="https://www.linkedin.com/in/christopherskerritt" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link to="/services" className="hover:text-primary-foreground transition-colors">Economic Loss Assessment</Link></li>
              <li><Link to="/services" className="hover:text-primary-foreground transition-colors">Vocational Evaluation</Link></li>
              <li><Link to="/services" className="hover:text-primary-foreground transition-colors">Life Care Planning</Link></li>
              <li><Link to="/services" className="hover:text-primary-foreground transition-colors">Business Valuation</Link></li>
              <li><Link to="/services" className="hover:text-primary-foreground transition-colors">Expert Testimony</Link></li>
              <li><Link to="/locations" className="hover:text-primary-foreground transition-colors font-semibold">All Locations →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <PhoneClickTracker
                phoneNumber="2013430700"
                displayText="(201) 343-0700"
                location="footer"
                className="flex items-center hover:text-primary-foreground transition-colors"
              >
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>(201) 343-0700</span>
              </PhoneClickTracker>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>chris@kweconomics.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <div>1 University Plaza Dr</div>
                  <div>Hackensack, NJ 07601</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6 text-sm text-primary-foreground/60">
            <div className="flex items-center">
              <Scale className="h-4 w-4 mr-2" />
              <span>Certified Expert Witness</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              <span>ABVE/F - Fellow of Vocational Experts</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm text-primary-foreground/60">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
            <span>© 2025 Kincaid Wolstein Economics. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
