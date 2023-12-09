import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const LocationList = ({ route }) => {
  const { locationHistory } = route.params;

  const renderLocationItem = ({ item }) => (
    <View style={styles.locationItem}>
      <Text style={{ color: "blue", paddingVertical: 5, fontSize: 16 }}>
        Place: {item.location}
      </Text>
      <Text style={{ color: "black" }}>Latitude: {item.latitude}</Text>
      <Text style={{ color: "black" }}>Longitude: {item.longitude}</Text>
      <Text style={{ color: "gray" }}>Time: {item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={locationHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderLocationItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  locationItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default LocationList;
