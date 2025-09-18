import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Upload, 
  FileText, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  Search,
  Brain,
  Clock,
  TrendingUp,
  Users
} from "lucide-react";
import UploadModal from "./UploadModal";
import DocumentViewer from "./DocumentViewer";

interface DashboardProps {
  user: {
    name: string;
    email: string;
    employeeId: string;
  };
  onLogout: () => void;
  onNavigateToChat?: () => void;
}

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

export default function Dashboard({ user, onLogout, onNavigateToChat }: DashboardProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Metro Route Expansion Proposal.pdf",
      type: "pdf",
      uploadedAt: "2024-01-15T10:30:00Z",
      status: "completed",
      aiInsights: {
        summary: "Comprehensive proposal for expanding metro routes to cover 3 new districts with estimated budget of ₹2,400 crores.",
        actionItems: [
          "Environmental clearance required for Phase 2",
          "Stakeholder meeting scheduled for Jan 25th",
          "Budget approval needed from State Transport Ministry"
        ],
        alerts: [
          "Construction timeline conflicts with monsoon season",
          "Land acquisition delays may impact project timeline"
        ]
      }
    },
    {
      id: "2", 
      name: "Quarterly Maintenance Report Q4.docx",
      type: "docx",
      uploadedAt: "2024-01-14T14:20:00Z",
      status: "completed",
      aiInsights: {
        summary: "Q4 maintenance report showing 98.7% uptime across all metro lines with minor issues in electrical systems.",
        actionItems: [
          "Schedule preventive maintenance for Line 2 electrical systems",
          "Order replacement parts for escalator maintenance",
          "Update safety protocols based on recent findings"
        ],
        alerts: [
          "Escalator #12 at Aluva station requires immediate attention"
        ]
      }
    },
    {
      id: "3",
      name: "Vendor Invoice - TechCorp Solutions.jpg",
      type: "image",
      uploadedAt: "2024-01-13T09:15:00Z",
      status: "processing"
    }
  ]);

  const handleUploadComplete = (file: File) => {
    const newDoc: Document = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type.split('/')[1] || 'unknown',
      uploadedAt: new Date().toISOString(),
      status: 'processing'
    };
    
    setDocuments(prev => [newDoc, ...prev]);
    setShowUploadModal(false);
    
    // Simulate AI processing
    setTimeout(() => {
      setDocuments(prev => prev.map(doc => 
        doc.id === newDoc.id 
          ? { 
              ...doc, 
              status: 'completed' as const,
              aiInsights: {
                summary: "AI analysis completed successfully. Document processed and insights generated.",
                actionItems: ["Review AI-generated insights", "Share with relevant team members"],
                alerts: ["No critical issues detected"]
              }
            }
          : doc
      ));
    }, 3000);
  };

  const stats = [
    { label: "Documents Processed", value: "1,247", icon: FileText, change: "+12%" },
    { label: "Active Projects", value: "23", icon: BarChart3, change: "+3%" },
    { label: "Team Members", value: "156", icon: Users, change: "+8%" },
    { label: "AI Insights Generated", value: "3,891", icon: Brain, change: "+24%" }
  ];

  if (selectedDocument) {
    return (
      <DocumentViewer 
        document={selectedDocument} 
        onBack={() => setSelectedDocument(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                KMRL Synapse
              </h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Document Intelligence Platform
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onNavigateToChat}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.employeeId}</p>
                </div>
                <Avatar className="border-2 border-primary/20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 fade-in">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}!</h2>
          <p className="text-muted-foreground">Here's what's happening with your documents today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="glass document-card slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 text-emerald-500 mr-1" />
                      <span className="text-xs text-emerald-500">{stat.change}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Quick Actions</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => setShowUploadModal(true)}
              className="btn-hero px-8 py-6 text-lg"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Document
            </Button>
            <Button 
              variant="outline" 
              className="btn-glass px-6 py-6"
              onClick={onNavigateToChat}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Collaboration
            </Button>
            <Button variant="outline" className="btn-glass px-6 py-6">
              <BarChart3 className="w-5 h-5 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Recent Documents */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Documents</h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <Card 
                key={doc.id} 
                className="glass document-card cursor-pointer slide-in-right"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => doc.status === 'completed' && setSelectedDocument(doc)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base line-clamp-2">{doc.name}</CardTitle>
                      <CardDescription className="flex items-center mt-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={doc.status === 'completed' ? 'default' : doc.status === 'processing' ? 'secondary' : 'destructive'}
                      className="ml-2"
                    >
                      {doc.status === 'processing' && <Clock className="w-3 h-3 mr-1" />}
                      {doc.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                {doc.aiInsights && (
                  <CardContent className="pt-0">
                    <div className="ai-insights rounded-lg p-4 border">
                      <div className="flex items-center mb-2">
                        <Brain className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm font-medium">AI Insights</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {doc.aiInsights.summary}
                      </p>
                      {doc.aiInsights.alerts.length > 0 && (
                        <Badge variant="destructive" className="mt-2 text-xs">
                          {doc.aiInsights.alerts.length} Alert{doc.aiInsights.alerts.length > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                )}
                
                {doc.status === 'processing' && (
                  <CardContent className="pt-0">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                      <span>AI is analyzing your document...</span>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>

      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUploadComplete}
        />
      )}
    </div>
  );
}