// Function to get coordinates for a location name
import * as Location from "expo-location";

export const getCoordinates = async (locationName) => {
  console.log(locationName);
  try {
    const geocode = await Location.geocodeAsync(locationName);
    return geocode[0]; // Get the first result (latitude, longitude)
  } catch (error) {
    console.error("Error getting coordinates:", error);
    return null;
  }
};
