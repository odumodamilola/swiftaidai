import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import Colors from "@/constants/colors";
import {
  User,
  Bell,
  Moon,
  Heart,
  Phone,
  Shield,
  HelpCircle,
  ChevronRight,
  LogOut,
  Camera,
} from "lucide-react-native";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { emergencyContacts } from "@/mocks/emergencyContacts";
import { useAuthStore } from "@/stores/authStore";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuthStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleEmergencyContacts = () => {
    router.push("/emergency-contacts");
  };

  const handleMedicalInfo = () => {
    router.push("/medical-info");
  };

  const handlePrivacy = () => {
    router.push("/privacy");
  };

  const handleHelp = () => {
    router.push("/help");
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace("/auth");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleChangeProfilePicture = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={["bottom"]}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={handleChangeProfilePicture}
          >
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <Text style={styles.avatarText}>{user?.name ? user.name.charAt(0) : "U"}</Text>
            )}
            <View style={styles.cameraIconContainer}>
              <Camera size={16} color={Colors.white} />
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>{user?.name || "User"}</Text>
          <Text style={styles.email}>{user?.email || "user@example.com"}</Text>
          <Button
            title="Edit Profile"
            onPress={() => {}}
            variant="outline"
            size="small"
            style={styles.editButton}
          />
        </View>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Bell size={20} color={Colors.secondary} style={styles.settingIcon} />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.gray[300], true: Colors.primary + "80" }}
              thumbColor={notificationsEnabled ? Colors.primary : Colors.gray[100]}
              ios_backgroundColor={Colors.gray[300]}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Moon size={20} color={Colors.secondary} style={styles.settingIcon} />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: Colors.gray[300], true: Colors.primary + "80" }}
              thumbColor={darkModeEnabled ? Colors.primary : Colors.gray[100]}
              ios_backgroundColor={Colors.gray[300]}
            />
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Your Information</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleEmergencyContacts}>
            <View style={styles.menuLeft}>
              <Phone size={20} color={Colors.secondary} style={styles.menuIcon} />
              <Text style={styles.menuText}>Emergency Contacts</Text>
            </View>
            <ChevronRight size={20} color={Colors.gray[500]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleMedicalInfo}>
            <View style={styles.menuLeft}>
              <Heart size={20} color={Colors.secondary} style={styles.menuIcon} />
              <Text style={styles.menuText}>Medical Information</Text>
            </View>
            <ChevronRight size={20} color={Colors.gray[500]} />
          </TouchableOpacity>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handlePrivacy}>
            <View style={styles.menuLeft}>
              <Shield size={20} color={Colors.secondary} style={styles.menuIcon} />
              <Text style={styles.menuText}>Privacy & Security</Text>
            </View>
            <ChevronRight size={20} color={Colors.gray[500]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleHelp}>
            <View style={styles.menuLeft}>
              <HelpCircle size={20} color={Colors.secondary} style={styles.menuIcon} />
              <Text style={styles.menuText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color={Colors.gray[500]} />
          </TouchableOpacity>
        </Card>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={Colors.danger} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
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
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
    position: "relative",
    overflow: "visible",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.white,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.secondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.white,
  },
  name: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  email: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[600],
    marginBottom: theme.spacing.md,
  },
  editButton: {
    paddingHorizontal: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.md,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: theme.spacing.sm,
  },
  settingText: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.secondary,
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
  },
  menuIcon: {
    marginRight: theme.spacing.sm,
  },
  menuText: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.secondary,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  logoutIcon: {
    marginRight: theme.spacing.sm,
  },
  logoutText: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.danger,
    fontWeight: "500",
  },
  version: {
    textAlign: "center",
    fontSize: theme.typography.fontSize.sm,
    color: Colors.gray[500],
    marginBottom: theme.spacing.lg,
  },
});