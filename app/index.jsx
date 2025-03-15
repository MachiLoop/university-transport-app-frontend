import { View, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";

const index = () => {
  return (
    <View>
      <Text>Hello</Text>
      <Link href="/home">Go to Home</Link>
    </View>
  );
};

export default index;
