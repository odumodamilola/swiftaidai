import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import Colors from "@/constants/colors";
import { HelpCircle, Mail, MessageCircle, FileText, ChevronRight, ExternalLink } from "lucide-react-native";

export default function HelpScreen() {
  const handleContactSupport = async () => {
    try {
      await Linking.openURL("mailto:support@swiftaid.com");
    } catch (error) {
      console.error("Error opening mail app:", error);
    }
  };

  const handleOpenFAQ = () => {
    // In a real app, navigate to FAQ screen
    console.log("Navigate to FAQ screen");
  };

  const handleOpenGuides = () => {
    // In a real app, navigate to guides screen
    console.log("Navigate to guides screen");
  };

  const handleOpenFeedback = () => {
    // In a real app, navigate to feedback screen
    console.log("Navigate to feedback screen");
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Stack.Screen options={{ title: "Help & Support" }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <HelpCircle size={40} color={Colors.primary} />
          <Text style={styles.headerTitle}>How can we help?</Text>
          <Text style={styles.headerSubtitle}>
            Find answers to common questions or get in touch with our support team
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support Options</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleContactSupport}>
            <View style={styles.menuLeft}>
              <Mail size={20} color={Colors.secondary} style={styles.menuIcon} />
              <View>
                <Text style={styles.menuText}>Contact Support</Text>
                <Text style={styles.menuDescription}>Email our support team</Text>
              </View>
            </View>
            <ExternalLink size={20} color={Colors.gray[500]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleOpenFeedback}>
            <View style={styles.menuLeft}>
              <MessageCircle size={20} color={Colors.secondary} style={styles.menuIcon} />
              <View>
                <Text style={styles.menuText}>Send Feedback</Text>
                <Text style={styles.menuDescription}>Help us improve Swift Aid</Text>
              </View>
            </View>
            <ChevronRight size={20} color={Colors.gray[500]} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleOpenFAQ}>
            <View style={styles.menuLeft}>
              <HelpCircle size={20} color={Colors.secondary} style={styles.menuIcon} />
              <View>
                <Text style={styles.menuText}>Frequently Asked Questions</Text>
                <Text style={styles.menuDescription}>Find answers to common questions</Text>
              </View>
            </View>
            <ChevronRight size={20} color={Colors.gray[500]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleOpenGuides}>
            <View style={styles.menuLeft}>
              <FileText size={20} color={Colors.secondary} style={styles.menuIcon} />
              <View>
                <Text style={styles.menuText}>User Guides</Text>
                <Text style={styles.menuDescription}>Learn how to use Swift Aid</Text>
              </View>
            </View>
            <ChevronRight size={20} color={Colors.gray[500]} />
          </TouchableOpacity>
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>Common Questions</Text>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How accurate is the AI assistant?</Text>
            <Text style={styles.faqAnswer}>
              The AI assistant provides guidance based on standard first aid protocols, but it should not replace professional medical advice. Always seek professional medical help in serious situations.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Is my medical information secure?</Text>
            <Text style={styles.faqAnswer}>
              Yes, your medical information is stored securely on your device and is not shared with third parties without your explicit consent.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How do I update my emergency contacts?</Text>
            <Text style={styles.faqAnswer}>
              You can add, edit, or remove emergency contacts in the Profile tab under "Emergency Contacts."
            </Text>
          </View>
        </View>

        <Text style={styles.versionText}>Swift Aid v1.0.0</Text>
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
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.xl,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: "bold",
    color: Colors.secondary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[600],
    textAlign: "center",
    maxWidth: "80%",
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.md,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    marginRight: theme.spacing.sm,
  },
  menuText: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.secondary,
  },
  menuDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: Colors.gray[600],
  },
  faqSection: {
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  faqTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.md,
  },
  faqItem: {
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  faqQuestion: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: "600",
    color: Colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  faqAnswer: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[700],
    lineHeight: 22,
  },
  versionText: {
    fontSize: theme.typography.fontSize.sm,
    color: Colors.gray[500],
    textAlign: "center",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
});