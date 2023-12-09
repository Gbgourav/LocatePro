import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  faBatteryHalf,
  faCarBattery,
  faMugSaucer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import SpinnerOverlay from "react-native-loading-spinner-overlay";

const BatteryDataScreen = ({ route }) => {
  const { batteryData, isLoading } = route.params;

  const getStatusMessageStyle = () => {
    const { batteryLevel } = batteryData;
    let message, color;

    if (batteryLevel <= 20) {
      message = "Your device's battery is running low!";
      color = "#e74c3c";
    } else if (batteryLevel <= 50) {
      message = "Your device's battery is moderately charged.";
      color = "#f39c12";
    } else {
      message = "Your device's battery is in good condition.";
      color = "#2ecc71";
    }

    return {
      message,
      text: { ...styles.statusMessage, color },
    };
  };

  return (
    <View style={styles.container}>
      <SpinnerOverlay
        visible={isLoading}
        overlayColor="white"
        color="gray"
        size="large"
        textContent={"Please wait..."}
        textStyle={{ color: "gray" }}
      />
      {/*<Text style={styles.title}>Battery Status</Text>*/}
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <FontAwesomeIcon icon={faBatteryHalf} size={30} color="#2ecc71" />
          <Text style={styles.infoText}>
            Battery Level:{" "}
            {batteryData.batteryLevel ? `${batteryData.batteryLevel}%` : "Na"}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <FontAwesomeIcon icon={faCarBattery} size={30} color="#3498db" />
          <Text style={styles.infoText}>
            Power Saving Mode:{" "}
            {batteryData.isPowerSaveMode ? "Enabled" : "Disabled"}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <FontAwesomeIcon icon={faMugSaucer} size={30} color="#e74c3c" />
          <Text style={styles.infoText}>
            Power Optimization:{" "}
            {batteryData.isPowerOptimization ? "Enabled" : "Disabled"}
          </Text>
        </View>

        <Text style={getStatusMessageStyle().text}>
          {getStatusMessageStyle().message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: "100%",
    maxWidth: 400,
    color: "black",
    marginVertical:25
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
    paddingVertical: 40,
    marginVertical: 40,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: "black",
  },
  statusMessage: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#e74c3c",
  },
});

export default BatteryDataScreen;
