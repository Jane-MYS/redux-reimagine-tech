import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Digital network background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
      </div>

      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 circuit-pattern opacity-30 z-0"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Tech Solutions{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Reimagined
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-10 leading-relaxed">
            From web design to workflow automation — we help you innovate, simplify, and grow.
          </p>
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary text-background font-bold text-lg px-10 py-7 hover:opacity-90 transition-all hover:scale-105 glow-primary animate-pulse-glow"
          >
            Book a Free Consultation
          </Button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 border-2 border-primary/30 rounded-full animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 border-2 border-secondary/30 rotate-45 animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
