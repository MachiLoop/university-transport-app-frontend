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
import locations from "../../data/locations";
import { router } from "expo-router";

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [coordinatesA, setCoordinatesA] = useState(null);
  const [coordinatesB, setCoordinatesB] = useState(null);
  const [distance, setDistance] = useState(0);
  const [region, setRegion] = useState({
    latitude: 7.4433, // Default center (University of Ibadan)
    longitude: 3.9003,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

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

  //find label of the currentlocaion and selected location
  const currentLocationName =
    locations.find((loc) => loc.value == currentLocation)?.name || null;
  const destinationLocationName =
    locations.find((loc) => loc.value == destinationLocation)?.name || null;

  // Fetch coordinates and calculate distance
  useEffect(() => {
    const fetchData = async () => {
      console.log(currentLocationName, destinationLocationName);
      const coordA = await getCoordinates(currentLocationName);
      const coordB = await getCoordinates(destinationLocationName); // Replace with actual place name
      setCoordinatesA(coordA);
      setCoordinatesB(coordB);

      if (coordA && coordB) {
        const dist = calculateDistance(
          coordA.latitude,
          coordA.longitude,
          coordB.latitude,
          coordB.longitude
        );
        console.log("distance: " + distance);
        setDistance(dist);

        // Calculate center point
        const midLat = (coordA.latitude + coordB.latitude) / 2;
        const midLon = (coordA.longitude + coordB.longitude) / 2;

        // Adjust zoom based on distance
        const newLatitudeDelta = Math.min(Math.max(dist / 50, 0.005), 0.1);
        const newLongitudeDelta = newLatitudeDelta * (16 / 9); // Aspect ratio adjustment

        setRegion({
          latitude: midLat,
          longitude: midLon,
          latitudeDelta: newLatitudeDelta,
          longitudeDelta: newLongitudeDelta,
        });
      }
    };

    if (currentLocation && destinationLocation) {
      fetchData();
      // console.log(distance);
    }
  }, [currentLocation, destinationLocation]);

  return (
    <SafeAreaView className="flex-1 ">
      <MapViewComponent
        distance={distance}
        coordinatesA={coordinatesA}
        coordinatesB={coordinatesB}
        region={region}
        curLocMarkerTitle={
          locations.find((loc) => loc.value == currentLocation)?.label
        }
        destLocMarkerTitle={
          locations.find((loc) => loc.value == destinationLocation)?.label
        }
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
