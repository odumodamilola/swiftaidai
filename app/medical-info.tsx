import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import Colors from "@/constants/colors";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/Button";
import { AlertTriangle, Save } from "lucide-react-native";
import * as Haptics from "expo-haptics";

export default function MedicalInfoScreen() {
  const [medicalInfo, setMedicalInfo] = useState({
    bloodType: "",
    allergies: "",
    medications: "",
    conditions: "",
    notes: "",
    organDonor: false,
    emergencyAccess: true,
  });

  const handleSave = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    // In a real app, save to backend or local storage
    console.log("Saving medical info:", medicalInfo);
    
    // Show success message
    alert("Medical information saved successfully!");
  };

  const handleChange = (field: string, value: string | boolean) => {
    setMedicalInfo({
      ...medicalInfo,
      [field]: value,
    });
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Stack.Screen options={{ title: "Medical Information" }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.infoCard}>
          <AlertTriangle size={20} color={Colors.warning} />
          <Text style={styles.infoText}>
            This information can be critical in an emergency. It will be stored securely on your device.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Medical Details</Text>
          
          <TextInput
            label="Blood Type"
            value={medicalInfo.bloodType}
            onChangeText={(text) => handleChange("bloodType", text)}
            placeholder="e.g., A+, B-, O+"
          />
          
          <TextInput
            label="Allergies"
            value={medicalInfo.allergies}
            onChangeText={(text) => handleChange("allergies", text)}
            placeholder="List any allergies"
            multiline
            numberOfLines={3}
          />
          
          <TextInput
            label="Current Medications"
            value={medicalInfo.medications}
            onChangeText={(text) => handleChange("medications", text)}
            placeholder="List medications and dosages"
            multiline
            numberOfLines={3}
          />
          
          <TextInput
            label="Medical Conditions"
            value={medicalInfo.conditions}
            onChangeText={(text) => handleChange("conditions", text)}
            placeholder="List any chronic conditions"
            multiline
            numberOfLines={3}
          />
          
          <TextInput
            label="Additional Notes"
            value={medicalInfo.notes}
            onChangeText={(text) => handleChange("notes", text)}
            placeholder="Any other important medical information"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={styles.switchLabel}>Organ Donor</Text>
              <Text style={styles.switchDescription}>
                Indicate your organ donor status
              </Text>
            </View>
            <Switch
              value={medicalInfo.organDonor}
              onValueChange={(value) => handleChange("organDonor", value)}
              trackColor={{ false: Colors.gray[300], true: Colors.primary + "80" }}
              thumbColor={medicalInfo.organDonor ? Colors.primary : Colors.gray[100]}
              ios_backgroundColor={Colors.gray[300]}
            />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={styles.switchLabel}>Emergency Access</Text>
              <Text style={styles.switchDescription}>
                Allow access to this information from the lock screen in an emergency
              </Text>
            </View>
            <Switch
              value={medicalInfo.emergencyAccess}
              onValueChange={(value) => handleChange("emergencyAccess", value)}
              trackColor={{ false: Colors.gray[300], true: Colors.primary + "80" }}
              thumbColor={medicalInfo.emergencyAccess ? Colors.primary : Colors.gray[100]}
              ios_backgroundColor={Colors.gray[300]}
            />
          </View>
        </View>

        <Button
          title="Save Medical Information"
          onPress={handleSave}
          icon={<Save size={20} color={Colors.white} />}
          iconPosition="left"
          style={styles.saveButton}
        />
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
  infoCard: {
    backgroundColor: Colors.warning + "20",
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  infoText: {
    color: Colors.gray[800],
    fontSize: theme.typography.fontSize.sm,
    marginLeft: theme.spacing.sm,
    flex: 1,
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
  saveButton: {
    marginTop: theme.spacing.md,
  },
});