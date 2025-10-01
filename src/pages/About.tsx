import { Globe, Lightbulb, Heart, Users, Target, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Globe,
      title: "Accessibility First",
      description: "We make advanced tools — from AI to automation — easy to understand and adopt.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Scalable Solutions",
      description: "We design workflows and systems that grow with your business.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Heart,
      title: "Human-Centered Tech",
      description: "We don't just install software; we ensure it actually makes your day-to-day smoother.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Users,
      title: "Equal Care for All Clients",
      description: "Every business, big or small, receives the same attention and commitment.",
      color: "from-purple-500 to-violet-500"
    }
  ];

  const promises = [
    "Bridging the gap between cutting-edge technology and everyday usability",
    "Helping businesses of all sizes harness the power of digital transformation",
    "Making advanced technology accessible to every business, no matter the size",
    "Empowering businesses with solutions that work, not overwhelm"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Vision</span>
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed mb-8">
              We envision a world where every business, regardless of size or technical expertise, can leverage the full power of modern technology to achieve their goals and grow sustainably.
            </p>
            <div className="space-y-4 max-w-3xl mx-auto">
              {promises.map((promise, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/80">{promise}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              
              {/* Our Promise */}
              <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-10 h-10 text-background" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">Our Promise</h3>
                      <p className="text-foreground/70 leading-relaxed">
                        We bridge the gap between cutting-edge technology and everyday usability — helping businesses of all sizes harness the power of digital transformation.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mr-4">
                <Lightbulb className="w-6 h-6 text-background" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
            </div>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              The principles that guide everything we do and every solution we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 animate-fade-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center group-hover:animate-pulse-glow transition-all duration-300 flex-shrink-0`}>
                      <value.icon className="w-8 h-8 text-background" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Philosophy</span>
            </h2>
            
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 mb-8">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
                Technology should be a bridge, not a barrier. We believe that every business deserves access to the tools and systems that can transform their operations, regardless of their current technical expertise or budget constraints.
              </p>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Our approach is simple: understand your needs, design solutions that work, and support you every step of the way. We're not just service providers — we're your technology partners in growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-background" />
                </div>
                <h3 className="text-lg font-semibold mb-2">People First</h3>
                <p className="text-foreground/70 text-sm">Every solution starts with understanding your team and your needs</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-background" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Results Driven</h3>
                <p className="text-foreground/70 text-sm">We measure success by the impact on your business</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-background" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                <p className="text-foreground/70 text-sm">We stay ahead of the curve to bring you the best solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Let's discuss how our vision and values can help you achieve your goals
            </p>
            <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-background font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
