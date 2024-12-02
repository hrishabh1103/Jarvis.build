import React from 'react';
import { Brain } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-400" />
            <span className="font-bold text-xl text-white">Genius AI</span>
          </div>
          <nav className="flex items-center gap-4">
            <button className="text-gray-300 hover:text-white transition-colors">Features</button>
            <button className="text-gray-300 hover:text-white transition-colors">About</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}