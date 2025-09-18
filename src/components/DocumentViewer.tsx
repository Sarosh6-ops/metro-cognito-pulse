import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  FileText, 
  Brain, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar,
  Download,
  Share2,
  MessageSquare
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: 'processing' | 'completed' | 'error';
  aiInsights?: {
    summary: string;
    actionItems: string[];
    alerts: string[];
  };
}

interface DocumentViewerProps {
  document: Document;
  onBack: () => void;
}

export default function DocumentViewer({ document, onBack }: DocumentViewerProps) {
  const mockDocumentContent = `
    KOCHI METRO RAIL LIMITED
    QUARTERLY MAINTENANCE REPORT - Q4 2023
    
    EXECUTIVE SUMMARY
    This report presents the comprehensive maintenance activities and system performance metrics for all KMRL operations during Q4 2023. The quarter demonstrated exceptional operational excellence with 98.7% system uptime across all metro lines.
    
    KEY PERFORMANCE INDICATORS
    • Total Operational Hours: 4,380 hours
    • System Uptime: 98.7%
    • Passenger Journeys: 12.4 million
    • Average Daily Ridership: 135,000
    • On-Time Performance: 99.2%
    
    MAINTENANCE ACTIVITIES
    1. Preventive Maintenance
       - Rolling Stock: 156 maintenance cycles completed
       - Track Systems: All 34.4 km inspected and maintained
       - Power Systems: 98% components within optimal parameters
       - Station Infrastructure: 22 stations fully serviced
    
    2. Corrective Maintenance
       - Minor Electrical Issues: 12 incidents resolved
       - Escalator Maintenance: 3 units required attention
       - HVAC Systems: 5 units serviced
       - Fire Safety Systems: All systems tested and certified
    
    SAFETY & COMPLIANCE
    All maintenance activities conducted in compliance with RDSO guidelines and international metro safety standards. Zero safety incidents reported during maintenance operations.
    
    UPCOMING PRIORITIES
    • Escalator #12 at Aluva station requires replacement of drive motor
    • Line 2 electrical systems scheduled for comprehensive upgrade
    • New predictive maintenance systems to be deployed in Q1 2024
  `;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="hover:bg-secondary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <h1 className="font-semibold truncate max-w-md">{document.name}</h1>
                  <p className="text-xs text-muted-foreground">
                    Uploaded {new Date(document.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="btn-glass">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="btn-glass">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="btn-glass">
                <MessageSquare className="w-4 h-4 mr-2" />
                Discuss
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Content Panel */}
          <div className="lg:col-span-2">
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Document Content</span>
                  </CardTitle>
                  <Badge variant="secondary">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(document.uploadedAt).toLocaleDateString()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/50 rounded-lg p-6 max-h-[800px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
                    {mockDocumentContent}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights Panel */}
          <div className="space-y-6">
            {document.aiInsights ? (
              <>
                {/* AI Summary */}
                <Card className="ai-insights">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-primary" />
                      <span>AI Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">
                      {document.aiInsights.summary}
                    </p>
                  </CardContent>
                </Card>

                {/* Action Items */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span>Action Items</span>
                    </CardTitle>
                    <CardDescription>
                      Key tasks identified by AI analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {document.aiInsights.actionItems.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-secondary/50 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                            <span className="text-xs font-medium text-emerald-600">
                              {index + 1}
                            </span>
                          </div>
                          <p className="text-sm flex-1">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Alerts */}
                {document.aiInsights.alerts.length > 0 && (
                  <Card className="border-destructive/30 bg-destructive/5">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        <span>Critical Alerts</span>
                      </CardTitle>
                      <CardDescription>
                        Issues requiring immediate attention
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {document.aiInsights.alerts.map((alert, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                            <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                            <p className="text-sm flex-1">{alert}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* AI Processing Info */}
                <Card className="glass">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <Brain className="w-8 h-8 text-primary mx-auto" />
                      <p className="text-sm font-medium">AI Analysis Complete</p>
                      <p className="text-xs text-muted-foreground">
                        Processed with KMRL Intelligent Document Analysis
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="glass">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
                    <div>
                      <p className="text-sm font-medium">AI Analysis in Progress</p>
                      <p className="text-xs text-muted-foreground">
                        Processing document content and generating insights...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}