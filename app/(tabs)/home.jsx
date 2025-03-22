import { View, Text } from "react-native";
import DropdownComponent from "../../components/dropdownComponent";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);

  useEffect(() => {
    console.log(currentLocation);
    console.log(destinationLocation);
  }, [currentLocation, destinationLocation]);

  return (
    <SafeAreaView>
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
        placeholder="Where do you want to go?"
      />
    </SafeAreaView>
  );
};

export default Home;
