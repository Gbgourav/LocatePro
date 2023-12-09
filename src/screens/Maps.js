import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";

const Maps = ({ route }) => {
  const { locationHistory } = route.params;
  const [currentLocation, setCurrentLocation] = useState();
  const [coords, setCoords] = useState([]);

  // const coords = [
  //  //  28.761984238441556, 78.19349023066877
  //  { latitude: 28.685252169900885, longitude:  77.22157187898993 },
  //  { latitude: 28.67345897115341, longitude: 77.43724939570014 },
  //  { latitude: 28.70346135882957, longitude:77.64936481028536},
  //  { latitude: 28.728302188900578, longitude: 77.7810372954526 },
  //  { latitude: 28.74317529920604, longitude: 77.99649410578583 },
  //  { latitude: 28.761984238441556, longitude: 78.19349023066877 },
  // ];

  useEffect(() => {
    if (locationHistory.length > 0) {
      setCurrentLocation(locationHistory[0]);
      const coordinatesWithoutTimestamp = locationHistory.map((coordinate) => ({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      }));
      setCoords(coordinatesWithoutTimestamp);
    }
  }, [locationHistory]);

  const getRotation = (coords, index) => {
    if (index < coords.length - 1) {
      const { latitude: lat1, longitude: lon1 } = coords[index];
      const { latitude: lat2, longitude: lon2 } = coords[index + 1];
      const angle = Math.atan2(lon2 - lon1, lat2 - lat1) * (180 / Math.PI);

      return angle;
    }

    return 0;
  };
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        rotateEnabled={false}
        style={styles.map}
        region={{
          latitude: currentLocation?.latitude || 37.78825,
          longitude: currentLocation?.longitude || -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {coords.length > 1
          ? coords.map((coordinate, index) => (
              <React.Fragment key={index}>
                <Marker
                  coordinate={coordinate}
                  anchor={{ x: 0.5, y: 0.5 }}
                  rotation={getRotation(coords, index)}
                >
                  {index === coords.length - 1 ? (
                    <Marker coordinate={coordinate}>
                      <View
                        style={{
                          backgroundColor: "red",
                          borderRadius: 90,
                          height: 35,
                          width: 35,
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text>stop</Text>
                      </View>
                    </Marker>
                  ) : (
                    <Image
                      source={require("../../assets/image/arrow.png")}
                      style={{
                        width: 20,
                        height: 20,
                        transform: [{ rotate: `-${90}deg` }],
                      }}
                    />
                  )}
                </Marker>
                {index < coords.length - 1 && (
                  <Polyline
                    coordinates={[coordinate, coords[index + 1]]}
                    strokeWidth={2}
                    strokeColor="red"
                  />
                )}
              </React.Fragment>
            ))
          : coords.length === 1 && (
              <Marker coordinate={coords[0]} title="Current Location" />
            )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  arrow: {
    width: 30,
    height: 30,
  },
});

export default Maps;
