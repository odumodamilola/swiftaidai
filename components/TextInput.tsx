import React from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
  ViewStyle,
} from "react-native";
import Colors from "@/constants/colors";
import { theme } from "@/constants/theme";

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  rightIcon?: React.ReactNode;
}

export const TextInput = ({
  label,
  error,
  containerStyle,
  rightIcon,
  ...props
}: TextInputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <RNTextInput
          style={[
            styles.input,
            error ? styles.inputError : null,
            rightIcon ? styles.inputWithIcon : null,
          ]}
          placeholderTextColor={Colors.gray[500]}
          {...props}
        />
        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: "500",
    color: Colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    backgroundColor: Colors.gray[100],
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: Colors.secondary,
  },
  inputError: {
    borderWidth: 1,
    borderColor: Colors.danger,
  },
  inputWithIcon: {
    paddingRight: 50,
  },
  rightIconContainer: {
    position: "absolute",
    right: theme.spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  errorText: {
    fontSize: theme.typography.fontSize.sm,
    color: Colors.danger,
    marginTop: theme.spacing.xs,
  },
});