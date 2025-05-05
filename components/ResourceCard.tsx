import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { theme } from "@/constants/theme";
import Colors from "@/constants/colors";
import { ExternalLink } from "lucide-react-native";

export type ResourceType = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  url: string;
};

interface ResourceCardProps {
  resource: ResourceType;
  onPress: (resource: ResourceType) => void;
}

export const ResourceCard = ({ resource, onPress }: ResourceCardProps) => {
  const { title, description, imageUrl, category } = resource;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(resource)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{category}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.readMore}>
          <Text style={styles.readMoreText}>Read More</Text>
          <ExternalLink size={14} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.lg,
    overflow: "hidden",
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  image: {
    width: "100%",
    height: 150,
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
    marginBottom: theme.spacing.xs,
  },
  category: {
    fontSize: theme.typography.fontSize.xs,
    color: Colors.secondary,
    fontWeight: "500",
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.typography.fontSize.sm,
    color: Colors.gray[600],
    marginBottom: theme.spacing.sm,
  },
  readMore: {
    flexDirection: "row",
    alignItems: "center",
  },
  readMoreText: {
    fontSize: theme.typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: "500",
    marginRight: 4,
  },
});