import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users2 } from "lucide-react";
import { teamMembers, getInitials } from "@/data/team";

const TeamTeaser = () => (
  <section id="team" className="py-20 bg-background">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4">Meet the Team</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experienced economists providing trusted forensic analysis and expert testimony.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {teamMembers.map((m) => (
          <Card key={m.slug} className="p-8 shadow-card border-0 bg-gradient-subtle text-center">
            {m.hasPhoto ? (
              <img
                src={m.photo}
                alt={`${m.name.replace(/,.*$/, "")}, ${m.title}`}
                className="w-28 h-28 object-cover object-top rounded-full mx-auto mb-4 shadow-soft"
              />
            ) : (
              <div className="w-28 h-28 rounded-full mx-auto mb-4 bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
                {getInitials(m.name)}
              </div>
            )}
            <h3 className="text-xl font-semibold text-foreground">{m.name}</h3>
            <p className="text-primary font-medium mb-3">{m.title}</p>
            <p className="text-muted-foreground text-sm">{m.shortBio}</p>
          </Card>
        ))}
      </div>
      <div className="text-center mt-10">
        <Button variant="professional" size="lg" className="group" asChild>
          <Link to="/team">
            <Users2 className="h-5 w-5 mr-2" />
            Meet the Team
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default TeamTeaser;
