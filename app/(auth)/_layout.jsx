import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign-up"
        options={{ headerShown: true, headerTitle: "Sign up" }}
      />
    </Stack>
  );
};

export default AuthLayout;
