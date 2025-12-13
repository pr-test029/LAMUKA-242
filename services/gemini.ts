import { GoogleGenAI } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  grounding?: any[];
}

export const sendMessageToGemini = async (
  message: string,
  location?: { latitude: number; longitude: number }
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const tools: any[] = [{ googleSearch: {} }];
    let toolConfig: any = undefined;

    if (location) {
      tools.push({ googleMaps: {} });
      toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: location.latitude,
            longitude: location.longitude
          }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        tools: tools,
        toolConfig: toolConfig,
        systemInstruction: "Tu es l'assistant virtuel de LAMUKA. Tu aides les utilisateurs à s'informer sur les actions de l'ONG (justice, santé, entrepreneuriat) et à trouver de l'aide. Sois empathique et précis.",
      },
    });

    return {
      text: response.text || "Désolé, je n'ai pas pu générer de réponse.",
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "Désolé, une erreur est survenue. Veuillez vérifier votre connexion ou réessayer plus tard.",
      grounding: []
    };
  }
};