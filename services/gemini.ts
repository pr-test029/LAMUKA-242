import { GoogleGenAI } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  grounding?: any[];
}

export const sendMessageToGemini = async (
  message: string,
  location?: { latitude: number; longitude: number }
): Promise<{ text: string; grounding?: any[] }> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("API Key is missing in process.env.API_KEY. Please configure it.");
    return { text: "Le service d'assistant est actuellement indisponible (Clé API manquante)." };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Configure tools: Google Search is standard, Google Maps added if location is available.
    const tools: any[] = [{ googleSearch: {} }];
    if (location) {
      tools.push({ googleMaps: {} });
    }

    const config: any = {
      tools,
      systemInstruction: "Tu es l'assistant virtuel de l'association LAMUKA au Congo Brazzaville. " +
        "Ta mission est d'informer sur les actions de l'association (justice, santé, entrepreneuriat pour les femmes handicapées), " +
        "de répondre aux questions basées sur le contexte fourni ou via la recherche Google, " +
        "et d'aider à localiser des services d'aide si nécessaire via Google Maps. " +
        "Sois empathique, respectueux et précis.",
    };

    if (location) {
      config.toolConfig = {
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
      config: config
    });

    const text = response.text || "Je n'ai pas pu générer de réponse.";
    const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    return { text, grounding };
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return { text: "Désolé, une erreur est survenue lors de la communication avec l'assistant. Veuillez réessayer plus tard." };
  }
};