import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import React from "react";

const MapViewComponent = ({ distance, region, coordinatesA, coordinatesB }) => {
  return (
    <MapView
      // style={{ flex: 1 }}
      region={region}
      paddingAdjustmentBehavior="automatic"
      style={StyleSheet.absoluteFillObject}
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
