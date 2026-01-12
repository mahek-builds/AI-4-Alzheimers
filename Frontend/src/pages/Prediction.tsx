import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Brain, LogOut, Upload, X, Loader2, ArrowLeft, AlertCircle, CheckCircle, Download, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveReport, generatePDF, Report } from "@/lib/reportService";

interface PredictionResult {
  prediction: string;
  confidence?: number;
  details?: string;
}

const Prediction = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      processFile(droppedFile);
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
  };

  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePredict = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please upload an MRI scan first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiUrl = "https://hirdeshds-ai-4-alzheimers.hf.space/predict";
      if (!apiUrl) {
        throw new Error("Prediction API URL not configured");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResult({
        prediction: data.prediction || data.result || "Unknown",
        confidence: data.confidence,
        details: data.details || data.description,
      });

      toast({
        title: "Analysis Complete",
        description: "Your MRI scan has been analyzed successfully.",
      });
    } catch (err: any) {
      const errorMessage = err.message || "Failed to analyze the scan. Please try again.";
      setError(errorMessage);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getResultColor = (prediction: string) => {
    const lower = prediction.toLowerCase();
    if (lower.includes("non") || lower.includes("normal") || lower.includes("healthy")) {
      return "text-secondary";
    } else if (lower.includes("mild")) {
      return "text-yellow-500";
    } else if (lower.includes("moderate") || lower.includes("severe")) {
      return "text-destructive";
    }
    return "text-primary";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl gradient-primary">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                AI for <span className="gradient-text">Alzheimer's</span>
              </span>
            </a>

            <div className="flex items-center gap-4">
              <span className="text-muted-foreground hidden sm:block">
                Welcome, <span className="text-foreground font-medium">{displayName}</span>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              MRI Scan <span className="gradient-text">Analysis</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload an MRI brain scan to detect potential signs of Alzheimer's disease.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border shadow-card">
            {/* Upload Area */}
            {!preview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Upload MRI Scan
                </h3>
                <p className="text-muted-foreground mb-6">
                  Drag and drop your MRI image here, or click to browse
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="gradient-primary hover:opacity-90 transition-opacity"
                >
                  Choose File
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Image Preview */}
                <div className="relative">
                  <img
                    src={preview}
                    alt="MRI Preview"
                    className="w-full max-h-96 object-contain rounded-xl bg-muted"
                  />
                  <button
                    onClick={removeFile}
                    className="absolute top-4 right-4 p-2 bg-background/80 rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* File Info */}
                <div className="flex items-center justify-between bg-muted rounded-lg px-4 py-3">
                  <span className="text-foreground font-medium truncate">
                    {file?.name}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {file && (file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>

                {/* Predict Button */}
                <Button
                  onClick={handlePredict}
                  disabled={loading}
                  className="w-full gradient-primary hover:opacity-90 transition-opacity py-6 text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Scan...
                    </>
                  ) : (
                    "Analyze MRI Scan"
                  )}
                </Button>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-destructive">Analysis Failed</h4>
                  <p className="text-destructive/80">{error}</p>
                </div>
              </div>
            )}

            {/* Result Display */}
            {result && (
              <div className="mt-6 p-6 bg-muted rounded-xl">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                  <h4 className="text-lg font-semibold text-foreground">
                    Analysis Complete
                  </h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-muted-foreground">Prediction:</span>
                    <p className={`text-2xl font-bold ${getResultColor(result.prediction)}`}>
                      {result.prediction}
                    </p>
                  </div>

                  {result.confidence !== undefined && (
                    <div>
                      <span className="text-muted-foreground">Confidence:</span>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex-1 h-3 bg-background rounded-full overflow-hidden">
                          <div
                            className="h-full gradient-primary transition-all duration-500"
                            style={{ width: `${result.confidence}%` }}
                          />
                        </div>
                        <span className="font-semibold text-foreground">
                          {result.confidence.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )}

                  {result.details && (
                    <div>
                      <span className="text-muted-foreground">Details:</span>
                      <p className="text-foreground mt-1">{result.details}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground italic">
                    Note: This AI prediction is meant to assist medical professionals and 
                    should not be used as a sole basis for diagnosis. Please consult with 
                    a qualified healthcare provider for clinical decisions.
                  </p>
                </div>

                {/* Report Actions */}
                <div className="mt-6 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => {
                      const report = saveReport({
                        userId: user?.email || 'anonymous',
                        fileName: file?.name || 'unknown',
                        prediction: result.prediction,
                        confidence: result.confidence,
                        details: result.details,
                        imagePreview: preview || undefined,
                      });
                      toast({
                        title: "Report Saved",
                        description: "Your analysis report has been saved successfully.",
                      });
                    }}
                  >
                    <Save className="h-4 w-4" />
                    Save Report
                  </Button>
                  <Button
                    className="flex-1 gap-2 gradient-primary hover:opacity-90"
                    onClick={() => {
                      const report: Report = {
                        id: crypto.randomUUID(),
                        userId: user?.email || 'anonymous',
                        fileName: file?.name || 'unknown',
                        prediction: result.prediction,
                        confidence: result.confidence,
                        details: result.details,
                        createdAt: new Date().toISOString(),
                      };
                      generatePDF(report);
                      toast({
                        title: "PDF Downloaded",
                        description: "Your report PDF has been downloaded.",
                      });
                    }}
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Prediction;
