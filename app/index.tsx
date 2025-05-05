import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isLoading, checkAuthState } = useAuthStore();
  const [hasSeenOnboarding, setHasSeenOnboarding] = React.useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem("hasSeenOnboarding");
        setHasSeenOnboarding(onboardingStatus === "true");
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setHasSeenOnboarding(false);
      }
    };

    checkOnboardingStatus();
    checkAuthState();
  }, []);

  // Show loading state while checking authentication and onboarding status
  if (isLoading || hasSeenOnboarding === null) {
    return <View style={styles.container} />;
  }

  // If user hasn't seen onboarding, redirect to onboarding
  if (!hasSeenOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  // If user is not authenticated, redirect to auth
  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  // If user is authenticated and has seen onboarding, redirect to main app
  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});