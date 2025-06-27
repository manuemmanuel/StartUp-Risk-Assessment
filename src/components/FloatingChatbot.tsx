'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your startup risk assessment assistant. I can see what\'s on your screen and help you with your current task. How can I help you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Function to get current page context
  const getPageContext = () => {
    try {
      // Get the main content area
      const mainContent = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
      
      // Get page title
      const pageTitle = document.title;
      
      // Get current URL path
      const currentPath = window.location.pathname;
      
      // Get visible text content (excluding the chatbot itself)
      const chatbotElement = document.querySelector('[data-chatbot]');
      const allTextElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, li, td, th, label, input[placeholder], textarea[placeholder]'))
        .filter(el => {
          // Exclude the chatbot and its children
          if (chatbotElement && chatbotElement.contains(el)) return false;
          
          // Only include visible elements
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        })
        .map(el => el.textContent?.trim())
        .filter(text => text && text.length > 0)
        .slice(0, 20); // Limit to first 20 elements to avoid too much context
      
      // Get form data if on a form page
      const formData: Record<string, any> = {};
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        const formElements = form.querySelectorAll('input, select, textarea');
        formElements.forEach(element => {
          const input = element as HTMLInputElement;
          if (input.name || input.id) {
            const key = input.name || input.id;
            if (input.type === 'checkbox' || input.type === 'radio') {
              formData[key] = input.checked ? input.value : '';
            } else {
              formData[key] = input.value;
            }
          }
        });
      });

      // Get table data if present
      const tables = document.querySelectorAll('table');
      const tableData: string[] = [];
      tables.forEach(table => {
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
          const cells = row.querySelectorAll('td, th');
          const rowData = Array.from(cells).map(cell => cell.textContent?.trim()).filter(Boolean).join(' | ');
          if (rowData) tableData.push(rowData);
        });
      });

      return {
        pageTitle,
        currentPath,
        visibleText: allTextElements.join('\n'),
        formData: Object.keys(formData).length > 0 ? formData : null,
        tableData: tableData.length > 0 ? tableData : null,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting page context:', error);
      return null;
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get current page context
      const pageContext = getPageContext();
      
      // Call Gemini 2.0 Flash API with context
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          history: messages.map(m => ({
            role: m.isUser ? 'user' : 'assistant',
            content: m.text
          })),
          context: pageContext
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMaximized(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 flex items-center justify-center"
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)'
        }}
        aria-label="Open chat"
        data-chatbot="button"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed rounded-lg shadow-xl z-50 flex flex-col transition-all duration-300 ${
            isMaximized 
              ? 'inset-0 m-0' 
              : 'bottom-24 right-6 w-96 h-[500px]'
          }`}
          style={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)'
          }}
          data-chatbot="window"
        >
          {/* Header */}
          <div 
            className="p-4 rounded-t-lg flex items-center justify-between"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)'
            }}
          >
            <div>
              <h3 className="font-semibold">Startup Risk Assessment Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMaximize}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                title={isMaximized ? "Minimize" : "Maximize"}
              >
                {isMaximized ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
              <button
                onClick={closeChat}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                title="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${isMaximized ? 'max-h-[calc(100vh-140px)]' : ''}`}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-lg ${isMaximized ? 'max-w-[60%]' : 'max-w-[80%]'}`}
                  style={{
                    backgroundColor: message.isUser 
                      ? 'var(--primary)' 
                      : 'var(--secondary)',
                    color: message.isUser 
                      ? 'var(--primary-foreground)' 
                      : 'var(--secondary-foreground)'
                  }}
                >
                  {message.isUser ? (
                    <p className="text-sm">{message.text}</p>
                  ) : (
                    <div className="text-sm prose prose-sm max-w-none" style={{ color: 'var(--secondary-foreground)' }}>
                      <ReactMarkdown
                        components={{
                          h1: ({children}) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                          h2: ({children}) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                          h3: ({children}) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                          p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({children}) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                          ol: ({children}) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                          li: ({children}) => <li className="text-sm">{children}</li>,
                          strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                          em: ({children}) => <em className="italic">{children}</em>,
                          code: ({children}) => (
                            <code className="bg-black/10 px-1 py-0.5 rounded text-xs font-mono">
                              {children}
                            </code>
                          ),
                          pre: ({children}) => (
                            <pre className="bg-black/10 p-2 rounded text-xs font-mono overflow-x-auto mb-2">
                              {children}
                            </pre>
                          ),
                          blockquote: ({children}) => (
                            <blockquote className="border-l-4 border-current pl-2 italic mb-2">
                              {children}
                            </blockquote>
                          ),
                          a: ({children, href}) => (
                            <a 
                              href={href} 
                              className="text-blue-500 underline hover:text-blue-600"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div 
                  className={`p-3 rounded-lg ${isMaximized ? 'max-w-[60%]' : 'max-w-[80%]'}`}
                  style={{
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--secondary-foreground)'
                  }}
                >
                  <div className="flex space-x-1">
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: 'var(--secondary-foreground)' }}
                    ></div>
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce" 
                      style={{ 
                        backgroundColor: 'var(--secondary-foreground)',
                        animationDelay: '0.1s' 
                      }}
                    ></div>
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce" 
                      style={{ 
                        backgroundColor: 'var(--secondary-foreground)',
                        animationDelay: '0.2s' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div 
            className="p-4 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-colors"
                style={{
                  backgroundColor: 'var(--input)',
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)'
                }}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)'
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 