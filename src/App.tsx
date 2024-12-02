import React, { useState } from 'react';
import axios from 'axios'; // Importing axios
import { Header } from './components/Layout/Header';
import { ChatHistory } from './components/Chat/ChatHistory';
import { ChatInput } from './components/Chat/ChatInput';
import { Message } from './types';
import { formatTimestamp } from './utils/dateUtils';

export function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to speak the text (bot's response)
  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);

    // Get the list of available voices
    const voices = speechSynthesis.getVoices();

    // Find the 'Google India English Female' voice
    const selectedVoice = voices.find(voice => voice.name.includes('Google') && voice.lang === 'en-IN' && voice.gender === 'female');

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      // Fallback to a female voice in en-IN if no specific match is found
      const fallbackVoice = voices.find(voice => voice.lang === 'en-IN' && voice.gender === 'female');
      if (fallbackVoice) {
        utterance.voice = fallbackVoice;
      } else {
        // If no female voice is found, use the default en-IN voice
        utterance.voice = voices.find(voice => voice.lang === 'en-IN') || voices[0];
      }
    }

    // Adjust pitch and rate for more natural speech
    utterance.pitch = 1;  // Normal pitch
    utterance.rate = 1;   // Normal rate
    utterance.volume = 1; // Full volume

    speechSynthesis.speak(utterance);
  };

  // API call function to interact with Cohere
  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      content,
      isBot: false,
      timestamp: formatTimestamp(new Date()),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Make API call to Cohere API to get response from the model
      const response = await axios.post('https://api.cohere.ai/v1/generate', 
        {
          prompt: content,
          max_tokens: 50,  // You can change this according to your requirement
          temperature: 0.6,
          model: "command-xlarge-nightly",
        },
        {
          headers: {
            'Authorization': `Bearer ULnsngqT36tuYOoAyTuCdFdpZq3ruENZrOuiHwUf`,  // Replace with your Cohere API key
            'Content-Type': 'application/json',
          }
        }
      );

      // Extract the generated response from Cohere API
      const botMessage: Message = {
        content: response.data.generations[0].text,
        isBot: true,
        timestamp: formatTimestamp(new Date()),
      };

      // Add bot response to the chat
      setMessages((prev) => [...prev, botMessage]);

      // Speak the bot's response
      speakText(botMessage.content);
    } catch (error) {
      console.error("Error communicating with Cohere API:", error);
      const botMessage: Message = {
        content: "Sorry, I encountered an issue. Please try again.",
        isBot: true,
        timestamp: formatTimestamp(new Date()),
      };
      setMessages((prev) => [...prev, botMessage]);
      speakText("Sorry, I encountered an issue. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-gray-800 text-9xl font-bold opacity-5 select-none text-center">
          Developed by<br />Hrishabh Gupta<br />
          <span className="text-7xl">A Product of Savingkaro Tech.</span>
        </p>
      </div>
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col relative z-10">
        <div className="flex-1 bg-gray-800 rounded-lg shadow-2xl flex flex-col backdrop-blur-sm border border-gray-700">
          <ChatHistory messages={messages} />
          <div className="p-4 border-t border-gray-700">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;