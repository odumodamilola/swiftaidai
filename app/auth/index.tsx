import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/colors";
import { theme } from "@/constants/theme";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { useAuthStore } from "@/stores/authStore";
import { Eye, EyeOff } from "lucide-react-native";

export default function AuthScreen() {
  const router = useRouter();
  const { signIn, signUp, isLoading, error } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async () => {
    if (isLogin) {
      const success = await signIn(email, password);
      if (success) {
        router.replace("/(tabs)");
      }
    } else {
      const success = await signUp(name, email, password);
      if (success) {
        router.replace("/(tabs)");
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = () => {
    if (isLogin) {
      return email.trim() !== "" && password.trim() !== "";
    } else {
      return name.trim() !== "" && email.trim() !== "" && password.trim() !== "";
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop" }}
            style={styles.logoBackground}
          />
          <View style={styles.overlay} />
          <Text style={styles.logoText}>Swift Aid</Text>
          <Text style={styles.logoSubtext}>Fast, Intelligent First Aid Support</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>{isLogin ? "Welcome Back" : "Create Account"}</Text>
          <Text style={styles.subtitle}>
            {isLogin
              ? "Sign in to access your Swift Aid account"
              : "Sign up to get started with Swift Aid"}
          </Text>

          {!isLogin && (
            <TextInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              autoCapitalize="words"
            />
          )}

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            rightIcon={
              <TouchableOpacity onPress={toggleShowPassword}>
                {showPassword ? (
                  <EyeOff size={20} color={Colors.gray[600]} />
                ) : (
                  <Eye size={20} color={Colors.gray[600]} />
                )}
              </TouchableOpacity>
            }
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <Button
            title={isLogin ? "Sign In" : "Sign Up"}
            onPress={handleAuth}
            disabled={!isFormValid() || isLoading}
            loading={isLoading}
            style={styles.button}
          />

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </Text>
            <TouchableOpacity onPress={toggleAuthMode}>
              <Text style={styles.switchButton}>
                {isLogin ? "Sign Up" : "Sign In"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  logoContainer: {
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logoBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: theme.spacing.xs,
  },
  logoSubtext: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.white,
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[600],
    marginBottom: theme.spacing.xl,
  },
  button: {
    marginTop: theme.spacing.lg,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.lg,
  },
  switchText: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[600],
  },
  switchButton: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.primary,
    fontWeight: "bold",
    marginLeft: theme.spacing.xs,
  },
  errorText: {
    color: Colors.danger,
    fontSize: theme.typography.fontSize.sm,
    marginTop: theme.spacing.xs,
  },
});