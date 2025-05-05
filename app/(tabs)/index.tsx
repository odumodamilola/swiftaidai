import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import Colors from "@/constants/colors";
import { EmergencyButton } from "@/components/EmergencyButton";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchBar } from "@/components/SearchBar";
import { categories } from "@/mocks/categories";
import { Heart, Droplets, Flame, AlertTriangle, Bone, Pill, FlaskConical, Bug } from "lucide-react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleEmergency = () => {
    router.push("/emergency");
  };

  const handleCategoryPress = (id: string) => {
    router.push(`/category/${id}`);
  };

  const getIconForCategory = (iconName: string, color: string) => {
    const iconProps = { size: 24, color: color };
    
    switch (iconName) {
      case "heart-pulse":
        return <Heart {...iconProps} />;
      case "droplets":
        return <Droplets {...iconProps} />;
      case "flame":
        return <Flame {...iconProps} />;
      case "alert-triangle":
        return <AlertTriangle {...iconProps} />;
      case "bone":
        return <Bone {...iconProps} />;
      case "pill":
        return <Pill {...iconProps} />;
      case "flask-conical":
        return <FlaskConical {...iconProps} />;
      case "bug":
        return <Bug {...iconProps} />;
      default:
        return <Heart {...iconProps} />;
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={["bottom"]}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello there,</Text>
          <Text style={styles.title}>How can we help you today?</Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for first aid guides..."
        />

        <EmergencyButton onPress={handleEmergency} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>First Aid Categories</Text>
        </View>

        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              icon={getIconForCategory(category.icon, category.color)}
              onPress={() => handleCategoryPress(category.id)}
              color={category.color}
            />
          ))}
        </View>

        <View style={styles.aiAssistantCard}>
          <View style={styles.aiAssistantContent}>
            <Text style={styles.aiAssistantTitle}>Need personalized help?</Text>
            <Text style={styles.aiAssistantDescription}>
              Our AI assistant can guide you through any first aid situation.
            </Text>
            <TouchableOpacity
              style={styles.aiAssistantButton}
              onPress={() => router.push("/ai-assistant")}
            >
              <Text style={styles.aiAssistantButtonText}>Ask AI Assistant</Text>
            </TouchableOpacity>
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
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    fontSize: theme.typography.fontSize.lg,
    color: Colors.gray[600],
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  sectionHeader: {
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: -theme.spacing.xs,
  },
  aiAssistantCard: {
    backgroundColor: Colors.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },
  aiAssistantContent: {
    alignItems: "flex-start",
  },
  aiAssistantTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: theme.spacing.sm,
  },
  aiAssistantDescription: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: theme.spacing.lg,
  },
  aiAssistantButton: {
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  aiAssistantButtonText: {
    color: Colors.secondary,
    fontWeight: "600",
    fontSize: theme.typography.fontSize.md,
  },
});