import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { theme } from "@/constants/theme";
import Colors from "@/constants/colors";
import { LucideIcon } from "lucide-react-native";

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  color?: string;
}

export const CategoryCard = ({
  title,
  icon,
  onPress,
  color = Colors.primary,
}: CategoryCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
        {icon}
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    margin: theme.spacing.xs,
    ...theme.shadows.small,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.round,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: "500",
    color: Colors.secondary,
    textAlign: "center",
  },
});