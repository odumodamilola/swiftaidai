import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/colors";
import { theme } from "@/constants/theme";
import { Button } from "@/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Heart, AlertTriangle, Phone, MessageCircle } from "lucide-react-native";

const onboardingData = [
  {
    id: "1",
    title: "Welcome to Swift Aid",
    description: "Your personal first aid assistant, providing immediate guidance in emergency situations.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop",
    icon: <Heart size={40} color={Colors.primary} />,
  },
  {
    id: "2",
    title: "Emergency Guidance",
    description: "Access step-by-step instructions for common first aid scenarios, from CPR to treating burns.",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1000&auto=format&fit=crop",
    icon: <AlertTriangle size={40} color={Colors.primary} />,
  },
  {
    id: "3",
    title: "Find Medical Help",
    description: "Locate nearby hospitals, clinics, and pharmacies with contact information and directions.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
    icon: <Phone size={40} color={Colors.primary} />,
  },
  {
    id: "4",
    title: "AI Assistant",
    description: "Get personalized first aid advice from our AI assistant for any emergency situation.",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1000&auto=format&fit=crop",
    icon: <MessageCircle size={40} color={Colors.primary} />,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      router.replace("/auth");
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={onboardingData}
        renderItem={({ item }) => (
          <OnboardingItem item={item} width={width} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
      
      <View style={styles.bottomContainer}>
        <View style={styles.indicatorContainer}>
          {onboardingData.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: "clamp",
            });
            
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            
            return (
              <Animated.View
                key={`indicator-${index}`}
                style={[
                  styles.indicator,
                  { width: dotWidth, opacity },
                ]}
              />
            );
          })}
        </View>
        
        <Button
          title={currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </View>
  );
}

interface OnboardingItemProps {
  item: {
    title: string;
    description: string;
    image: string;
    icon: React.ReactNode;
  };
  width: number;
}

const OnboardingItem = ({ item, width }: OnboardingItemProps) => {
  return (
    <View style={[styles.itemContainer, { width }]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={[styles.image, { width: width * 0.8 }]}
        />
        <View style={styles.iconContainer}>{item.icon}</View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  skipContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[600],
    fontWeight: "500",
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.xl,
  },
  image: {
    height: 300,
    resizeMode: "cover",
    borderRadius: theme.borderRadius.xl,
  },
  iconContainer: {
    position: "absolute",
    bottom: -25,
    backgroundColor: Colors.white,
    borderRadius: 50,
    padding: theme.spacing.md,
    ...theme.shadows.medium,
  },
  textContainer: {
    alignItems: "center",
    marginTop: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },
  description: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[600],
    textAlign: "center",
    paddingHorizontal: theme.spacing.md,
    lineHeight: 24,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    paddingHorizontal: theme.spacing.lg,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: theme.spacing.lg,
  },
  indicator: {
    height: 10,
    backgroundColor: Colors.primary,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  button: {
    width: "100%",
  },
});