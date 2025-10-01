import { DollarSign, Sparkles, HandshakeIcon, Zap } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: DollarSign,
      title: "Affordable",
      description: "Premium tech solutions that fit your budget without compromising quality.",
    },
    {
      icon: Sparkles,
      title: "Custom Solutions",
      description: "Tailored strategies designed specifically for your unique business needs.",
    },
    {
      icon: HandshakeIcon,
      title: "Hands-On Support",
      description: "Direct access to experts who care about your success every step of the way.",
    },
    {
      icon: Zap,
      title: "Future-Ready",
      description: "Stay ahead with cutting-edge technologies and innovative approaches.",
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Choose Us</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            We combine expertise, innovation, and dedication to deliver exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="text-center group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:border-primary">
                <reason.icon className="w-10 h-10 text-primary group-hover:text-secondary transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {reason.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-secondary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default WhyChooseUs;
