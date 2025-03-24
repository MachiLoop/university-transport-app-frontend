import { View, Text, ImageBackground, Image } from "react-native";
import DropdownComponent from "../../components/dropdownComponent";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";
import CustomButton from "../../components/customButton";
import { router } from "expo-router";

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);

  useEffect(() => {
    console.log(currentLocation);
    console.log(destinationLocation);
  }, [currentLocation, destinationLocation]);

  return (
    <SafeAreaView className="flex-1 ">
      <ImageBackground
        source={images.map3}
        resizeMode="cover"
        className="flex-1 justify-end"
      >
        <View className="bg-primary-700 self-start px-4 py-4 mb-3  rounded-r-md">
          <Text className="text-shadeWhite">Book a ride!</Text>
        </View>
        <View className="mb-10 bg-shadeWhite px-4 py-6 mx-2 rounded-xl ">
          <Text className="text-center font-pmedium text-contentSecondary">
            Select Address
          </Text>
          <View className="mb-1 gap-6 mt-3">
            <DropdownComponent
              value={currentLocation}
              setValue={setCurrentLocation}
              label="Current location"
              placeholder="Where are you?"
            />
            {/* <Image source={icons.downArrow} className="w-6 h-6 self-center" /> */}
            <DropdownComponent
              value={destinationLocation}
              setValue={setDestinationLocation}
              label="Destination location"
              placeholder="Where do you wish to go?"
            />
          </View>
          <CustomButton
            label="Confirm"
            containerStyles="bg-primary-700 py-4 rounded-md mt-4"
            textStyles="text-center text-shadeWhite font-pmedium"
            onPressHandler={() => router.push("/bookings")}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
