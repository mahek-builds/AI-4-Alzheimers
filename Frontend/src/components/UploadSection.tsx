import { useState, useCallback } from "react";
import { Upload, Image, X, Camera, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadedFile {
  file: File;
  preview: string;
}

interface UploadSectionProps {
  onAnalyze: (file: File) => void;
}

const UploadSection = ({ onAnalyze }: UploadSectionProps) => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const preview = URL.createObjectURL(file);
    setUploadedFile({ file, preview });
  };

  const removeFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.preview);
      setUploadedFile(null);
    }
  };

  const handleAnalyze = () => {
    if (uploadedFile) {
      onAnalyze(uploadedFile.file);
    }
  };

  return (
    <section id="upload" className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upload Your <span className="gradient-text">MRI Scan</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simply upload a brain MRI image and our AI will analyze it to predict
            the Alzheimer's disease stage with high accuracy.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!uploadedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 bg-card",
                isDragging
                  ? "border-primary bg-accent scale-[1.02]"
                  : "border-border hover:border-primary/50"
              )}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="p-4 rounded-full bg-accent">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">
                    Drag & drop your MRI image here
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    or click to browse files
                  </p>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" className="gap-2">
                    <FileImage className="h-4 w-4" />
                    Choose File
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Use Camera
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Supported formats: JPG, PNG, DICOM • Max size: 10MB
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-muted">
                  <img
                    src={uploadedFile.preview}
                    alt="MRI Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        {uploadedFile.file.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={removeFile}
                      className="p-2 rounded-full hover:bg-muted transition-colors"
                    >
                      <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-sm text-secondary">
                    <Image className="h-4 w-4" />
                    <span>Ready for analysis</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={!uploadedFile}
            size="lg"
            className={cn(
              "w-full mt-6 transition-all duration-300",
              uploadedFile
                ? "gradient-primary hover:opacity-90 hover:scale-[1.02]"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            Analyze MRI Scan
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
