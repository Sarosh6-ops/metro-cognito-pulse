import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Upload, FileText, Image, FileSpreadsheet, CheckCircle } from "lucide-react";

interface UploadModalProps {
  onClose: () => void;
  onUpload: (file: File) => void;
}

export default function UploadModal({ onClose, onUpload }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      onUpload(uploadedFile);
      setIsUploading(false);
    }, 1500);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) return Image;
    if (fileType.includes('spreadsheet') || fileType.includes('excel')) return FileSpreadsheet;
    return FileText;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 fade-in">
      <Card className="w-full max-w-lg glass slide-in-right">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Upload Document</CardTitle>
              <CardDescription>
                Upload your document for AI-powered analysis and insights
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!uploadedFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-primary bg-primary/5 scale-105' 
                  : 'border-border hover:border-primary/50 hover:bg-primary/5'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Drop your files here</h3>
              <p className="text-muted-foreground mb-4">
                or click to browse from your computer
              </p>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="btn-hero"
              >
                Choose Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.xlsx,.xls"
              />
              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, XLS, XLSX
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-secondary rounded-lg">
                {React.createElement(getFileIcon(uploadedFile.type), { 
                  className: "w-8 h-8 text-primary" 
                })}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{uploadedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(uploadedFile.size)} • {uploadedFile.type}
                  </p>
                </div>
                {!isUploading && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setUploadedFile(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              {isUploading ? (
                <div className="text-center space-y-4">
                  <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-muted-foreground">
                    Processing your document with AI...
                  </p>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleUpload}
                    className="flex-1 btn-hero"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload & Analyze
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setUploadedFile(null)}
                    className="btn-glass"
                  >
                    Change File
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">What happens next?</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• AI extracts and analyzes document content</li>
                  <li>• Generates intelligent insights and summaries</li>
                  <li>• Identifies action items and alerts</li>
                  <li>• Makes document searchable across the platform</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}