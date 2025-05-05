import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { generateGeminiResponse, GeminiMessage, imageToBase64 } from "@/services/geminiService";
import * as ImagePicker from "expo-image-picker";

export type MessageType = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  imageUri?: string;
  isTyping?: boolean;
};

interface AIChatState {
  messages: MessageType[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Omit<MessageType, "id" | "timestamp">) => string;
  updateLastMessage: (id: string, updates: Partial<MessageType>) => void;
  sendMessage: (text: string, imageUri?: string) => Promise<void>;
  clearMessages: () => void;
  pickImage: () => Promise<string | undefined>;
}

export const useAIChatStore = create<AIChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,
      error: null,
      
      addMessage: (message) => {
        const newMessage = {
          ...message,
          id: Date.now().toString(),
          timestamp: new Date(),
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
        return newMessage.id;
      },
      
      updateLastMessage: (id, updates) => {
        set((state) => ({
          messages: state.messages.map((message) => 
            message.id === id ? { ...message, ...updates } : message
          ),
        }));
      },
      
      sendMessage: async (text, imageUri) => {
        set({ isLoading: true, error: null });
        
        // Add user message
        const userMessageId = get().addMessage({ 
          text, 
          isUser: true,
          imageUri 
        });
        
        // Add typing indicator for AI
        const aiTypingId = get().addMessage({
          text: "",
          isUser: false,
          isTyping: true,
        });
        
        try {
          // Convert previous messages to Gemini format
          const geminiMessages: GeminiMessage[] = [];
          
          // Add initial instruction as a user message
          geminiMessages.push({
            role: 'user',
            parts: [{ 
              text: "You are a helpful first aid assistant named Swift Aid. Provide clear, concise, and accurate first aid advice. Always remind users to seek professional medical help for serious conditions. Keep responses conversational but focused on immediate actions the user can take. If you're unsure about something, acknowledge your limitations and suggest seeking professional medical advice."
            }]
          });
          
          // Add model response to the instruction
          geminiMessages.push({
            role: 'model',
            parts: [{ 
              text: "I understand my role as Swift Aid, a first aid assistant. I'll provide clear, accurate first aid advice while emphasizing the importance of seeking professional medical help for serious conditions. I'll keep my responses focused on immediate, practical actions while maintaining a conversational tone. If I'm uncertain about anything, I'll acknowledge my limitations and recommend professional medical advice. How can I assist you with first aid today?"
            }]
          });
          
          // Add conversation history (limited to last 10 messages)
          const recentMessages = get().messages
            .filter(msg => !msg.isTyping)
            .slice(-10);
            
          for (const msg of recentMessages) {
            if (msg.isUser) {
              const parts: GeminiMessage["parts"] = [];
              
              if (msg.text) {
                parts.push({ text: msg.text });
              }
              
              if (msg.imageUri) {
                const base64Image = await imageToBase64(msg.imageUri);
                if (base64Image) {
                  parts.push({
                    inlineData: {
                      mimeType: "image/jpeg",
                      data: base64Image
                    }
                  });
                }
              }
              
              geminiMessages.push({
                role: "user",
                parts
              });
            } else {
              geminiMessages.push({
                role: "model",
                parts: [{ text: msg.text }]
              });
            }
          }
          
          // Generate response from Gemini
          const response = await generateGeminiResponse(geminiMessages, {
            temperature: 0.7,
            maxTokens: 800
          });
          
          // Remove typing indicator and add actual response
          set((state) => ({
            messages: state.messages.filter(msg => msg.id !== aiTypingId),
            isLoading: false
          }));
          
          get().addMessage({
            text: response,
            isUser: false
          });
          
        } catch (error) {
          console.error("Error sending message:", error);
          
          // Remove typing indicator
          set((state) => ({
            messages: state.messages.filter(msg => msg.id !== aiTypingId),
            isLoading: false,
            error: error instanceof Error ? error.message : "An unknown error occurred"
          }));
          
          // Add error message
          get().addMessage({
            text: "Sorry, I'm having trouble connecting. Please try again later.",
            isUser: false
          });
        }
      },
      
      clearMessages: () => {
        set({ messages: [] });
      },
      
      pickImage: async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
          });
          
          if (!result.canceled && result.assets && result.assets.length > 0) {
            return result.assets[0].uri;
          }
          return undefined;
        } catch (error) {
          console.error("Error picking image:", error);
          return undefined;
        }
      }
    }),
    {
      name: "ai-chat-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);