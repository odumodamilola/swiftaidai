import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import Colors from "@/constants/colors";
import { ExternalLink, Share2, Bookmark, BookmarkCheck } from "lucide-react-native";
import { resources } from "@/mocks/resources";

export default function ResourceDetailScreen() {
  const { id } = useLocalSearchParams();
  const resourceId = typeof id === "string" ? id : "";
  const router = useRouter();
  
  const resource = resources.find((r) => r.id === resourceId);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  
  if (!resource) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <Stack.Screen options={{ title: "Not Found" }} />
        <View style={[styles.container, styles.centerContent]}>
          <Text style={styles.errorText}>Resource not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleOpenLink = async () => {
    try {
      await Linking.openURL(resource.url);
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };

  const handleShare = () => {
    // Share functionality would go here
    console.log("Sharing resource:", resource.title);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleRelatedPress = (relatedResource) => {
    router.push(`/resource/${relatedResource.id}`);
  };

  // Get related resources, filtering out the current one
  const relatedResources = resources
    .filter(r => r.id !== resource.id && r.category === resource.category);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Stack.Screen 
        options={{ 
          title: resource.category,
          headerRight: () => (
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.headerButton} onPress={toggleBookmark}>
                {isBookmarked ? (
                  <BookmarkCheck size={24} color={Colors.primary} />
                ) : (
                  <Bookmark size={24} color={Colors.gray[600]} />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
                <Share2 size={24} color={Colors.gray[600]} />
              </TouchableOpacity>
            </View>
          ),
        }} 
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Image source={{ uri: resource.imageUrl }} style={styles.image} />
        
        <View style={styles.content}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{resource.category}</Text>
          </View>
          
          <Text style={styles.title}>{resource.title}</Text>
          
          <Text style={styles.description}>{resource.description}</Text>
          
          <Text style={styles.fullContent}>
            {getFullContent(resource.category)}
          </Text>
          
          <TouchableOpacity style={styles.linkButton} onPress={handleOpenLink}>
            <Text style={styles.linkButtonText}>Visit Original Source</Text>
            <ExternalLink size={18} color={Colors.white} />
          </TouchableOpacity>
          
          {relatedResources.length > 0 && (
            <View style={styles.relatedContainer}>
              <Text style={styles.relatedTitle}>Related Resources</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {relatedResources.map((relatedResource) => (
                  <TouchableOpacity 
                    key={`related-${relatedResource.id}`}
                    style={styles.relatedItem}
                    onPress={() => handleRelatedPress(relatedResource)}
                  >
                    <Image source={{ uri: relatedResource.imageUrl }} style={styles.relatedImage} />
                    <Text style={styles.relatedItemTitle} numberOfLines={2}>{relatedResource.title}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getFullContent = (category: string) => {
  // This would typically come from a more detailed API or database
  // For now, we'll generate some placeholder content based on the category
  switch (category) {
    case "CPR":
      return "Cardiopulmonary resuscitation (CPR) is a lifesaving technique that is useful in many emergencies, such as a heart attack or near drowning, in which someone's breathing or heartbeat has stopped.\n\nThe American Heart Association recommends starting CPR with hard and fast chest compressions. This hands-only CPR recommendation applies to both untrained bystanders and first responders.\n\nBefore you begin CPR, check:\n• Is the environment safe for the person?\n• Is the person conscious or unconscious?\n• If the person appears unconscious, tap or shake his or her shoulder and ask loudly, \"Are you OK?\"\n• If the person does not respond and two people are available, have one person call 911 or the local emergency number and get the AED, if one is available, and have the other person begin CPR.\n• If you are alone and have immediate access to a telephone, call 911 or your local emergency number before beginning CPR. Get the AED if one is available.\n\nAs soon as an AED is available, deliver one shock if instructed by the device, then begin CPR.";
    
    case "Bleeding":
      return "Severe bleeding can be life-threatening and requires immediate first aid. Here is what to do:\n\n1. Apply direct pressure: Use a clean cloth, gauze pad, or even your hand (if no other option) to apply firm, direct pressure to the wound. This helps slow blood flow and allows clotting to begin.\n\n2. Maintain pressure: Continue to apply firm pressure for at least 15 minutes. Do not remove the cloth if it becomes soaked with blood; add more material on top.\n\n3. Elevate the wound: If possible, elevate the wounded area above the level of the heart to help slow bleeding.\n\n4. Clean the wound: Once bleeding is controlled, gently clean the wound with soap and water if available. Remove any visible debris or dirt.\n\n5. Apply a bandage: Cover the wound with a sterile bandage or clean cloth and secure it firmly.\n\n6. Seek medical attention: All serious wounds require professional medical care to prevent infection and ensure proper healing.\n\nIf bleeding does not stop with direct pressure, and you are trained to do so, a tourniquet may be necessary for limb injuries. Apply it 2-3 inches above the wound, not on a joint, and note the time of application.";
    
    case "Burns":
      return "Burns are classified by their severity:\n\nFirst-degree burns affect only the outer layer of skin. The burn site is red, painful, dry, and with no blisters. Mild sunburn is an example.\n\nSecond-degree burns affect both the outer and underlying layer of skin. The burn site appears red, blistered, and may be swollen and painful.\n\nThird-degree burns extend into deeper tissues. The burn site appears white or charred, and may be numb.\n\nFor minor burns:\n1. Cool the burn with cool (not cold) running water for 10-15 minutes or until pain subsides.\n2. Remove rings or other tight items from the burned area.\n3. Do not break blisters.\n4. Apply lotion with aloe vera.\n5. Bandage the burn loosely with a sterile gauze bandage.\n\nFor major burns:\n1. Call 911 or emergency medical help.\n2. Protect the burned person from further harm.\n3. Remove jewelry, belts and other restrictive items.\n4. Cover the area of the burn with a cool, moist bandage or clean cloth.\n5. Elevate the burned area.\n6. Watch for signs of shock.";
    
    default:
      return "This resource provides detailed information about proper first aid techniques for " + category.toLowerCase() + " situations. Always remember that while first aid is crucial, it is the initial response to an emergency and not a replacement for professional medical care. After administering first aid, seek appropriate medical attention as needed.\n\nStaying calm during an emergency is essential. Take a deep breath, assess the situation, and follow the steps you have learned. Your quick action can make a significant difference in the outcome of an emergency situation.\n\nRegular practice and refreshing your first aid knowledge is recommended. Consider taking a certified first aid course to gain hands-on experience under professional guidance.";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingBottom: theme.spacing.xxl,
  },
  centerContent: {
    padding: theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: theme.typography.fontSize.lg,
    color: Colors.gray[600],
  },
  headerButtons: {
    flexDirection: "row",
  },
  headerButton: {
    marginLeft: theme.spacing.md,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  content: {
    padding: theme.spacing.md,
  },
  categoryContainer: {
    backgroundColor: Colors.accent + "30",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    alignSelf: "flex-start",
    marginBottom: theme.spacing.sm,
  },
  category: {
    fontSize: theme.typography.fontSize.xs,
    color: Colors.secondary,
    fontWeight: "500",
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.typography.fontSize.lg,
    color: Colors.gray[700],
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
  },
  fullContent: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[800],
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  linkButton: {
    backgroundColor: Colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.xl,
  },
  linkButtonText: {
    color: Colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: "600",
    marginRight: theme.spacing.sm,
  },
  relatedContainer: {
    marginTop: theme.spacing.md,
  },
  relatedTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.md,
  },
  relatedItem: {
    width: 150,
    marginRight: theme.spacing.md,
  },
  relatedImage: {
    width: 150,
    height: 100,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
  },
  relatedItemTitle: {
    fontSize: theme.typography.fontSize.sm,
    color: Colors.secondary,
    fontWeight: "500",
  },
});