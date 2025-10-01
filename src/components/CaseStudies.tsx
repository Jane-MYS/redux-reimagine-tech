import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const CaseStudies = () => {
  const studies = [
    {
      title: "E-Commerce Website Redesign",
      client: "Local Retail Business",
      description: "Transformed an outdated website into a modern, mobile-responsive e-commerce platform.",
      results: [
        "150% increase in online sales",
        "Mobile traffic up 200%",
        "Page load time reduced by 60%",
      ],
    },
    {
      title: "Workflow Automation Implementation",
      client: "Tech Startup",
      description: "Automated client onboarding process using CRM integration and custom workflows.",
      results: [
        "Saved 20 hours/week in manual work",
        "Reduced onboarding time by 50%",
        "Improved client satisfaction scores",
      ],
    },
    {
      title: "Home Office Network Setup",
      client: "Remote Professional",
      description: "Designed and implemented secure, high-performance home network infrastructure.",
      results: [
        "Zero connection drops",
        "50% faster file transfers",
        "Enterprise-grade security",
      ],
    },
  ];

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Success <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Real results from real clients who trusted us to transform their tech
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {studies.map((study, index) => (
            <Card
              key={index}
              className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="text-sm text-primary font-semibold mb-2">{study.client}</div>
                <CardTitle className="text-2xl mb-2">{study.title}</CardTitle>
                <CardDescription className="text-foreground/70">
                  {study.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-secondary mb-3">Key Results:</p>
                  {study.results.map((result, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{result}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
