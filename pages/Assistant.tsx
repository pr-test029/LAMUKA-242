import React, { useState, useRef, useEffect } from 'react';
import { Send, MapPin, Loader2, Navigation, Bot } from 'lucide-react';
import { sendMessageToGemini, ChatMessage } from '../services/gemini';

export const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: 'Bonjour. Je suis l\'assistant de LAMUKA. Posez-moi vos questions sur nos actions, le blog ou pour trouver de l\'aide à proximité.' 
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

  // Helper to parse simple markdown bold syntax (**text**)
  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Helper to render content
  const renderContent = (msg: ChatMessage) => {
    return (
      <div className="space-y-4">
        <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
          {formatText(msg.text)}
        </div>
        
        {/* Render Grounding Data */}
        {msg.grounding && msg.grounding.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid gap-3 sm:grid-cols-1 md:grid-cols-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider col-span-full mb-1">Sources & Lieux</h4>
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
                      <div className="font-semibold text-pink-700 truncate text-sm">{chunk.web.title}</div>
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
                          <div className="font-semibold text-pink-700 truncate text-sm">{chunk.maps.title}</div>
                          <div className="text-xs text-gray-500 truncate">Ouvrir dans Maps</div>
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
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm z-10">
        <div className="container mx-auto flex items-center justify-between max-w-4xl">
          <div className="flex items-center">
             <div className="bg-pink-100 p-2 rounded-full mr-3">
               <Bot className="h-6 w-6 text-pink-600" />
             </div>
             <div>
               <h2 className="text-lg font-bold text-gray-900">Assistant LAMUKA</h2>
               <p className="text-xs text-gray-500 flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${location ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  {location ? "Localisation active" : "Localisation désactivée"}
               </p>
             </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 container mx-auto max-w-4xl scrollbar-hide">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
            <div 
              className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-6 py-4 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-pink-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}
            >
              {msg.role === 'user' ? (
                <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
              ) : (
                renderContent(msg)
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center space-x-3">
              <Loader2 className="w-5 h-5 text-pink-600 animate-spin" />
              <span className="text-sm text-gray-500 font-medium">Rédaction de la réponse...</span>
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
              placeholder="Ex: Quels sont vos services juridiques ?"
              className="w-full pl-6 pr-14 py-4 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all text-gray-800 placeholder-gray-500 shadow-inner"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2.5 bg-pink-600 text-white rounded-full hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-3 uppercase tracking-wider">
            L'assistant utilise l'IA et peut faire des erreurs.
          </p>
        </div>
      </div>
    </div>
  );
};