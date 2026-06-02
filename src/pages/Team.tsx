import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail } from "lucide-react";
import { teamMembers, getInitials } from "@/data/team";

const Team = () => {
  const personSchema = teamMembers.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: m.name.replace(/,.*$/, ""),
    jobTitle: m.title,
    worksFor: { "@type": "Organization", name: "Kincaid Wolstein Economics" },
    description: m.shortBio,
  }));

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Meet the Team | Kincaid Wolstein Economics"
        description="Meet the economists of Kincaid Wolstein Economics — forensic economic analysis, vocational rehabilitation, and life care planning expertise."
        canonical="https://kweconomics.com/team"
        schema={personSchema as unknown as object}
      />
      <Header />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Meet the Team</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced economists delivering trusted forensic analysis and expert testimony.
            </p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {teamMembers.map((m) => (
              <Card key={m.slug} id={m.slug} className="p-8 shadow-card border-0 bg-card">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 flex flex-col items-center text-center">
                    {m.hasPhoto ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-48 h-48 object-cover object-top rounded-lg shadow-card mb-4"
                      />
                    ) : (
                      <div className="w-48 h-48 rounded-lg shadow-card mb-4 bg-primary/10 text-primary flex items-center justify-center text-5xl font-bold">
                        {getInitials(m.name)}
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-foreground">{m.name}</h2>
                    <p className="text-primary font-medium">{m.title}</p>
                    {m.links?.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors mt-2"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>

                  <div className="lg:col-span-2">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">{m.bio}</p>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Credentials</h3>
                    <div className="space-y-2 mb-6">
                      {m.credentials.map((c) => (
                        <div key={c} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{c}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href="mailto:chris@kweconomics.com"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      <Mail className="h-4 w-4 mr-2" /> Contact our team
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Team;
