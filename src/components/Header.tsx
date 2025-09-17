import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Mail, 
  Phone, 
  Menu, 
  X, 
  ChevronDown,
  Scale,
  Calculator,
  Users,
  FileText,
  Briefcase,
  Award,
  TrendingUp,
  BookOpen,
  MapPin,
  BarChart3,
  LineChart,
  Landmark,
  ClipboardList
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchComponent from "./SearchComponent";
import PhoneClickTracker from "./PhoneClickTracker";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/d183816c-18dd-43be-93dc-254decb43da9.png" 
                alt="Skerritt Economics & Consulting Logo" 
                className="h-12 w-auto"
              />
              <h1 className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer hidden lg:block">
                Skerritt Economics & Consulting
              </h1>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <SearchComponent />
            <nav className="flex items-center space-x-8">
              {/* Services Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors cursor-pointer">
                  Services
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-background border shadow-lg" align="start">
                  <DropdownMenuLabel>Advisory Highlights</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/services/market-analysis-forecasting" className="flex items-center gap-2 cursor-pointer">
                      <BarChart3 className="h-4 w-4" />
                      <span>Market Analysis</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/services/pricing-strategy" className="flex items-center gap-2 cursor-pointer">
                      <LineChart className="h-4 w-4" />
                      <span>Pricing Strategy</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/services/economic-impact-studies" className="flex items-center gap-2 cursor-pointer">
                      <Landmark className="h-4 w-4" />
                      <span>Economic Impact</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/services/program-evaluation" className="flex items-center gap-2 cursor-pointer">
                      <ClipboardList className="h-4 w-4" />
                      <span>Program Evaluation</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Our Services</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/services" className="flex items-center gap-2 cursor-pointer">
                      <Scale className="h-4 w-4" />
                      <span>All Services</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/services/economic-loss-assessment" className="flex items-center gap-2 cursor-pointer">
                      <Calculator className="h-4 w-4" />
                      <span>Economic Loss Assessment</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/services/vocational-evaluation" className="flex items-center gap-2 cursor-pointer">
                      <Users className="h-4 w-4" />
                      <span>Vocational Evaluation</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/services/life-care-planning" className="flex items-center gap-2 cursor-pointer">
                      <FileText className="h-4 w-4" />
                      <span>Life Care Planning</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/case-types" className="flex items-center gap-2 cursor-pointer">
                      <Briefcase className="h-4 w-4" />
                      <span>Case Types</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* About Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors cursor-pointer">
                  About
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-background border shadow-lg" align="start">
                  <DropdownMenuLabel>About Us</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/about" className="flex items-center gap-2 cursor-pointer">
                      <Award className="h-4 w-4" />
                      <span>Our Expertise</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/experience" className="flex items-center gap-2 cursor-pointer">
                      <TrendingUp className="h-4 w-4" />
                      <span>Experience & Cases</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/case-studies" className="flex items-center gap-2 cursor-pointer">
                      <BookOpen className="h-4 w-4" />
                      <span>Case Studies</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/locations" className="flex items-center gap-2 cursor-pointer">
                      <MapPin className="h-4 w-4" />
                      <span>Locations</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <PhoneClickTracker
              phoneNumber="2036052814"
              displayText="(203) 605-2814"
              location="header-desktop"
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-semibold">(203) 605-2814</span>
            </PhoneClickTracker>
            <Button variant="default" size="sm" asChild>
              <Link to="/schedule-consultation">Get Free Quote</Link>
            </Button>
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link 
                to="/services" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/case-types" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Case Types
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/experience" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Experience
              </Link>
              <Link 
                to="/locations" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Locations
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-2 border-t border-border">
                <Button variant="default" size="sm" asChild className="w-full">
                  <Link to="/schedule-consultation" onClick={() => setIsMenuOpen(false)}>
                    Get Free Quote
                  </Link>
                </Button>
              </div>
              <PhoneClickTracker
                phoneNumber="2036052814"
                displayText="(203) 605-2814"
                location="header-mobile"
                className="flex items-center space-x-2 text-sm text-primary pt-2"
              >
                <Phone className="h-4 w-4" />
                <span className="font-semibold">(203) 605-2814</span>
              </PhoneClickTracker>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
