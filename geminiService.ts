
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, Mood } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGeminiCompanionResponse = async (
  userName: string,
  history: ChatMessage[],
  latestMood?: Mood
) => {
  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    })),
    config: {
      systemInstruction: `You are MindEase, a supportive, empathetic mental health companion for ${userName}. 
      Your tone is gentle, warm, and non-judgmental. 
      The user's current mood is ${latestMood || 'unknown'}.
      Always greet them kindly. Offer small, actionable self-care tips (e.g., deep breathing, drinking water, taking a walk).
      REMAIN SUPPORTIVE. If they express severe distress, gently suggest professional help while remaining their companion.
      Never provide a medical diagnosis.`,
      temperature: 0.8,
    }
  });

  const response = await model;
  return response.text;
};

export const getDynamicRecommendations = async (mood: Mood, factors: string[]) => {
  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The user is feeling ${mood} due to ${factors.join(', ')}. 
    Suggest 3 specific categories of activities or topics they should explore today to improve their well-being.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            reason: { type: Type.STRING },
            type: { type: Type.STRING, description: "One of: relaxation, activity, learning" }
          },
          required: ["title", "reason", "type"]
        }
      }
    }
  });

  const response = await model;
  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    return [];
  }
};
