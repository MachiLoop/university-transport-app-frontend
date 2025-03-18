// export default OnboardingScreen;
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import navigation
import slides from "../data/slide";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Index = () => {
  const flatListRef = useRef(null);
  const progress = useRef(new Animated.Value(1 / slides.length)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter(); // Navigation hook

  const totalSlides = slides.length;

  const skip = () => {
    router.replace("/sign-in");
  };

  const moveToNextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });

      Animated.timing(progress, {
        toValue: (nextIndex + 1) / totalSlides,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    if (currentIndex < totalSlides - 1) {
      const interval = setInterval(moveToNextSlide, 2000);
      return () => clearInterval(interval);
    } else {
      // Wait for 2 seconds before navigating on the last slide
      const timeout = setTimeout(() => {
        router.replace("/sign-in");
        // console.log("hello");
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const circleSize = 80;
  const strokeWidth = 8;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedStrokeDashoffset = progress.interpolate({
    inputRange: [1 / totalSlides, 1],
    outputRange: [circumference * (2 / 3), 0],
  });

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            style={{
              width,
              height,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={item.image}
              style={{
                width: width * 0.8,
                height: height * 0.3,
                resizeMode: "contain",
              }}
            />
            <Text className="text-3xl mt-3 text-center text-contentSecondary font-pmedium">
              {item.title}
            </Text>
            <Text
              style={{ color: "#A0A0A0" }}
              className="text-xl mt-2 text-center"
            >
              {item.description}
            </Text>
          </View>
        )}
      />

      {/* Circular Progress Indicator with Arrow (Always Visible) */}
      <TouchableOpacity
        onPress={moveToNextSlide}
        activeOpacity={0.8}
        style={{ position: "absolute", top: 50, right: 20 }}
      >
        <Svg width={circleSize} height={circleSize}>
          <Circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="#ddd"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <AnimatedCircle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="#08B783"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={animatedStrokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>

        <View
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: [{ translateX: -14 }, { translateY: -14 }],
          }}
        >
          <AntDesign name="arrowright" size={28} color="#08B783" />
        </View>
      </TouchableOpacity>
      {currentIndex < totalSlides - 1 && (
        <Pressable
          className="text-contentSecondary"
          style={{ position: "absolute", top: 50, left: 20 }}
          onPress={skip}
        >
          <Text>Skip</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default Index;
