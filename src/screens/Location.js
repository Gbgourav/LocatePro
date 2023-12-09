import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Location = ({ navigation }) => {
  const handleLocationPress = () => {
    navigation.navigate("Maps");
  };

  const navigateToBatteryStatusScreen = () => {
    navigation.navigate("LocationList");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Through this feature, you can check the update of your last 10 minutes'
        location and view the directions of your moments on the map.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLocationPress}>
        <Text style={styles.buttonText}>Track Directions</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={navigateToBatteryStatusScreen}
      >
        <Text style={styles.buttonText}>Updated Location Every 10 Min</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: "gray",
    marginVertical: 25,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "lightgray",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Location;
