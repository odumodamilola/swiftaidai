import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import React, { createContext, useContext, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  checkAuthState: () => Promise<void>;
}

// Mock user data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      signIn: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // Find user with matching email and password
          const user = mockUsers.find(
            (u) => u.email === email && u.password === password
          );
          
          if (user) {
            const { password: _, ...userWithoutPassword } = user;
            set({
              user: userWithoutPassword,
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          } else {
            set({
              error: "Invalid email or password",
              isLoading: false,
            });
            return false;
          }
        } catch (error) {
          set({
            error: "An error occurred during sign in",
            isLoading: false,
          });
          return false;
        }
      },
      
      signUp: async (name, email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // Check if user with email already exists
          const existingUser = mockUsers.find((u) => u.email === email);
          
          if (existingUser) {
            set({
              error: "Email already in use",
              isLoading: false,
            });
            return false;
          }
          
          // Create new user
          const newUser = {
            id: String(mockUsers.length + 1),
            name,
            email,
            password,
          };
          
          // Add to mock users (in a real app, this would be an API call)
          mockUsers.push(newUser);
          
          const { password: _, ...userWithoutPassword } = newUser;
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          set({
            error: "An error occurred during sign up",
            isLoading: false,
          });
          return false;
        }
      },
      
      signOut: async () => {
        set({ user: null, isAuthenticated: false });
      },
      
      checkAuthState: async () => {
        set({ isLoading: true });
        
        try {
          // In a real app, you would validate the token with your backend
          // For this demo, we'll just check if user data exists in storage
          const user = get().user;
          
          set({
            isAuthenticated: !!user,
            isLoading: false,
          });
        } catch (error) {
          set({
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Create a React Context for the auth store
const AuthContext = createContext<ReturnType<typeof useAuthStore> | null>(null);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider value={useAuthStore()}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth store in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};