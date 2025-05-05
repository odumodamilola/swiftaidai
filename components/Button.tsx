import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from "react-native";
import Colors from "@/constants/colors";
import { theme } from "@/constants/theme";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  iconPosition = "left",
  ...rest
}: ButtonProps) => {
  const getBackgroundColor = () => {
    if (disabled) return Colors.gray[400];
    
    switch (variant) {
      case "primary":
        return Colors.primary;
      case "secondary":
        return Colors.secondary;
      case "outline":
        return "transparent";
      case "danger":
        return Colors.danger;
      default:
        return Colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return Colors.gray[600];
    
    switch (variant) {
      case "outline":
        return Colors.primary;
      default:
        return Colors.white;
    }
  };

  const getBorderColor = () => {
    if (disabled) return Colors.gray[400];
    
    switch (variant) {
      case "outline":
        return Colors.primary;
      default:
        return "transparent";
    }
  };

  const getPadding = () => {
    switch (size) {
      case "small":
        return { paddingVertical: 8, paddingHorizontal: 12 };
      case "medium":
        return { paddingVertical: 12, paddingHorizontal: 16 };
      case "large":
        return { paddingVertical: 16, paddingHorizontal: 24 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 16 };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "small":
        return 14;
      case "medium":
        return 16;
      case "large":
        return 18;
      default:
        return 16;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === "outline" ? 1 : 0,
          ...getPadding(),
        },
        style,
      ]}
      activeOpacity={0.8}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          <Text
            style={[
              styles.text,
              { color: getTextColor(), fontSize: getFontSize() },
              icon && { marginLeft: iconPosition === "right" ? 0 : 8, marginRight: iconPosition === "left" ? 0 : 8 },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.lg,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
  },
});