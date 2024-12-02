import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface VoiceSearchProps {
  onResult: (text: string) => void;
}

export function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleVoiceStart = () => {
    setIsListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleVoiceStop = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    if (transcript) {
      onResult(transcript);
      resetTranscript();
    }
  };

  return (
    <button
      onClick={isListening ? handleVoiceStop : handleVoiceStart}
      className={`p-2 rounded-full transition-colors ${
        isListening 
          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
      }`}
      title={isListening ? 'Stop recording' : 'Start voice input'}
    >
      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
    </button>
  );
}