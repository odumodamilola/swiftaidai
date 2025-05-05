import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import Colors from "@/constants/colors";
import { Shield, Lock, ExternalLink, ChevronRight } from "lucide-react-native";

export default function PrivacyScreen() {
  const [locationEnabled, setLocationEnabled] = React.useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = React.useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleOpenPrivacyPolicy = async () => {
    try {
      await Linking.openURL("https://example.com/privacy-policy");
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };

  const handleOpenTerms = async () => {
    try {
      await Linking.openURL("https://example.com/terms");
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Stack.Screen options={{ title: "Privacy & Security" }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Shield size={40} color={Colors.primary} />
          <Text style={styles.headerTitle}>Your Privacy Matters</Text>
          <Text style={styles.headerSubtitle}>
            Control how your data is used and shared within the app
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Collection</Text>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={styles.switchLabel}>Location Services</Text>
              <Text style={styles.switchDescription}>
                Allow the app to access your location to find nearby medical facilities
              </Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: Colors.gray[300], true: Colors.primary + "80" }}
              thumbColor={locationEnabled ? Colors.primary : Colors.gray[100]}
              ios_backgroundColor={Colors.gray[300]}
            />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={styles.switchLabel}>Analytics</Text>
              <Text style={styles.switchDescription}>
                Help us improve by sending anonymous usage data
              </Text>
            </View>
            <Switch
              value={analyticsEnabled}
              onValueChange={setAnalyticsEnabled}
              trackColor={{ false: Colors.gray[300], true: Colors.primary + "80" }}
              thumbColor={analyticsEnabled ? Colors.primary : Colors.gray[100]}
              ios_backgroundColor={Colors.gray[300]}
            />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={styles.switchLabel}>Notifications</Text>
              <Text style={styles.switchDescription}>
                Receive important updates and emergency alerts
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.gray[300], true: Colors.primary + "80" }}
              thumbColor={notificationsEnabled ? Colors.primary : Colors.gray[100]}
              ios_backgroundColor={Colors.gray[300]}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Lock size={20} color={Colors.secondary} style={styles.menuIcon} />
              <View>
                <Text style={styles.menuText}>Change Password</Text>
                <Text style={styles.menuDescription}>Update your account password</Text>
              </View>
            </View>
            <ChevronRight size={20} color={Colors.gray[500]} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleOpenPrivacyPolicy}>
            <View style={styles.menuLeft}>
              <Shield size={20} color={Colors.secondary} style={styles.menuIcon} />
              <View>
                <Text style={styles.menuText}>Privacy Policy</Text>
                <Text style={styles.menuDescription}>How we handle your data</Text>
              </View>
            </View>
            <ExternalLink size={20} color={Colors.gray[500]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleOpenTerms}>
            <View style={styles.menuLeft}>
              <ExternalLink size={20} color={Colors.secondary} style={styles.menuIcon} />
              <View>
                <Text style={styles.menuText}>Terms of Service</Text>
                <Text style={styles.menuDescription}>Rules for using Swift Aid</Text>
              </View>
            </View>
            <ExternalLink size={20} color={Colors.gray[500]} />
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Swift Aid collects and processes personal data in accordance with our Privacy Policy. You can change these settings at any time.
        </Text>
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
  switchItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  switchLabel: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: "500",
    color: Colors.secondary,
  },
  switchDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: Colors.gray[600],
    marginTop: 2,
    maxWidth: "80%",
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
  footerText: {
    fontSize: theme.typography.fontSize.sm,
    color: Colors.gray[600],
    textAlign: "center",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
});