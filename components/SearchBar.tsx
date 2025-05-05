import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "@/constants/theme";
import Colors from "@/constants/colors";
import { Search, X } from "lucide-react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search...",
  onClear,
}: SearchBarProps) => {
  const handleClear = () => {
    onChangeText("");
    if (onClear) onClear();
  };

  return (
    <View style={styles.container}>
      <Search size={20} color={Colors.gray[500]} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray[500]}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <X size={18} color={Colors.gray[500]} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    height: 50,
    ...theme.shadows.small,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    color: Colors.secondary,
  },
  clearButton: {
    padding: theme.spacing.xs,
  },
});