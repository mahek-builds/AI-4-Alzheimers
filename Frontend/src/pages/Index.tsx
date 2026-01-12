import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import ResultCard from "@/components/ResultCard";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const predictions = [
  {
    stage: "Non Demented",
    confidence: 94,
    description:
      "The MRI scan shows no significant signs of Alzheimer's disease. Brain structure appears normal with healthy tissue patterns.",
  },
  {
    stage: "Very Mild",
    confidence: 87,
    description:
      "Early indicators suggest very mild cognitive decline. Minor changes detected that may warrant monitoring over time.",
  },
  {
    stage: "Mild",
    confidence: 91,
    description:
      "The scan indicates mild Alzheimer's disease. Noticeable changes in brain structure suggest consultation with a specialist.",
  },
  {
    stage: "Moderate",
    confidence: 89,
    description:
      "Significant indicators of moderate Alzheimer's detected. Professional medical evaluation and care planning recommended.",
  },
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<(typeof predictions)[0] | null>(null);

  const handleAnalyze = (file: File) => {
    setIsLoading(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      const randomPrediction =
        predictions[Math.floor(Math.random() * predictions.length)];
      setResult(randomPrediction);
      setIsLoading(false);
    }, 2500);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <UploadSection onAnalyze={handleAnalyze} />
      {(isLoading || result) && (
        <ResultCard
          prediction={result}
          isLoading={isLoading}
          onReset={handleReset}
        />
      )}
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
