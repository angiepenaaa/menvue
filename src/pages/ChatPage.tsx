import React from 'react';
import ChatBox from '../components/ChatBox';
import Header from '../components/Header';

const ChatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-emerald-50/50 to-transparent rounded-2xl p-6">
          <div className="relative">
            <div className="w-1 h-8 bg-emerald-500 absolute -left-6 top-1/2 -translate-y-1/2 rounded-r-full" />
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">VueBot AI Assistant</h1>
            </div>
            <p className="text-gray-600">Your personal wellness and food assistant for healthy meal recommendations</p>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Ask VueBot</h2>
              <p className="text-gray-600 text-sm">
                Get personalized nutrition advice, meal recommendations, and wellness tips tailored to your fitness journey.
              </p>
            </div>
            
            {/* Suggested Questions */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Try asking:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "What's a healthy post-workout meal?",
                  "Suggest a low-calorie lunch option",
                  "What foods help with muscle recovery?",
                  "Best breakfast for weight loss?"
                ].map((question, index) => (
                  <button
                    key={index}
                    className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                    onClick={() => {
                      // You can add functionality to auto-fill the question
                      const event = new CustomEvent('fillQuestion', { detail: question });
                      window.dispatchEvent(event);
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;