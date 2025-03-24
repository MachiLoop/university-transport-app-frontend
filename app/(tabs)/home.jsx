import { View, Text, ImageBackground, StyleSheet } from "react-native";
import DropdownComponent from "../../components/dropdownComponent";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "../../components/customButton";
import { getCoordinates } from "../../utils/getCoordinates";
import MapViewComponent from "../../components/mapViewComponent";
import { calculateDistance } from "../../utils/calculateDistance";
import * as Location from "expo-location";
import { router } from "expo-router";

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [coordinatesA, setCoordinatesA] = useState(null);
  const [coordinatesB, setCoordinatesB] = useState(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    console.log(currentLocation);
    console.log(destinationLocation);
  }, [currentLocation, destinationLocation]);

  // Request location permissions
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
      }
    })();
  }, []);

  // Fetch coordinates and calculate distance
  useEffect(() => {
    const fetchData = async () => {
      const coordA = await getCoordinates("Tedder Hall, university of ibadan");
      const coordB = await getCoordinates(
        "Mellanby Hall, university of ibadan"
      ); // Replace with actual place name
      setCoordinatesA(coordA);
      setCoordinatesB(coordB);

      if (coordA && coordB) {
        const dist = calculateDistance(
          coordA.latitude,
          coordA.longitude,
          coordB.latitude,
          coordB.longitude
        );
        setDistance(dist);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 ">
      <MapViewComponent
        distance={distance}
        coordinatesA={coordinatesA}
        coordinatesB={coordinatesB}
      />
      <View style={styles.card}>
        <View className="bg-primary-700 self-start px-4 py-4 mb-3  rounded-r-md">
          <Text className="text-shadeWhite">Book a ride!</Text>
        </View>
        <View className="mb-2 bg-shadeWhite px-4 py-6 mx-2 rounded-xl ">
          <Text className="text-center text-lg font-pmedium text-contentSecondary">
            Select Address
          </Text>
          <View className="gap-2 mt-2">
            <DropdownComponent
              value={currentLocation}
              setValue={setCurrentLocation}
              label="Current location"
              placeholder="Where are you?"
            />

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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default Home;
