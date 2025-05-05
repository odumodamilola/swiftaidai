import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import Colors from "@/constants/colors";
import { Phone, AlertTriangle, MessageCircle } from "lucide-react-native";
import { EmergencyContactCard } from "@/components/EmergencyContactCard";
import { emergencyContacts } from "@/mocks/emergencyContacts";
import * as Haptics from "expo-haptics";

export default function EmergencyScreen() {
  const router = useRouter();

  const handleEmergencyCall = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    
    Alert.alert(
      "Emergency Call",
      "Are you sure you want to call emergency services?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Call 911",
          style: "destructive",
          onPress: async () => {
            const phoneNumber = Platform.OS === "android" ? "tel:911" : "telprompt:911";
            try {
              await Linking.openURL(phoneNumber);
            } catch (error) {
              console.error("Error opening phone app:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleAIAssistant = () => {
    router.push("/ai-assistant");
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Stack.Screen options={{ title: "Emergency Help" }} />
      <View style={styles.container}>
        <View style={styles.emergencyCallContainer}>
          <TouchableOpacity
            style={styles.emergencyCallButton}
            onPress={handleEmergencyCall}
            activeOpacity={0.8}
          >
            <Phone color={Colors.white} size={32} />
            <Text style={styles.emergencyCallText}>Call 911</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.aiAssistantButton}
            onPress={handleAIAssistant}
            activeOpacity={0.8}
          >
            <MessageCircle color={Colors.white} size={28} />
            <Text style={styles.aiAssistantText}>AI Assistant</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.warningContainer}>
          <AlertTriangle color={Colors.warning} size={20} />
          <Text style={styles.warningText}>
            In case of a serious emergency, always call emergency services first.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <FlatList
          data={emergencyContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EmergencyContactCard contact={item} />}
          contentContainerStyle={styles.contactsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: Colors.background,
  },
  emergencyCallContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  },
  emergencyCallButton: {
    backgroundColor: Colors.danger,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: theme.spacing.sm,
    ...theme.shadows.medium,
  },
  emergencyCallText: {
    color: Colors.white,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "bold",
    marginTop: theme.spacing.sm,
  },
  aiAssistantButton: {
    backgroundColor: Colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: theme.spacing.sm,
    ...theme.shadows.medium,
  },
  aiAssistantText: {
    color: Colors.white,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "bold",
    marginTop: theme.spacing.sm,
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
  },
  contactsList: {
    paddingBottom: theme.spacing.lg,
  },
});