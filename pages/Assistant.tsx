import React, { useState, useRef, useEffect } from 'react';
import { Send, MapPin, Loader2, Navigation } from 'lucide-react';
import { sendMessageToGemini, ChatMessage } from '../services/gemini';

export const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: 'Bonjour. Je suis l\'assistant virtuel de LAMUKA. Je peux vous aider à trouver des centres de santé, des associations ou répondre à vos questions sur vos droits. Comment puis-je vous aider aujourd\'hui ?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{latitude: number, longitude: number} | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Attempt to get user location on mount for better results
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.warn("Geolocation access denied or failed:", error);
        }
      );
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await sendMessageToGemini(input, location);

    const modelMsg: ChatMessage = { 
      role: 'model', 
      text: response.text,
      grounding: response.grounding
    };
    
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper to render Markdown-like links or maps data
  const renderContent = (msg: ChatMessage) => {
    return (
      <div className="space-y-4">
        <p className="whitespace-pre-wrap">{msg.text}</p>
        
        {/* Render Grounding Data */}
        {msg.grounding && msg.grounding.length > 0 && (
          <div className="mt-4 grid gap-3 sm:grid-cols-1 md:grid-cols-2">
            {msg.grounding.map((chunk: any, index: number) => {
              // Handle Web Source Chunks
              if (chunk.web?.uri && chunk.web?.title) {
                 return (
                    <a 
                      key={index} 
                      href={chunk.web.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition shadow-sm"
                    >
                      <div className="font-semibold text-pink-700 truncate">{chunk.web.title}</div>
                      <div className="text-xs text-gray-500 truncate">{chunk.web.uri}</div>
                    </a>
                 )
              }
              
              // Handle Google Maps Grounding Chunks
              if (chunk.maps?.uri && chunk.maps?.title) {
                 return (
                    <a 
                      key={index} 
                      href={chunk.maps.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition shadow-sm group"
                    >
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <div className="min-w-0">
                          <div className="font-semibold text-pink-700 truncate">{chunk.maps.title}</div>
                          <div className="text-xs text-gray-500 truncate">Google Maps</div>
                        </div>
                      </div>
                    </a>
                 )
              }
              
              return null;
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      <div className="bg-pink-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
             <div className="bg-white/20 p-2 rounded-full mr-3">
               <Navigation className="h-5 w-5 text-white" />
             </div>
             <div>
               <h2 className="text-lg font-bold">LAMUKA Assistant</h2>
               <p className="text-xs text-pink-200">
                  {location ? "Localisation active • " : "Localisation non détectée • "}
                  Propulsé par Google Gemini & Maps
               </p>
             </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 container mx-auto max-w-4xl">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-pink-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}
            >
              {renderContent(msg)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center space-x-2">
              <Loader2 className="w-5 h-5 text-pink-600 animate-spin" />
              <span className="text-sm text-gray-500">Recherche en cours...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-4xl relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ex: Où trouver un gynécologue à Brazzaville ?"
              className="w-full pl-4 pr-12 py-4 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all shadow-inner text-gray-800 placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            L'assistant peut faire des erreurs. Vérifiez les informations importantes.
          </p>
        </div>
      </div>
    </div>
  );
};