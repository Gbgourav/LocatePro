import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  const handleLocationPress = () => {
    navigation.navigate("Location");
  };

  const navigateToBatteryStatusScreen = () => {
    navigation.navigate("BatteryStatus");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to LocatePro</Text>
      <Text style={styles.subtitle}>
        Stay connected and in control with Locate Pro! Get automatic location
        updates every 10 minutes, ensuring you always know your whereabouts for
        peace of mind and enhanced convenience.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLocationPress}>
        <Text style={styles.buttonText}>Track Your Location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={navigateToBatteryStatusScreen}
      >
        <Text style={styles.buttonText}>Check Battery Status</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "gray",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "gray",
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

export default HomeScreen;
