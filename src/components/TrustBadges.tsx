import { Shield, Award, Users, Clock, CheckCircle, Star, Handshake } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      icon: Handshake,
      title: "In Association",
      subtitle: "Kincaid Wolstein VRS"
    },
    {
      icon: Shield,
      title: "ABVE/F Fellow",
      subtitle: "Board Certified"
    },
    {
      icon: Award,
      title: "15+ Certifications",
      subtitle: "Multiple Disciplines"
    },
    {
      icon: Users,
      title: "500+ Law Firms",
      subtitle: "Trusted Nationwide"
    },
    {
      icon: Clock,
      title: "24-Hour Response",
      subtitle: "Rush Cases Welcome"
    },
    {
      icon: CheckCircle,
      title: "Daubert Compliant",
      subtitle: "Court Admissible"
    },
  ];

  return (
    <div className="bg-muted/50 py-8 border-y">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <div key={index} className="text-center">
              <badge.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-sm font-semibold text-foreground">{badge.title}</div>
              <div className="text-xs text-muted-foreground">{badge.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
