import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Message } from './types';
import { TrendingUp, Loader2, Sparkles, AlertTriangle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const WELCOME_MESSAGE: Message = {
  id: 'welcome-msg',
  sender: 'assistant',
  content: `Namaste! I am your **India Equity Financial Research Assistant**.

I am connected to real-time tools for Indian market data on the NSE:
- 📈 **Current Stock Market Data:** Fetch live stock prices, high/low & volume.
- 📜 **Historical Performance:** Calculate CAGR returns for 1mo, 3mo, 6mo, 1y, 2y, 5y.
- 🏢 **Company Fundamentals:** Valuation metrics, Market Cap, P/E, 52-week ranges & margins.
- 📰 **Live Financial News Search:** Retrieve latest announcements & developments with source references.

How can I help you research Indian equities today? Try one of the suggested prompts in the sidebar!`,
  timestamp: new Date(),
};

export function App() {
  const [sessionId, setSessionId] = useState<string>(() => {
    const saved = localStorage.getItem('finance_agent_session_id');
    if (saved) return saved;
    const newId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('finance_agent_session_id', newId);
    return newId;
  });

  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleNewChat = () => {
    const newId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('finance_agent_session_id', newId);
    setSessionId(newId);
    setMessages([WELCOME_MESSAGE]);
    setError(null);
  };

  const handleSendMessage = async (text: string) => {
    setError(null);

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Server Error' }));
        throw new Error(errorData.detail || `HTTP ${response.status}: Failed to fetch response`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: data.reply || 'No response returned.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat API Error:', err);
      const errorMessage = err.message || 'Failed to connect to backend server. Make sure the FastAPI server is running.';
      setError(errorMessage);

      const errorMsgObj: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: errorMessage,
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMsgObj]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectPrompt={handleSendMessage}
      />

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        <Header
          onNewChat={handleNewChat}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          isSidebarOpen={isSidebarOpen}
          isLoading={isLoading}
        />

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="max-w-4xl mx-auto divide-y divide-slate-800/40">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="p-4 sm:p-5 bg-slate-900/90 border-y border-slate-800/60 flex items-start gap-3 sm:gap-4 animate-pulse">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Analyzing Indian Equities & Running Tools...
                    </span>
                  </div>
                  <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse-subtle"></div>
                  <div className="h-4 bg-slate-800/60 rounded w-1/2 animate-pulse-subtle"></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Fixed Input Bar */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          error={error}
          onClearError={() => setError(null)}
        />
      </div>
    </div>
  );
}

export default App;
