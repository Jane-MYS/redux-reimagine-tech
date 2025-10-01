import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content: "Reimagine Tech completely transformed our digital presence. Their attention to detail and technical expertise is unmatched.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      content: "The workflow automation they implemented saved us countless hours. Best investment we've made this year.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Freelance Designer",
      content: "My home office network has never been more reliable. Fast setup, professional service, and ongoing support.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Don't just take our word for it — hear from those we've helped succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-sm text-foreground/60 mb-6">Trusted partners and technologies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <span className="text-lg font-semibold">Google Workspace</span>
            <span className="text-lg font-semibold">Asana</span>
            <span className="text-lg font-semibold">Trello</span>
            <span className="text-lg font-semibold">Slack</span>
            <span className="text-lg font-semibold">AWS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
