import { ArrowRight, Shield, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-accent-foreground text-sm">
              <Zap className="h-4 w-4" />
              <span>AI-Powered Detection</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Early Detection of{" "}
              <span className="gradient-text">Alzheimer's</span> with AI
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Upload MRI brain scans and receive instant, accurate predictions of
              Alzheimer's disease stages using our advanced CNN-based deep learning
              model.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="gradient-primary hover:opacity-90 transition-all hover:scale-105 group"
              >
                Upload MRI Scan
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-accent"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
              <p className="text-3xl font-bold gradient-text">80%+</p>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">4</p>
                <p className="text-sm text-muted-foreground">Detection Stages</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">&lt;5s</p>
                <p className="text-sm text-muted-foreground">Analysis Time</p>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Main brain illustration */}
              <div className="absolute inset-0 gradient-primary rounded-full opacity-20 animate-pulse" />
              <div className="absolute inset-4 bg-card rounded-full shadow-elevated flex items-center justify-center">
                <Brain className="h-32 w-32 lg:h-40 lg:w-40 text-primary" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 p-4 bg-card rounded-2xl shadow-card animate-bounce">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <div className="absolute -bottom-4 -left-4 p-4 bg-card rounded-2xl shadow-card">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                  <span className="text-sm font-medium">AI Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
