import React from "react";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import Colors from "@/constants/colors";
import { Home, MessageCircle, MapPin, BookOpen, User } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray[500],
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.gray[200],
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerTintColor: Colors.secondary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: "Swift Aid",
        }}
      />
      <Tabs.Screen
        name="ai-assistant"
        options={{
          title: "AI Assistant",
          tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} />,
          headerTitle: "AI Assistant",
        }}
      />
      <Tabs.Screen
        name="nearby"
        options={{
          title: "Nearby",
          tabBarIcon: ({ color, size }) => <MapPin size={size} color={color} />,
          headerTitle: "Nearby Facilities",
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: "Resources",
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
          headerTitle: "First Aid Resources",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          headerTitle: "Your Profile",
        }}
      />
    </Tabs>
  );
}