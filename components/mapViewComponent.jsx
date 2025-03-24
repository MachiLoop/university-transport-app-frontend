import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import React from "react";

const MapViewComponent = ({ distance, coordinatesA, coordinatesB }) => {
  return (
    <MapView
      // style={{ flex: 1 }}
      paddingAdjustmentBehavior="automatic"
      style={StyleSheet.absoluteFillObject}
      initialRegion={{
        latitude: coordinatesA ? coordinatesA.latitude : 7.4433, // Default latitude for UI
        longitude: coordinatesA ? coordinatesA.longitude : 3.9003, // Default longitude for UI
        latitudeDelta: 0.095,
        longitudeDelta: 0.095,
      }}
    >
      {coordinatesA && <Marker coordinate={coordinatesA} title="Location A" />}
      {coordinatesB && <Marker coordinate={coordinatesB} title="Location B" />}
      {coordinatesA && coordinatesB && (
        <Polyline
          coordinates={[coordinatesA, coordinatesB]}
          strokeColor="blue"
          strokeWidth={3}
        />
      )}
    </MapView>
  );
};

export default MapViewComponent;
