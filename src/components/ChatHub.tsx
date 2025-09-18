import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  MessageSquare, 
  Users, 
  Bot,
  ArrowLeft,
  Paperclip,
  Search
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'user' | 'ai';
  avatar?: string;
}

interface ChatHubProps {
  user: {
    name: string;
    email: string;
    employeeId: string;
  };
  onBack: () => void;
}

export default function ChatHub({ user, onBack }: ChatHubProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "KMRL AI Assistant",
      content: "Hello! I'm here to help you with document analysis, project insights, and team collaboration. How can I assist you today?",
      timestamp: new Date(Date.now() - 300000),
      type: 'ai'
    },
    {
      id: "2",
      sender: "Rahul Mehta",
      content: "Has anyone reviewed the new safety protocols document? We need to implement the changes by next week.",
      timestamp: new Date(Date.now() - 240000),
      type: 'user',
      avatar: "RM"
    },
    {
      id: "3",
      sender: "Dr. Sarah Kumar",
      content: "I've analyzed it. The AI summary suggests 3 critical action items that need immediate attention.",
      timestamp: new Date(Date.now() - 180000),
      type: 'user',
      avatar: "SK"
    },
    {
      id: "4",
      sender: "KMRL AI Assistant",
      content: "Based on the safety protocols document, here are the key priorities:\n\n1. Update emergency evacuation procedures\n2. Install additional safety barriers at Platform 3\n3. Conduct staff training by January 20th\n\nWould you like me to create task assignments for these items?",
      timestamp: new Date(Date.now() - 120000),
      type: 'ai'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: user.name,
      content: newMessage,
      timestamp: new Date(),
      type: 'user',
      avatar: user.name.split(' ').map(n => n[0]).join('')
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "KMRL AI Assistant",
        content: "I understand your query. Let me analyze the relevant documents and provide you with the most accurate information. Based on current data patterns, here are my recommendations...",
        timestamp: new Date(),
        type: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const onlineUsers = [
    { name: "Rahul Mehta", status: "online", avatar: "RM" },
    { name: "Priya Nair", status: "online", avatar: "PN" },
    { name: "Arjun Krishnan", status: "away", avatar: "AK" },
    { name: "Maya Pillai", status: "online", avatar: "MP" }
  ];

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
                <MessageSquare className="w-5 h-5 text-primary" />
                <div>
                  <h1 className="font-semibold">Collaboration Hub</h1>
                  <p className="text-xs text-muted-foreground">Real-time team communication</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="btn-glass">
                <Search className="w-4 h-4 mr-2" />
                Search Chat
              </Button>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                <Users className="w-3 h-3 mr-1" />
                {onlineUsers.filter(u => u.status === 'online').length} online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Online Users Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass h-full">
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Team Members</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {onlineUsers.map((user, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${
                        user.status === 'online' ? 'bg-emerald-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user.status}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="glass h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5" />
                      <span>General Discussion</span>
                    </CardTitle>
                    <CardDescription>
                      Collaborate with your team and AI assistant
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 border-primary/20">
                    <Bot className="w-3 h-3 mr-1" />
                    AI Enabled
                  </Badge>
                </div>
              </CardHeader>
              
              {/* Messages Area */}
              <CardContent className="flex-1 overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 pr-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex space-x-3 ${message.type === 'ai' ? 'bg-primary/5 p-3 rounded-lg' : ''}`}
                      >
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className={`text-xs ${
                            message.type === 'ai' 
                              ? 'bg-gradient-primary text-primary-foreground' 
                              : 'bg-secondary text-secondary-foreground'
                          }`}>
                            {message.type === 'ai' ? <Bot className="w-4 h-4" /> : message.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-sm font-medium">{message.sender}</p>
                            <p className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                            {message.type === 'ai' && (
                              <Badge variant="secondary" className="text-xs">AI</Badge>
                            )}
                          </div>
                          <div className="message-bubble">
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">
                              {message.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex space-x-3 bg-primary/5 p-3 rounded-lg">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                            <Bot className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">KMRL AI Assistant</p>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <span className="text-xs text-muted-foreground ml-2">AI is typing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Message Input */}
                  <div className="border-t border-border/50 pt-4 mt-4">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <Button type="button" variant="outline" size="sm" className="flex-shrink-0">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message or ask the AI assistant..."
                        className="flex-1 bg-input/50 border-border/50 focus:border-primary/50"
                      />
                      <Button 
                        type="submit" 
                        className="btn-hero flex-shrink-0"
                        disabled={!newMessage.trim() || isTyping}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}