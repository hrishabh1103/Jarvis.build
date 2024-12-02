import React from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '../../types';

interface ChatHistoryProps {
  messages: Message[];
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 p-4">
      {messages.length === 0 ? (
        <div className="text-center text-gray-400 mt-8">
          <p className="text-lg font-medium">Welcome to Genius AI!</p>
          <p className="text-sm mb-2">Developed By Hrishabh Gupta and Team</p>
          <h1 className="text-8xl font-bold text-blue-500 my-8 tracking-tight">Genius...!</h1>
          <p className="text-sm">Start a conversation by typing a message below.</p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.content}
            isBot={msg.isBot}
            timestamp={msg.timestamp}
          />
        ))
      )}
    </div>
  );
}