import { GoogleGenAI } from "@google/genai";

// Récupération de la clé injectée par Vite
const apiKey = process.env.API_KEY;

// Initialisation conditionnelle pour éviter le crash "An API Key must be set" au chargement de la page
// Si la clé est absente, ai reste null et l'erreur sera gérée lors de l'appel de la fonction
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error("Erreur d'initialisation Gemini:", error);
  }
}

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
    // Vérification avant l'appel
    if (!ai) {
      console.warn("Gemini AI n'est pas initialisé (Clé API manquante ou invalide).");
      return { 
        text: "Le service d'assistant est actuellement indisponible. Veuillez vérifier la configuration de la clé API ou contacter l'administrateur." 
      };
    }

    const tools = [{ googleMaps: {} }];
    
    // Construct tool config with location if available
    const toolConfig = location ? {
      retrievalConfig: {
        latLng: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      }
    } : undefined;

    const systemInstruction = `Vous êtes l'assistant virtuel de LAMUKA, un collectif engagé au Congo Brazzaville.
    
    BASE DE CONNAISSANCES OFFICIELLE (SOURCE DOCUMENT PDF) :
    
    1. IDENTITÉ & VISION
       - Nom : COLLECTIF LAMUKA.
       - Devise : Solidarité – Justice - Développement.
       - Vision : Promouvoir l’autonomisation de la jeune fille et femme en situation d’handicap.
       - Mission : Contribuer à la promotion des droits de la jeune fille et femme en situation de handicap pour une société d’égalité et d’équité.
    
    2. COORDONNÉES
       - Siège : 20, rue KIPOUANDZA, Mfilou-NGAMABA, Brazzaville.
       - Téléphones (WhatsApp) : +242 06 920 60 58 / +242 06 852 65 55.
       - Emails : lamuka2023@gmail.com / louzologustavine@gmail.com.
       - Facebook : Lamuka242.
    
    3. DOMAINES D'ACTIVITÉS
       - Formation entrepreneuriale : Pour l'autonomisation économique.
       - Lutte contre les violences basées sur le genre (VBG) : Protection et justice.
       - Droit en santé sexuelle et santé de la reproduction : Accès aux soins et information.
    
    RÈGLES DE RÉPONSE :
    1. STYLE : Réponses COURTES, PRÉCISES et DIRECTES.
    2. STRUCTURE : Utilisez des listes à puces.
    3. MISE EN FORME : Mettez les mots-clés importants (noms, lieux, numéros) en **GRAS**.
    4. MAPS : Si l'utilisateur cherche un lieu, utilisez l'outil googleMaps.
    5. URGENCE : Pour les cas graves, renvoyez vers les numéros du siège (+242 06 920 60 58).
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: message,
      config: {
        tools,
        toolConfig,
        systemInstruction,
        temperature: 0.5, // Lower temperature for more factual/precise responses
      },
    });

    const text = response.text || "Je suis désolé, je n'ai pas pu générer de réponse.";
    
    // Extract grounding chunks if available (Maps data)
    const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    return { text, grounding };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Désolé, une erreur technique est survenue. Veuillez réessayer plus tard." };
  }
};