import { Brain, Cpu, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Deep Learning CNN",
    description:
      "Advanced Convolutional Neural Network trained on thousands of MRI scans for accurate detection.",
  },
  {
    icon: Cpu,
    title: "Fast Processing",
    description:
      "Get results in seconds with our optimized AI pipeline and cloud infrastructure.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your medical data is encrypted and processed securely. We never store your images.",
  },
  {
    icon: Clock,
    title: "Early Detection",
    description:
      "Identify early signs of Alzheimer's disease to enable timely intervention and care.",
  },
];

const stages = [
  {
    name: "Non Demented",
    description: "No signs of cognitive decline",
    color: "bg-secondary",
  },
  {
    name: "Very Mild",
    description: "Minor memory lapses, early stage",
    color: "bg-yellow-500",
  },
  {
    name: "Mild",
    description: "Noticeable cognitive difficulties",
    color: "bg-orange-500",
  },
  {
    name: "Moderate",
    description: "Significant impairment requiring care",
    color: "bg-destructive",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        {/* Features Grid */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">NeuroDetect</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered system combines cutting-edge deep learning with medical
            expertise to provide reliable Alzheimer's detection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow group"
            >
              <div className="p-3 rounded-xl bg-accent w-fit mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Detection Stages */}
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Detection Stages
            </h3>
            <p className="text-muted-foreground">
              Our model classifies MRI scans into four distinct stages of
              cognitive health.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {stages.map((stage, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-4 h-4 rounded-full ${stage.color} mx-auto mb-4`}
                />
                <h4 className="font-bold text-foreground mb-2">{stage.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
