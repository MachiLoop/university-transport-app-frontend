import { View, Text, StyleSheet, Modal, Button, Image } from "react-native";
import ModalCard from "../../components/modalCard";
import DropdownComponent from "../../components/dropdownComponent";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/customButton";
import MapViewComponent from "../../components/mapViewComponent";
import * as Location from "expo-location";
import useMap from "../../utils/customHooks/useMap";
import useToastNotification from "../../utils/customHooks/useToastNotification";
import { calculatePrice } from "../../utils/customFunctions/calculatePrice";
import { bookTrip } from "../../utils/customFunctions/database";
import usePaystackPayment from "../../utils/customHooks/usePaystackPayment";
import ModalContent from "../../components/modalContent";

const Home = () => {
  const showToast = useToastNotification();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    distance,
    price,
    coordinatesA,
    coordinatesB,
    setDistance,
    setCoordinatesA,
    setCoordinatesB,
    region,
    curLocMarkerTitle,
    destLocMarkerTitle,
  } = useMap(currentLocation, destinationLocation);

  const { startTransaction, PaystackComponent } = usePaystackPayment({
    amount: price,
    onSuccess: async (res) => {
      try {
        const tripData = {
          currentLocation: curLocMarkerTitle,
          destination: destLocMarkerTitle,
          distance: distance.toFixed(2),
          price: calculatePrice(distance),
        };

        const response = await bookTrip(tripData);
        console.log(response.data);

        // if (response.success) {
        //   showToast("Payment Successful & Trip Booked!", "success");
        // } else {
        //   showToast(response.message || "Failed to book trip", "danger");
        // }
      } catch (error) {
        showToast("An error occurred while booking trip", "danger");
      } finally {
        setCurrentLocation(null);
        setDestinationLocation(null);
        setCoordinatesA(null);
        setCoordinatesB(null);
        setDistance(null);
        setModalVisible(false);
      }
    },
    onCancel: (e) => {
      console.log(typeof calculatePrice(distance));
      showToast("Payment Cancelled", "danger");
      setModalVisible(false);
    },
  });

  useEffect(() => {
    console.log(currentLocation);
    console.log(destinationLocation);
    console.log(coordinatesA);
    console.log(coordinatesB);
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

  const confirmLocation = () => {
    if (!currentLocation || !destinationLocation) {
      showToast("Fields cannot be empty", "danger");
    } else if (currentLocation == destinationLocation) {
      showToast("current and destination location must be different");
    } else {
      // console.log("hello");
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView className="flex-1 ">
      <MapViewComponent
        distance={distance}
        coordinatesA={coordinatesA}
        coordinatesB={coordinatesB}
        region={region}
        curLocMarkerTitle={curLocMarkerTitle}
        destLocMarkerTitle={destLocMarkerTitle}
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
            onPressHandler={confirmLocation}
          />
        </View>
      </View>
      {modalVisible && (
        <Modal
          animationType="slide" // 'slide', 'fade', or 'none'
          transparent={true} // Makes the background transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)} // Android back button handler
        >
          <ModalCard>
            <ModalContent title="Pickup point" value={curLocMarkerTitle} />
            <ModalContent title="Destination" value={destLocMarkerTitle} />
            <ModalContent title="Distance" value={distance.toFixed(2) + "km"} />
            <ModalContent title="Price" value={`NGN ${price}`} />
            <View className="flex-row justify-between items-center w-full mt-4">
              <CustomButton
                label="Cancel"
                onPressHandler={() => setModalVisible(false)}
                textStyles="text-center text-error-700 font-pmedium text-lg"
              />
              <CustomButton
                label="Proceed with payment"
                containerStyles="bg-primary-200 py-3 px-4 rounded-md"
                textStyles="text-center text-primary-800 font-pmedium"
                onPressHandler={startTransaction}
              />
            </View>
          </ModalCard>
        </Modal>
      )}
      <PaystackComponent />
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
