import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Phone, Mail, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { handleFormSubmission, FormData } from "@/utils/formHandler";
const ScheduleConsultation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caseType, setCaseType] = useState("");
  const [timeline, setTimeline] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    const formData: FormData = {
      ...data,
      caseType,
      timeline
    };

    const success = await handleFormSubmission(formData, 'schedule');
    
    if (success) {
      reset();
      setCaseType("");
      setTimeline("");
    }
    
    setIsSubmitting(false);
  };
  return <div className="min-h-screen">
      <SEOHead title="Schedule Consultation - Expert Economic Analysis | Kincaid Wolstein Economics" description="Schedule a confidential consultation with Christopher Skerritt for forensic economics, life care planning, and vocational rehabilitation analysis." keywords={["schedule consultation", "economic analysis", "expert testimony", "forensic economics", "life care planning"]} />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6">
          <div className="text-center text-primary-foreground max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Schedule Your Consultation
            </h1>
            <p className="text-xl mb-8">
              Get expert economic analysis and strategic guidance for your case. 
              All consultations are confidential and tailored to your specific needs.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Expert Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Flexible Scheduling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Book Your Consultation
              </h2>
              <p className="text-xl text-muted-foreground">
                Fill out the form below and we'll contact you within 24 hours to confirm your appointment.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Consultation Request Form</CardTitle>
                    <CardDescription>
                      Please provide your information and case details to help us prepare for your consultation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            placeholder="Enter your first name"
                            {...register("firstName", { required: "First name is required" })}
                          />
                          {errors.firstName && (
                            <p className="text-sm text-destructive">{errors.firstName.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Enter your last name"
                            {...register("lastName", { required: "Last name is required" })}
                          />
                          {errors.lastName && (
                            <p className="text-sm text-destructive">{errors.lastName.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="your@email.com"
                            {...register("email", { 
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email address"
                              }
                            })}
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            placeholder="(203) 555-0123"
                            {...register("phone", { required: "Phone number is required" })}
                          />
                          {errors.phone && (
                            <p className="text-sm text-destructive">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="organization">Law Firm / Organization</Label>
                        <Input 
                          id="organization" 
                          placeholder="Enter your firm or organization name"
                          {...register("organization")}
                        />
                      </div>


                      <div className="space-y-2">
                        <Label htmlFor="caseType">Case Type</Label>
                        <Select value={caseType} onValueChange={setCaseType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select case type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personal-injury">Personal Injury</SelectItem>
                            <SelectItem value="wrongful-death">Wrongful Death</SelectItem>
                            <SelectItem value="employment">Employment Law</SelectItem>
                            <SelectItem value="business">Business Litigation</SelectItem>
                            <SelectItem value="workers-comp">Workers' Compensation</SelectItem>
                            <SelectItem value="medical-malpractice">Medical Malpractice</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeline">Timeline / Urgency</Label>
                        <Select value={timeline} onValueChange={setTimeline}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard (2-4 weeks)</SelectItem>
                            <SelectItem value="expedited">Expedited (1-2 weeks)</SelectItem>
                            <SelectItem value="rush">Rush (Within 1 week)</SelectItem>
                            <SelectItem value="emergency">Emergency (24-48 hours)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Case Details / Questions</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Please provide a brief overview of your case, specific questions you have, or any additional information that would help us prepare for your consultation." 
                          className="min-h-32"
                          {...register("message")}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Request Consultation"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Quick Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-muted-foreground">(201) 343-0700</div>
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">chris@kweconomics.com</div>
                    </div>
                    <div>
                      <div className="font-medium">Business Hours</div>
                      <div className="text-muted-foreground">Mon-Fri: 8AM-6PM EST</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Emergency Cases
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      For urgent cases requiring immediate attention, we offer 24-48 hour expedited consultations.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What to Expect</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                      <div className="text-sm">
                        <div className="font-medium">Confirmation Call</div>
                        <div className="text-muted-foreground">We'll contact you within 24 hours to confirm details</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                      <div className="text-sm">
                        <div className="font-medium">Consultation</div>
                        <div className="text-muted-foreground">Comprehensive review of your case and economic analysis needs</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                      <div className="text-sm">
                        <div className="font-medium">Follow-up</div>
                        <div className="text-muted-foreground">Written summary with recommendations and next steps</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default ScheduleConsultation;