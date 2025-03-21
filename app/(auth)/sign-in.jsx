import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInputForm from "../../components/TextInputForm";
import { Link, router } from "expo-router";
import CustomButton from "../../components/customButton";
import { useWindowDimensions } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { width, height } = useWindowDimensions();
  // console.log(width, height);

  return (
    <SafeAreaView className="px-4 flex-1 mt-12 justify-between">
      <View>
        <View className="gap-1">
          <Text className="text-3xl">Sign In Account</Text>
          <Text className="text-neutral-700">
            Please login with registered account
          </Text>
        </View>
        <View className="mt-10 gap-6">
          <TextInputForm
            title="Email"
            label="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            placeholder="Enter your email"
            labelStyles="font-psemibold"
            inputContainerStyles="border-2 border-neutral-200 rounded-md flex-row items-center justify-between px-2"
            inputFieldStyles="flex-1"
          />
          <TextInputForm
            title="Password"
            label="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder="Enter your password"
            labelStyles="font-psemibold"
            inputContainerStyles="border-2 border-neutral-200 rounded-md flex-row items-center justify-between px-2"
            inputFieldStyles="flex-1"
          />
        </View>
        <CustomButton
          label="Sign in"
          containerStyles="bg-primary-700 py-4 rounded-md mt-4"
          textStyles="text-center text-shadeWhite font-pmedium"
          onPressHandler={() => router.push("/home")}
        />
      </View>
      <View className="flex-row gap-1 mb-12 items-center justify-center ">
        <Text className="font-psemibold">Don't have an account yet?</Text>
        <Link href="/sign-up" className="text-primary-700 font-psemibold">
          Sign up
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
