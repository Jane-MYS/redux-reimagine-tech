import { MessageCircle, Palette, Code, Headphones, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Process = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "Consult",
      description: "We start by understanding your business goals, challenges, and requirements through detailed discovery sessions.",
      details: [
        "Needs assessment and consultation",
        "Goal setting and analysis",
        "Project scope and timeline"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Palette,
      title: "Design",
      description: "Our team creates comprehensive solutions tailored to your specific needs, ensuring scalability and user experience.",
      details: [
        "Solution architecture and design",
        "User experience planning",
        "Technical specifications"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Code,
      title: "Implement",
      description: "We bring your vision to life with agile development practices, regular updates, and quality assurance.",
      details: [
        "Agile development and delivery",
        "Quality assurance and testing",
        "Deployment and go-live"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Headphones,
      title: "Support",
      description: "Ongoing maintenance, monitoring, and optimization to ensure your systems run smoothly and evolve with your business.",
      details: [
        "24/7 monitoring and maintenance",
        "Regular updates and security",
        "Performance optimization"
      ],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How We <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Our proven methodology ensures successful project delivery from concept to completion
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-border to-border/50 transform translate-x-4 z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  </div>
                )}
                
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 animate-fade-up group h-full">
                  <CardContent className="p-6 text-center">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-background font-bold text-sm z-10">
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className={`mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:animate-pulse-glow transition-all duration-300`}>
                      <step.icon className="w-8 h-8 text-background" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Detailed Process Flow */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 animate-fade-up">
            <h3 className="text-2xl font-bold text-center mb-8 text-primary">
              Our Detailed Process
            </h3>
            
            <div className="space-y-6">
              {steps.map((step, stepIndex) => (
                <div key={stepIndex} className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Step Header */}
                  <div className="flex items-center space-x-4 lg:w-1/4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                      <step.icon className="w-6 h-6 text-background" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{step.title}</h4>
                      <p className="text-sm text-foreground/60">Step {stepIndex + 1}</p>
                    </div>
                  </div>
                  
                  {/* Step Details */}
                  <div className="lg:w-3/4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-foreground/80 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 animate-fade-up">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
                Let's discuss your project and see how our proven process can help you achieve your goals.
              </p>
              <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-background font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
