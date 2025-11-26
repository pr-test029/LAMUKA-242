import { GoogleGenAI, Tool } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-2.5-flash";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  grounding?: any;
}

export const sendMessageToGemini = async (
  message: string,
  location?: { latitude: number; longitude: number }
): Promise<{ text: string; grounding?: any }> => {
  try {
    const tools: Tool[] = [{ googleMaps: {} }];
    
    // Construct tool config with location if available
    const toolConfig = location ? {
      retrievalConfig: {
        latLng: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      }
    } : undefined;

    const systemInstruction = `Vous êtes l'assistant virtuel de LAMUKA, un collectif au Congo Brazzaville.
    Votre mission est d'aider les femmes et jeunes filles handicapées victimes de violences (VBG), et de fournir des informations sur la santé sexuelle, l'inclusion sociale et l'autonomisation.
    Le siège de LAMUKA est situé au 20 rue Kimpouanza, Avenue Mayama, Mfilou, Brazzaville.
    
    Règles:
    1. Soyez empathique, respectueux et solidaire.
    2. Utilisez l'outil Google Maps pour localiser des centres de santé, des hôpitaux, des centres d'aide sociale, ou des associations pertinentes au Congo (Brazzaville, Pointe-Noire, etc.) lorsque l'utilisateur le demande.
    3. Si l'utilisateur pose une question sur la localisation, DONNEZ TOUJOURS les détails trouvés via l'outil Maps.
    4. Répondez en Français.
    5. Pour les urgences graves, conseillez toujours de contacter les autorités locales ou les urgences médicales immédiatement.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: message,
      config: {
        tools,
        toolConfig,
        systemInstruction,
        temperature: 0.7,
      },
    });

    const candidate = response.candidates?.[0];
    const text = candidate?.content?.parts?.map(p => p.text).join('') || "Je suis désolé, je n'ai pas pu générer de réponse.";
    
    // Extract grounding chunks if available (Maps data)
    const grounding = candidate?.groundingMetadata?.groundingChunks;

    return { text, grounding };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Désolé, une erreur est survenue lors de la connexion à l'assistant. Veuillez réessayer plus tard." };
  }
};