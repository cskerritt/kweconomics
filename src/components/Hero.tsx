import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, TrendingUp, FileBarChart } from "lucide-react";
import { Link } from "react-router-dom";
const Hero = () => {
  return <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-dark text-white min-h-[600px] flex items-center">
      <div className="kw-aurora" aria-hidden="true" />
      <div className="kw-grid" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-primary-foreground">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight font-serif kw-enter kw-enter-1">
              Kincaid Wolstein Economics
              <br />
              
            </h1>
            
            <p className="text-xl mb-8 text-primary-foreground/90 leading-relaxed kw-enter kw-enter-2">
              Strategic economic advisory services and expert damages analysis. 
              Kincaid Wolstein Economics delivers comprehensive economic consulting for business strategy, 
              litigation support, and complex damages assessment nationwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 kw-enter kw-enter-3">
              <Button variant="hero" size="lg" className="group" asChild>
                <Link to="/schedule-consultation">
                  Get Free Case Assessment
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/advisory">
                  Explore Advisory Services
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <a href="tel:+12013430700">
                  Call Now: (201) 343-0700
                </a>
              </Button>
            </div>

            {/* Quick Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-center">
              <Link to="/contact" className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 hover:bg-primary-foreground/20 transition-colors cursor-pointer group kw-lift">
                <div className="font-semibold text-sm">Emergency Response</div>
                <div className="text-xs text-primary-foreground/80">24-hour turnaround available</div>
              </Link>
              <Link to="/schedule-consultation" className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 hover:bg-primary-foreground/20 transition-colors cursor-pointer group kw-lift">
                <div className="font-semibold text-sm">Free Initial Review</div>
                <div className="text-xs text-primary-foreground/80">No obligation consultation</div>
              </Link>
              <Link to="/locations" className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 hover:bg-primary-foreground/20 transition-colors cursor-pointer group kw-lift">
                <div className="font-semibold text-sm">Nationwide Service</div>
                <div className="text-xs text-primary-foreground/80">Licensed in multiple states</div>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <Link to="/about" className="text-center hover:scale-105 transition-transform cursor-pointer group">
                <Calculator className="h-8 w-8 mx-auto mb-2 text-accent group-hover:text-primary-foreground transition-colors" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm text-primary-foreground/80 group-hover:text-primary-foreground transition-colors">Certifications</div>
              </Link>
              <Link to="/case-studies" className="text-center hover:scale-105 transition-transform cursor-pointer group">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent group-hover:text-primary-foreground transition-colors" />
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-primary-foreground/80 group-hover:text-primary-foreground transition-colors">Cases Analyzed</div>
              </Link>
              <Link to="/experience" className="text-center hover:scale-105 transition-transform cursor-pointer group">
                <FileBarChart className="h-8 w-8 mx-auto mb-2 text-accent group-hover:text-primary-foreground transition-colors" />
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm text-primary-foreground/80 group-hover:text-primary-foreground transition-colors">Years Experience</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;