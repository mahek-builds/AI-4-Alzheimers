import { useState, useEffect } from "react";
import { RefreshCw, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  prediction: {
    stage: string;
    confidence: number;
    description: string;
  } | null;
  isLoading: boolean;
  onReset: () => void;
}

const stageColors: Record<string, string> = {
  "Non Demented": "text-secondary",
  "Very Mild": "text-yellow-500",
  "Mild": "text-orange-500",
  "Moderate": "text-destructive",
};

const stageIcons: Record<string, typeof CheckCircle2> = {
  "Non Demented": CheckCircle2,
  "Very Mild": AlertCircle,
  "Mild": AlertCircle,
  "Moderate": AlertCircle,
};

const ResultCard = ({ prediction, isLoading, onReset }: ResultCardProps) => {
  const [animatedConfidence, setAnimatedConfidence] = useState(0);

  useEffect(() => {
    if (prediction) {
      const timer = setTimeout(() => {
        setAnimatedConfidence(prediction.confidence);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [prediction]);

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-elevated text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-muted" />
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analyzing MRI Scan</h3>
              <p className="text-muted-foreground">
                Please wait while our AI processes your image...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!prediction) return null;

  const StageIcon = stageIcons[prediction.stage] || AlertCircle;
  const stageColor = stageColors[prediction.stage] || "text-primary";

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-elevated">
            {/* Header */}
            <div className="text-center mb-8">
              <div
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4",
                  prediction.stage === "Non Demented"
                    ? "bg-secondary/10"
                    : "bg-destructive/10"
                )}
              >
                <StageIcon className={cn("h-5 w-5", stageColor)} />
                <span className={cn("font-medium", stageColor)}>
                  Analysis Complete
                </span>
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Prediction Result
              </h3>
            </div>

            {/* Stage */}
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground mb-2">
                Detected Stage
              </p>
              <p className={cn("text-3xl font-bold", stageColor)}>
                {prediction.stage}
              </p>
            </div>

            {/* Confidence Circle */}
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${animatedConfidence * 3.52} 352`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="hsl(213, 77%, 53%)" />
                      <stop offset="100%" stopColor="hsl(168, 100%, 37%)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">
                    {animatedConfidence}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Confidence
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-center text-muted-foreground mb-8">
              {prediction.description}
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={onReset}
                variant="outline"
                className="flex-1 gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Analyze Again
              </Button>
              <Button className="flex-1 gap-2 gradient-primary hover:opacity-90">
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultCard;
