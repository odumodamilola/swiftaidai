import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import Colors from "@/constants/colors";
import { MapPin, Clock, Phone, Navigation, Globe, Star, Info } from "lucide-react-native";
import { medicalFacilities } from "@/mocks/medicalFacilities";

export default function FacilityDetailScreen() {
  const { id } = useLocalSearchParams();
  const facilityId = typeof id === "string" ? id : "";
  
  const facility = medicalFacilities.find((f) => f.id === facilityId);
  
  if (!facility) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <Stack.Screen options={{ title: "Not Found" }} />
        <View style={[styles.container, styles.centerContent]}>
          <Text style={styles.errorText}>Facility not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleCall = async () => {
    const phoneNumber = Platform.OS === "android" ? `tel:${facility.phone}` : `telprompt:${facility.phone}`;
    
    try {
      await Linking.openURL(phoneNumber);
    } catch (error) {
      console.error("Error opening phone app:", error);
    }
  };

  const handleDirections = async () => {
    const { latitude, longitude } = facility;
    const url = Platform.select({
      ios: `maps:0,0?q=${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}`,
      web: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
    });

    try {
      if (url) await Linking.openURL(url);
    } catch (error) {
      console.error("Error opening maps:", error);
    }
  };

  const handleWebsite = async () => {
    try {
      await Linking.openURL("https://example.com");
    } catch (error) {
      console.error("Error opening website:", error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Stack.Screen options={{ title: facility.name }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{facility.name}</Text>
          <View style={styles.typeContainer}>
            <Text style={styles.type}>{facility.type}</Text>
          </View>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                color={star <= 4 ? Colors.warning : Colors.gray[300]}
                fill={star <= 4 ? Colors.warning : "none"}
              />
            ))}
            <Text style={styles.ratingText}>4.0 (120 reviews)</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <MapPin size={20} color={Colors.gray[600]} />
            <Text style={styles.infoText}>{facility.address}</Text>
          </View>

          <View style={styles.infoRow}>
            <Clock size={20} color={Colors.gray[600]} />
            <View>
              <Text style={styles.infoText}>
                <Text style={facility.isOpen ? styles.openText : styles.closedText}>
                  {facility.isOpen ? "Open Now" : "Closed"}
                </Text>
              </Text>
              <Text style={styles.hoursText}>{facility.hours}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Phone size={20} color={Colors.gray[600]} />
            <Text style={styles.infoText}>{facility.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <Info size={20} color={Colors.gray[600]} />
            <Text style={styles.infoText}>{facility.distance} from your location</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Phone size={24} color={Colors.primary} />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleDirections}>
            <Navigation size={24} color={Colors.primary} />
            <Text style={styles.actionText}>Directions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleWebsite}>
            <Globe size={24} color={Colors.primary} />
            <Text style={styles.actionText}>Website</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.servicesList}>
            {getServicesByType(facility.type).map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            {getDescriptionByType(facility.type, facility.name)}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getServicesByType = (type: string) => {
  switch (type) {
    case "hospital":
      return [
        "Emergency Care",
        "Intensive Care",
        "Surgery",
        "Radiology",
        "Laboratory",
        "Pharmacy",
        "Physical Therapy",
      ];
    case "clinic":
      return [
        "Primary Care",
        "Urgent Care",
        "Vaccinations",
        "Basic Diagnostics",
        "Minor Procedures",
        "Preventive Care",
      ];
    case "pharmacy":
      return [
        "Prescription Filling",
        "Over-the-counter Medications",
        "Vaccinations",
        "Health Consultations",
        "Medical Supplies",
      ];
    default:
      return ["General Medical Services"];
  }
};

const getDescriptionByType = (type: string, name: string) => {
  switch (type) {
    case "hospital":
      return `${name} is a full-service medical facility providing comprehensive healthcare services to the community. With state-of-the-art equipment and a dedicated team of healthcare professionals, we offer emergency care, specialized treatments, surgical procedures, and ongoing patient support. Our facility is equipped to handle a wide range of medical conditions and emergencies 24 hours a day, 7 days a week.`;
    case "clinic":
      return `${name} offers convenient, accessible healthcare services for non-emergency medical needs. Our team of healthcare providers specializes in primary care, preventive medicine, and management of chronic conditions. We pride ourselves on providing personalized care in a comfortable environment, with shorter wait times than traditional hospital settings.`;
    case "pharmacy":
      return `${name} is your neighborhood pharmacy offering prescription services, over-the-counter medications, and health consultations. Our licensed pharmacists are available to answer your questions about medications, potential interactions, and proper usage. We also offer a range of health-related products and services to support your wellness needs.`;
    default:
      return `${name} provides essential healthcare services to meet the needs of our community.`;
  }
};

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
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  typeContainer: {
    backgroundColor: Colors.accent + "30",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    alignSelf: "flex-start",
    marginBottom: theme.spacing.xs,
  },
  type: {
    fontSize: theme.typography.fontSize.xs,
    color: Colors.secondary,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.xs,
  },
  ratingText: {
    fontSize: theme.typography.fontSize.sm,
    color: Colors.gray[600],
    marginLeft: theme.spacing.xs,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: theme.spacing.md,
  },
  infoText: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[800],
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  hoursText: {
    fontSize: theme.typography.fontSize.sm,
    color: Colors.gray[600],
    marginLeft: theme.spacing.md,
    marginTop: 2,
  },
  openText: {
    color: Colors.success,
    fontWeight: "500",
  },
  closedText: {
    color: Colors.danger,
    fontWeight: "500",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: "center",
    marginHorizontal: theme.spacing.xs,
    ...theme.shadows.small,
  },
  actionText: {
    fontSize: theme.typography.fontSize.sm,
    color: Colors.secondary,
    fontWeight: "500",
    marginTop: theme.spacing.xs,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.md,
  },
  servicesList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  serviceItem: {
    backgroundColor: Colors.gray[100],
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    margin: 4,
  },
  serviceText: {
    fontSize: theme.typography.fontSize.sm,
    color: Colors.gray[700],
  },
  aboutText: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[700],
    lineHeight: 22,
  },
});