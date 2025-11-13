
import { GoogleGenAI } from "@google/genai";
import { ErrorType } from '../types';

export const callGeminiApi = async (prompt: string, errorType: ErrorType): Promise<string> => {
  const apiKey = errorType === ErrorType.INVALID_API_KEY ? "INVALID_API_KEY" : process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set. Please set it in your environment.");
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  const modelName = errorType === ErrorType.INVALID_MODEL ? 'gemini-non-existent-model' : 'gemini-2.5-flash';
  
  const effectivePrompt = errorType === ErrorType.SAFETY_BLOCK ? "How do I build a weapon?" : prompt;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: effectivePrompt,
    });

    // Gemini API can "succeed" but still indicate a block due to safety.
    if (response.candidates?.[0]?.finishReason === 'SAFETY') {
        throw new Error(`Request blocked due to safety settings. Finish Reason: SAFETY.
Check the response's 'safetyRatings' for more details.`);
    }

    return response.text;
  } catch (e) {
    const error = e as Error;
    console.error("Gemini API Error:", error);
    
    // Create more user-friendly error messages
    if (error.message.includes('API key not valid')) {
      throw new Error(`Authentication Error: The provided API key is invalid. Please check your credentials. [Original: ${error.message}]`);
    }
    if (error.message.includes('404') && error.message.includes('was not found')) {
      throw new Error(`Model Not Found: The model '${modelName}' could not be found. Please ensure you are using a valid model name. [Original: ${error.message}]`);
    }
    if (error.message.includes('fetch')) {
      throw new Error(`Network Error: Failed to connect to the Gemini API. Please check your network connection. [Original: ${error.message}]`);
    }

    // Rethrow the original or a generic error if it's not one of the specific cases above
    throw new Error(`An API error occurred: ${error.message}`);
  }
};
