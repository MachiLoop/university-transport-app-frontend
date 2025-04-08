import { View, Text, Image, Pressable } from "react-native";
import { icons, images } from "../../constants";
import React from "react";

const profile = () => {
  const fullName = "hamidu sodiq";
  const email = "hamidusodiq2@gmail.com";
  return (
    <View className="mt-8 px-4 flex-1 ">
      <View className="items-center gap-2">
        <Image source={images.profile} className="rounded-full w-56 h-56" />
        <Text className="text-2xl">Hi, {fullName.toLowerCase()}!</Text>
        <View className="border border-l-neutral-600 rounded-full px-7 py-3">
          <Text className="text-primary-800 font-psemibold">{email}</Text>
        </View>
      </View>
      <View className="mt-16 gap-8">
        <View className="gap-6">
          <Text className="text-neutral-700 font-pmedium">SUPPORT</Text>
          <View className="flex-row justify-between ">
            <View className="flex-row gap-2 items-center">
              <Image source={icons.telephone} className="w-5 h-5" />
              <Text className="font-pmedium text-neutral-800 text-lg">
                Contact support{" "}
              </Text>
            </View>
            <Image source={icons.rightCaret} className="w-5 h-5" />
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row gap-2 items-center">
              <Image source={icons.question} className="w-5 h-5" />
              <Text className="font-pmedium text-neutral-800 text-lg">
                Frequently asked questions{" "}
              </Text>
            </View>
            <Image source={icons.rightCaret} className="w-5 h-5" />
          </View>
        </View>

        <View className="gap-6">
          <Text className="text-neutral-700 font-pmedium">LEGAL</Text>
          <View className="flex-row justify-between">
            <View className="flex-row gap-2 items-center">
              <Image source={icons.user} className="w-5 h-5" />
              <Text className="font-pmedium text-neutral-800 text-lg">
                Privacy policy{" "}
              </Text>
            </View>
            <Image source={icons.rightCaret} className="w-5 h-5" />
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row gap-2 items-center">
              <Image source={icons.file} className="w-5 h-5" />
              <Text className="font-pmedium text-neutral-800 text-lg">
                Terms of use{" "}
              </Text>
            </View>
            <Image source={icons.rightCaret} className="w-5 h-5" />
          </View>
        </View>
      </View>
      <Pressable
        className="items-center flex-row justify-center gap-2 mt-8"
        onPress={() => console.log("hello")}
      >
        <Image source={icons.logout} tintColor="red" className="w-8 h-8" />
        <Text className="text-xl text-neutral-800">Logout</Text>
      </Pressable>
    </View>
  );
};

export default profile;
