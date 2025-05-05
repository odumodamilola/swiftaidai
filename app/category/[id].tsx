import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import Colors from "@/constants/colors";
import { Button } from "@/components/Button";
import { categories } from "@/mocks/categories";
import { firstAidGuides } from "@/mocks/firstAidGuides";
import { AlertTriangle } from "lucide-react-native";

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const categoryId = typeof id === "string" ? id : "";
  
  const category = categories.find((cat) => cat.id === categoryId);
  const guide = firstAidGuides.find((guide) => guide.categoryId === categoryId);
  
  if (!category || !guide) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <Stack.Screen options={{ title: "Not Found" }} />
        <View style={[styles.container, styles.centerContent]}>
          <Text style={styles.errorText}>Guide not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleEmergencyCall = async () => {
    const phoneNumber = Platform.OS === "android" ? "tel:911" : "telprompt:911";
    try {
      await Linking.openURL(phoneNumber);
    } catch (error) {
      console.error("Error opening phone app:", error);
    }
  };

  const handleAIAssistant = () => {
    router.push("/ai-assistant");
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Stack.Screen options={{ title: category.title }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{guide.title}</Text>
          <Text style={styles.subtitle}>{guide.subtitle}</Text>
        </View>

        {guide.imageUrl && (
          <Image source={{ uri: guide.imageUrl }} style={styles.image} />
        )}

        <View style={styles.warningContainer}>
          <AlertTriangle color={Colors.warning} size={20} />
          <Text style={styles.warningText}>{guide.warning}</Text>
        </View>

        <Text style={styles.sectionTitle}>What to Do</Text>
        {guide.steps.map((step, index) => (
          <View key={index} style={styles.step}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Do Not</Text>
        {guide.doNot.map((item, index) => (
          <View key={index} style={styles.doNotItem}>
            <AlertTriangle color={Colors.danger} size={18} />
            <Text style={styles.doNotText}>{item}</Text>
          </View>
        ))}

        {guide.additionalInfo && (
          <>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            <Text style={styles.additionalInfo}>{guide.additionalInfo}</Text>
          </>
        )}

        <View style={styles.callToAction}>
          <Text style={styles.callToActionTitle}>Need more help?</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Call Emergency"
              onPress={handleEmergencyCall}
              variant="danger"
              style={styles.emergencyButton}
            />
            <Button
              title="Ask AI Assistant"
              onPress={handleAIAssistant}
              variant="secondary"
              style={styles.aiButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: theme.typography.fontSize.lg,
    color: Colors.gray[600],
  },
  header: {
    marginBottom: theme.spacing.lg,
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
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
  },
  warningContainer: {
    backgroundColor: Colors.warning + "20",
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  warningText: {
    color: Colors.gray[800],
    fontSize: theme.typography.fontSize.sm,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  step: {
    flexDirection: "row",
    marginBottom: theme.spacing.md,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
    marginTop: 2,
  },
  stepNumber: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: theme.typography.fontSize.md,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "600",
    color: Colors.secondary,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[700],
    lineHeight: 22,
  },
  doNotItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: theme.spacing.sm,
    backgroundColor: Colors.danger + "10",
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  doNotText: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[800],
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  additionalInfo: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[700],
    lineHeight: 22,
  },
  callToAction: {
    marginTop: theme.spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.small,
  },
  callToActionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emergencyButton: {
    flex: 1,
    marginRight: theme.spacing.xs,
  },
  aiButton: {
    flex: 1,
    marginLeft: theme.spacing.xs,
  },
});