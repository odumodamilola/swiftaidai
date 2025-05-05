
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { theme } from "@/constants/theme";
import Colors from "@/constants/colors";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

export const Card = ({
  title,
  subtitle,
  children,
  onPress,
  style,
  contentStyle,
}: CardProps) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      <View style={[styles.content, contentStyle]}>{children}</View>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  header: {
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: Colors.gray[600],
  },
  content: {},
});