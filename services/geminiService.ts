import { Platform } from 'react-native';

// NOTE: In a production app, API keys should NEVER be stored in client-side code
// This is only for demonstration purposes
const API_KEY = "AIzaSyB0BxvjJD39I7-va0P37qPHDnQ_E9JecMY";
// Using the correct model name "gemini-1.5-pro" which is available in v1beta
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

export type GeminiMessage = {
  role: 'user' | 'model';
  parts: Array<{
    text?: string;
    inlineData?: {
      mimeType: string;
      data: string; // base64 encoded data
    };
  }>;
};

export type GeminiRequest = {
  contents: GeminiMessage[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
    stopSequences?: string[];
  };
  safetySettings?: Array<{
    category: string;
    threshold: string;
  }>;
};

export type GeminiResponse = {
  candidates: Array<{
    content: {
      parts: Array<{
        text?: string;
      }>;
      role: string;
    };
    finishReason: string;
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  }>;
  promptFeedback?: {
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  };
};

export const generateGeminiResponse = async (
  messages: GeminiMessage[],
  options: {
    temperature?: number;
    maxTokens?: number;
  } = {}
): Promise<string> => {
  try {
    const requestBody: GeminiRequest = {
      contents: messages,
      generationConfig: {
        temperature: options.temperature || 0.7,
        maxOutputTokens: options.maxTokens || 800,
      },
    };

    console.log(`Calling Gemini API at: ${API_URL}`);
    
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error status: ${response.status}`);
      console.error(`Gemini API error response: ${errorText}`);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      console.error('No response candidates returned from Gemini API');
      throw new Error('No response generated');
    }

    const textResponse = data.candidates[0].content.parts
      .map(part => part.text || '')
      .join('');

    return textResponse;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

// Helper function to convert image to base64
export const imageToBase64 = async (uri: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64 = base64String.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  } else {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          // Remove the data URL prefix
          const base64 = base64String.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  }
};