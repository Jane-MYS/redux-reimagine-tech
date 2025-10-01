import { Layers, TrendingUp, Settings, Wifi, Sparkles, Wrench, ArrowRight, CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Services = () => {
  const services = [
    {
      icon: Layers,
      title: "Web & App Development",
      description: "Modern, responsive websites and custom applications designed to showcase your brand and scale with your business.",
      details: [
        "Custom website design and development",
        "Mobile-first responsive applications",
        "E-commerce platforms and online stores",
        "Progressive Web Apps (PWAs)",
        "API development and integration",
        "Performance optimization and SEO"
      ],
      features: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL"]
    },
    {
      icon: TrendingUp,
      title: "Project Management Consulting",
      description: "Expert guidance to streamline operations, implement best practices, and drive projects from strategy to successful delivery.",
      details: [
        "Agile and Scrum methodology implementation",
        "Project planning and roadmap development",
        "Team training and process optimization",
        "Risk assessment and mitigation strategies",
        "Quality assurance and testing frameworks",
        "Stakeholder communication and reporting"
      ],
      features: ["Agile", "Scrum", "Kanban", "Jira", "Confluence", "Slack"]
    },
    {
      icon: Settings,
      title: "Business Systems Integration & Automation",
      description: "Design and connect CRMs, cloud platforms, and workflow tools to create seamless, automated business processes that save time and reduce errors.",
      details: [
        "CRM and ERP system integration",
        "Workflow automation and optimization",
        "Data migration and synchronization",
        "Cloud platform setup and configuration",
        "API development and third-party integrations",
        "Business process documentation and training"
      ],
      features: ["Salesforce", "HubSpot", "Zapier", "AWS", "Azure", "Google Cloud"]
    },
    {
      icon: Wifi,
      title: "Home Network & Tech Infrastructure",
      description: "Reliable, secure, and high-performance networks for home offices and personal environments, ensuring smooth connectivity and data safety.",
      details: [
        "Home network design and setup",
        "Wi-Fi optimization and coverage analysis",
        "Network security and firewall configuration",
        "Smart home device integration",
        "Backup and disaster recovery solutions",
        "Remote access and VPN setup"
      ],
      features: ["Ubiquiti", "Cisco", "TP-Link", "OpenVPN", "Plex", "Home Assistant"]
    },
    {
      icon: Sparkles,
      title: "AI Integration & Innovation",
      description: "Harness artificial intelligence to automate repetitive tasks, enhance decision-making, and improve customer experiences through smart tools and solutions.",
      details: [
        "AI chatbot and virtual assistant development",
        "Machine learning model implementation",
        "Natural language processing solutions",
        "Computer vision and image recognition",
        "Predictive analytics and business intelligence",
        "AI-powered workflow automation"
      ],
      features: ["OpenAI", "TensorFlow", "PyTorch", "LangChain", "Hugging Face", "Azure AI"]
    },
    {
      icon: Wrench,
      title: "Software Solutions & Support",
      description: "Custom software builds, app integrations, and hands-on support to keep your technology ecosystem efficient and future-ready.",
      details: [
        "Custom software development",
        "Legacy system modernization",
        "Database design and optimization",
        "Cloud migration and deployment",
        "Technical support and maintenance",
        "Code review and quality assurance"
      ],
      features: ["Python", "Java", "C#", "Docker", "Kubernetes", "Git"]
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

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {services.map((service, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 animate-fade-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="px-6 py-6 hover:no-underline group-hover:bg-gradient-to-r group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-300">
                  <div className="flex items-center space-x-4 text-left">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:animate-pulse-glow transition-all duration-300 flex-shrink-0">
                      <service.icon className="w-6 h-6 text-background" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-foreground/70 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6">
                    {/* Service Details */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-primary flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        What We Deliver
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start space-x-2">
                            <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-foreground/80 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies & Tools */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-secondary flex items-center">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Technologies & Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <span 
                            key={featureIndex}
                            className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full text-sm font-medium text-foreground/80 hover:from-primary/20 hover:to-secondary/20 transition-all duration-200"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="pt-4 border-t border-border/30">
                      <button className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-background font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Services;
