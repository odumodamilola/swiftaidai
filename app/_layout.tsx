import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/colors";

import { ErrorBoundary } from "./error-boundary";
import { AuthProvider } from "@/stores/authStore";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <StatusBar style="dark" />
        <RootLayoutNav />
      </AuthProvider>
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back",
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerTintColor: Colors.secondary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="modal" 
        options={{ 
          presentation: "modal",
          title: "About Swift Aid",
        }} 
      />
      <Stack.Screen 
        name="category/[id]" 
        options={{ 
          title: "First Aid Guide",
        }} 
      />
      <Stack.Screen 
        name="resource/[id]" 
        options={{ 
          title: "Resource Details",
        }} 
      />
      <Stack.Screen 
        name="facility/[id]" 
        options={{ 
          title: "Facility Details",
        }} 
      />
    </Stack>
  );
}