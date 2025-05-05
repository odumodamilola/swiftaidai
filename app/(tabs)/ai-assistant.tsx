import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Keyboard,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme, globalStyles } from "@/constants/theme";
import Colors from "@/constants/colors";
import { Send, Image as ImageIcon, X, Mic, Trash2 } from "lucide-react-native";
import { ChatMessage } from "@/components/ChatMessage";
import { useAIChatStore } from "@/stores/aiChatStore";
import * as Haptics from "expo-haptics";

export default function AIAssistantScreen() {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const { messages, isLoading, sendMessage, error, clearMessages, pickImage } = useAIChatStore();
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    if (error) {
      Alert.alert(
        "Connection Error",
        "There was a problem connecting to the AI service. Please try again later.",
        [{ text: "OK" }]
      );
    }
  }, [error]);

  const handleSend = async () => {
    if ((message.trim() === "" && !selectedImage) || isLoading) return;
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    const userMessage = message;
    const userImage = selectedImage;
    
    setMessage("");
    setSelectedImage(undefined);
    
    await sendMessage(userMessage, userImage);
  };

  const handleImagePick = async () => {
    const imageUri = await pickImage();
    if (imageUri) {
      setSelectedImage(imageUri);
      inputRef.current?.focus();
    }
  };

  const handleClearImage = () => {
    setSelectedImage(undefined);
  };

  const handleClearChat = () => {
    clearMessages();
  };

  const handleQuickQuestionSelect = (question: string) => {
    setMessage(question);
    inputRef.current?.focus();
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Swift Aid</Text>
        <Text style={styles.logoSubtext}>AI Assistant</Text>
      </View>
      
      <Text style={styles.emptyStateTitle}>How can I help you today?</Text>
      <Text style={styles.emptyStateDescription}>
        Describe your emergency or ask any first aid question. I can provide guidance based on standard first aid protocols.
      </Text>
      
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>Try asking me:</Text>
        {examples.map((example, index) => (
          <TouchableOpacity
            key={`example-${index}`}
            style={styles.exampleButton}
            onPress={() => handleQuickQuestionSelect(example)}
          >
            <Text style={styles.exampleText}>{example}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.imagePromptContainer}>
        <TouchableOpacity
          style={styles.imagePromptButton}
          onPress={handleImagePick}
        >
          <ImageIcon size={24} color={Colors.primary} />
          <Text style={styles.imagePromptText}>
            You can also upload an image for analysis
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {messages.length > 0 && (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Swift Aid Assistant</Text>
            <TouchableOpacity onPress={handleClearChat} style={styles.clearButton}>
              <Trash2 size={18} color={Colors.gray[600]} />
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.chatContainer}>
          {messages.length === 0 ? (
            renderEmptyState()
          ) : (
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ChatMessage message={item} />}
              contentContainerStyle={styles.messagesList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        {selectedImage && (
          <View style={styles.selectedImageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            <TouchableOpacity style={styles.removeImageButton} onPress={handleClearImage}>
              <X size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={styles.attachButton} 
            onPress={handleImagePick}
          >
            <ImageIcon size={22} color={Colors.gray[600]} />
          </TouchableOpacity>
          
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your question..."
            placeholderTextColor={Colors.gray[500]}
            multiline
            maxLength={500}
            onSubmitEditing={handleSend}
          />
          
          <TouchableOpacity
            style={[
              styles.sendButton,
              (isLoading || (message.trim() === "" && !selectedImage)) && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={isLoading || (message.trim() === "" && !selectedImage)}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.white} size="small" />
            ) : (
              <Send size={20} color={Colors.white} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const examples = [
  "How do I perform CPR?",
  "What should I do for a severe burn?",
  "My child is choking, what should I do?",
  "How to treat a snake bite?",
  "What are the signs of a heart attack?",
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "600",
    color: Colors.secondary,
  },
  clearButton: {
    padding: theme.spacing.xs,
  },
  chatContainer: {
    flex: 1,
    padding: theme.spacing.md,
  },
  messagesList: {
    paddingBottom: theme.spacing.md,
  },
  inputContainer: {
    flexDirection: "row",
    padding: theme.spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    backgroundColor: Colors.gray[100],
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    paddingRight: theme.spacing.xl,
    maxHeight: 100,
    fontSize: theme.typography.fontSize.md,
    color: Colors.secondary,
    minHeight: 40,
  },
  attachButton: {
    marginRight: theme.spacing.sm,
    padding: theme.spacing.xs,
    alignSelf: "flex-end",
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: theme.borderRadius.round,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: theme.spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.gray[400],
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: theme.spacing.xl,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary,
  },
  logoSubtext: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.secondary,
    marginTop: theme.spacing.xs,
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },
  emptyStateDescription: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[600],
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },
  exampleContainer: {
    width: "100%",
  },
  exampleTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: "600",
    color: Colors.secondary,
    marginBottom: theme.spacing.sm,
  },
  exampleButton: {
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  exampleText: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.secondary,
  },
  errorContainer: {
    backgroundColor: Colors.danger + "20",
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  errorText: {
    color: Colors.danger,
    fontSize: theme.typography.fontSize.sm,
    textAlign: "center",
  },
  selectedImageContainer: {
    margin: theme.spacing.md,
    marginTop: 0,
    position: "relative",
    alignSelf: "flex-start",
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
    ...theme.shadows.small,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.md,
  },
  removeImageButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePromptContainer: {
    marginTop: theme.spacing.xl,
    width: "100%",
  },
  imagePromptButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  imagePromptText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    color: Colors.secondary,
  },
});