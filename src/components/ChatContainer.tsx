import React, { useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import ChatMessage from './ChatMessage';
import LoadingDots from './LoadingDots';
import { Bot, Send, Sparkles, MessageSquare, Zap } from 'lucide-react';

const ChatContainer: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  } = useChat({
    api: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    onError: (err) => {
      console.error('Chat error:', err);
      
      // Try to parse the error response for more details
      if (err.message) {
        try {
          const errorData = JSON.parse(err.message);
          if (errorData.missingVariables) {
            console.error('Missing environment variables:', errorData.missingVariables);
            console.error('Instructions:', errorData.instructions);
          }
        } catch (parseError) {
          // Error message is not JSON, log as is
          console.error('Error details:', err.message);
        }
      }
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSubmit(e);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
  };

  const suggestedPrompts = [
    "What are the healthiest menu options under 500 calories?",
    "Help me plan a week of clean eating meals",
    "Find high-protein options for post-workout",
    "Show me Mediterranean diet-friendly meals"
  ];

  const handleSuggestedPrompt = (prompt: string) => {
    const syntheticEvent = {
      preventDefault: () => {},
      target: { value: prompt }
    } as any;
    
    handleInputChange({ target: { value: prompt } } as any);
    setTimeout(() => {
      handleSubmit(syntheticEvent);
    }, 100);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">menVue AI Assistant</h1>
              <p className="text-sm text-gray-400">Powered by Pica & OpenAI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
              <div className="text-center mb-12">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
                  <Bot size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Welcome to menVue AI</h2>
                <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
                  Your intelligent nutrition assistant. Ask me anything about healthy eating, meal planning, or menu recommendations.
                </p>
              </div>

              {/* Suggested Prompts */}
              <div className="w-full max-w-2xl">
                <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                  <MessageSquare size={16} />
                  Try asking me about:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedPrompt(prompt)}
                      className="text-left p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 hover:bg-gray-800 transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-3">
                        <Zap size={16} className="text-blue-400 mt-0.5 group-hover:text-blue-300" />
                        <span className="text-gray-300 group-hover:text-white text-sm leading-relaxed">
                          {prompt}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <ChatMessage key={message.id || `${message.role}-${index}`} message={message} />
              ))}

              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gray-700 flex items-center justify-center">
                    <Bot size={16} className="text-gray-600" />
                  </div>
                  <div className="bg-gray-800 text-gray-100 rounded-2xl rounded-bl-md border border-gray-700 px-4 py-3">
                    <LoadingDots />
                  </div>
                </div>
              )}

              {error && (
                <div className="max-w-2xl mx-auto">
                  <div className="bg-red-900/20 border border-red-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-red-400 mb-2">
                      <span className="font-medium">Error</span>
                    </div>
                    <div className="text-red-300 text-sm space-y-2">
                      <p>{error.message || 'Something went wrong. Please try again.'}</p>
                      {error.message && error.message.includes('Missing required environment variables') && (
                        <div className="mt-3 p-3 bg-red-900/30 rounded-lg border border-red-800">
                          <p className="font-medium text-red-200 mb-2">Setup Required:</p>
                          <p className="text-red-300 text-xs leading-relaxed">
                            The chat function requires API keys to be configured in your Supabase project. 
                            Please set the <code className="bg-red-800/50 px-1 rounded">OPENAI_API_KEY</code> and{' '}
                            <code className="bg-red-800/50 px-1 rounded">PICA_SECRET_KEY</code> environment variables 
                            in your Supabase project settings.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <form onSubmit={onSubmit} className="flex items-end gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={onInputChange}
                placeholder="Ask me about nutrition, meal planning, or healthy recipes..."
                disabled={isLoading}
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-2xl flex items-center justify-center transition-colors duration-200"
              aria-label="Send message"
            >
              <Send size={20} className="text-white" />
            </button>
          </form>
          
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              AI can make mistakes. Verify important nutrition information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;