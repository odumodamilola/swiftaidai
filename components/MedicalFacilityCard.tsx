import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions } from "react-native";
import { theme } from "@/constants/theme";
import Colors from "@/constants/colors";

export type MessageType = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date | string | number;
  imageUri?: string;
  isTyping?: boolean;
};

interface ChatMessageProps {
  message: MessageType;
}

const { width } = Dimensions.get("window");
const MAX_IMAGE_WIDTH = width * 0.6;

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const { text, isUser, imageUri, isTyping } = message;

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
      ]}
    >
      {!isUser && (
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>SA</Text>
        </View>
      )}
      
      <View style={styles.messageContent}>
        {imageUri && (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: imageUri }} 
              style={styles.image} 
              resizeMode="cover"
            />
          </View>
        )}
        
        <View
          style={[
            styles.bubble,
            isUser ? styles.userBubble : styles.botBubble,
          ]}
        >
          {isTyping ? (
            <View style={styles.typingContainer}>
              <ActivityIndicator size="small" color={isUser ? Colors.white : Colors.primary} />
              <Text style={[styles.typingText, isUser ? styles.userText : styles.botText]}>
                Thinking...
              </Text>
            </View>
          ) : (
            <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>
              {text}
            </Text>
          )}
        </View>
        
        <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.botTimestamp]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

const formatTime = (date: Date | string | number) => {
  // Ensure we have a valid Date object
  let dateObj: Date;
  
  try {
    if (date instanceof Date) {
      dateObj = date;
    } else if (typeof date === 'string' || typeof date === 'number') {
      dateObj = new Date(date);
    } else {
      return "Just now";
    }
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return "Just now";
    }
    
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Just now";
  }
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.sm,
    maxWidth: "85%",
    flexDirection: "row",
  },
  userContainer: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  botContainer: {
    alignSelf: "flex-start",
  },
  messageContent: {
    flexDirection: "column",
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.sm,
    marginTop: 4,
  },
  avatarText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.white,
  },
  bubble: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    maxWidth: "100%",
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: Colors.gray[200],
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: theme.typography.fontSize.md,
    lineHeight: 22,
  },
  userText: {
    color: Colors.white,
  },
  botText: {
    color: Colors.secondary,
  },
  imageContainer: {
    marginBottom: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
    maxWidth: MAX_IMAGE_WIDTH,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: theme.borderRadius.md,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    marginHorizontal: 4,
  },
  userTimestamp: {
    color: Colors.gray[500],
    alignSelf: "flex-end",
  },
  botTimestamp: {
    color: Colors.gray[500],
    alignSelf: "flex-start",
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  typingText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
  },
});