import { StyleSheet } from "react-native";
import Colors from "./colors";

export const theme = {
  colors: Colors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    round: 9999,
  },
  typography: {
    fontFamily: {
      regular: "System",
      medium: "System",
      bold: "System",
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
  },
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenContainer: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: Colors.background,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "600",
    color: Colors.secondary,
    marginBottom: theme.spacing.sm,
  },
  text: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[800],
    marginBottom: theme.spacing.sm,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: "600",
  },
});