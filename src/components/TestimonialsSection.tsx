import { Card, CardContent } from "@/components/ui/card";
import { Quote, Building, Scale, Heart } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "The economic analysis was thorough and well-documented. The reports were clearly written and professionally presented.",
      case: "Legal Professional",
      icon: <Scale className="h-5 w-5" />
    },
    {
      content: "The vocational assessments were comprehensive and the economic projections were well-supported with appropriate documentation.",
      case: "Insurance Professional", 
      icon: <Building className="h-5 w-5" />
    },
    {
      content: "The analysis helped us understand the economic factors relevant to our situation. The professional approach was appreciated during a difficult time.",
      case: "Individual Client",
      icon: <Heart className="h-5 w-5" />
    }
  ];

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by attorneys, insurance companies, and families nationwide for accurate, 
            defensible economic analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-primary/20 mr-2" />
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {testimonial.icon}
                      <span className="text-sm font-medium text-primary">{testimonial.case}</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;