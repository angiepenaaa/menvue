import React from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from 'ai';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gray-700 flex items-center justify-center">
          <Bot size={16} className="text-gray-600" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-md'
              : 'bg-gray-800 text-gray-100 rounded-bl-md border border-gray-700'
          }`}
        >
          <div className="prose prose-sm max-w-none">
            {message.content.split('\n').map((line, index) => (
              <p key={index} className={`${index === 0 ? 'mt-0' : 'mt-2'} ${isUser ? 'text-white' : 'text-gray-100'} leading-relaxed`}>
                {line}
              </p>
            ))}
          </div>
        </div>
        
        {/* Tool calls display */}
        {message.toolInvocations && message.toolInvocations.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.toolInvocations.map((toolInvocation, index) => (
              <div key={index} className="text-xs text-gray-400 bg-gray-800 border border-gray-700 rounded-lg p-2">
                <div className="font-medium mb-1">🔧 Tool: {toolInvocation.toolName}</div>
                {toolInvocation.state === 'result' && (
                  <div className="text-gray-300">
                    {typeof toolInvocation.result === 'string' 
                      ? toolInvocation.result 
                      : JSON.stringify(toolInvocation.result, null, 2)
                    }
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;