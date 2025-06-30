import React, { useState, useEffect } from 'react';
import { Send, Loader2, MessageSquare, Sparkles } from 'lucide-react';
import { openaiService } from '../utils/openai';

export default function ChatBox() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  // Allow external components to autofill a question
  useEffect(() => {
    const handleFillQuestion = (event: CustomEvent) => {
      setPrompt(event.detail);
    };

    window.addEventListener('fillQuestion', handleFillQuestion as EventListener);
    return () => window.removeEventListener('fillQuestion', handleFillQuestion as EventListener);
  }, []);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    const userMessage = prompt;
    setPrompt('');

    // Add user message to chat
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    try {
      const reply = await openaiService.chatLikeGPT(userMessage);

      // Add assistant response to chat
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={16} className="text-emerald-600" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={16} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Sparkles size={16} className="text-emerald-600" />
              </div>
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                <div className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-emerald-600" />
                  <span className="text-sm text-gray-600">VueBot is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleAsk} className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask VueBot about nutrition, meals, or wellness..."
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </form>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          VueBot can help with meal recommendations, nutrition advice, and wellness tips.
        </p>
      </div>
    </div>
  );
}
