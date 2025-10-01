import { Layers, TrendingUp, Settings, Wifi } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Layers,
      title: "Web & App Design",
      description: "Modern, responsive websites and applications tailored to your brand and goals.",
    },
    {
      icon: TrendingUp,
      title: "Project Management Consulting",
      description: "Streamline how teams deliver results with proven methodologies and tools.",
    },
    {
      icon: Settings,
      title: "Business Workflow Setup",
      description: "Implement CRM, cloud storage, and automation tools to optimize operations.",
    },
    {
      icon: Wifi,
      title: "Home Network & Tech Support",
      description: "Secure, reliable home office and network design for remote professionals.",
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Comprehensive tech solutions designed to propel your business forward
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 animate-fade-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:animate-pulse-glow">
                  <service.icon className="w-8 h-8 text-background" />
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-foreground/70">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
