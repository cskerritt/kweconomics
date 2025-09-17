import { Card } from '@/components/ui/card';
import { Star, Quote, CheckCircle } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Personal Injury Attorney",
      firm: "Regional Law Firm",
      location: "New England",
      text: "Mr. Skerritt's economic analysis was thorough and well-documented. His methodology was sound and his testimony was clear and professional during deposition.",
      rating: 5,
      caseType: "Personal Injury"
    },
    {
      name: "Defense Attorney",
      firm: "National Law Firm",
      location: "Northeast US",
      text: "Chris provides objective, unbiased analysis regardless of which side retains him. His reports are comprehensive and his calculations follow accepted methodologies.",
      rating: 5,
      caseType: "Workers' Compensation"
    },
    {
      name: "Employment Law Attorney",
      firm: "Boutique Firm",
      location: "Connecticut",
      text: "The vocational rehabilitation assessment was detailed and defensible. Mr. Skerritt's expertise in labor market analysis and wage loss calculations is evident in his work.",
      rating: 5,
      caseType: "Employment Litigation"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Professional References
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Feedback from attorneys regarding our economic analysis and expert services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 shadow-lg border-0 bg-card relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.text}"
              </p>
              
              <div className="border-t pt-4">
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.firm}</div>
                <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                <div className="text-xs text-primary mt-2">
                  Case Type: {testimonial.caseType}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-lg font-semibold text-primary">
            <CheckCircle className="h-6 w-6" />
            Providing Objective Economic Analysis for Both Plaintiff and Defense Counsel
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;