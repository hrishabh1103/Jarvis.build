import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isBot, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-4 ${isBot ? 'bg-gray-700/50' : 'bg-gray-800'} p-4 rounded-lg`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
      }`}>
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-white">{isBot ? 'Genius AI' : 'You'}</span>
          <span className="text-xs text-gray-400">{timestamp}</span>
        </div>
        <p className="text-gray-300 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}