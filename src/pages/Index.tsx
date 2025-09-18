import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import Dashboard from "@/components/Dashboard";
import ChatHub from "@/components/ChatHub";

interface User {
  name: string;
  email: string;
  employeeId: string;
}

type AppState = 'login' | 'dashboard' | 'chat';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('login');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentState('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentState('login');
  };

  const handleNavigateToChat = () => {
    setCurrentState('chat');
  };

  const handleBackToDashboard = () => {
    setCurrentState('dashboard');
  };

  if (currentState === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentState === 'chat' && user) {
    return <ChatHub user={user} onBack={handleBackToDashboard} />;
  }

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} onNavigateToChat={handleNavigateToChat} />;
  }

  // Fallback
  return <LoginPage onLogin={handleLogin} />;
};

export default Index;
