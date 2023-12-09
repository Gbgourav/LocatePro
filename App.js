import React, { useEffect, useState } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { NativeModules } from "react-native";
const { BatteryOptimizationCheck } = NativeModules;
import Geolocation from "@react-native-community/geolocation";
import moment from "moment";
import axios from "axios";
const App = () => {
  const [batteryData, setBatteryData] = useState({
    batteryLevel: null,
    isPowerSaveMode: null,
    isPowerOptimization: null,
    location: null,
  });

  const [locationHistory, setLocationHistory] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isBatteryOptEnabled =
          await BatteryOptimizationCheck.isBatteryOptEnabled();
        const isPowerSaveModeEnabled =
          await BatteryOptimizationCheck.isPowerSaveModeEnabled();
        const batteryPercentage =
          await BatteryOptimizationCheck.getBatteryPercentage();

        let data = {
          batteryLevel: batteryPercentage,
          isPowerSaveMode: isPowerSaveModeEnabled,
          isPowerOptimization: isBatteryOptEnabled,
        };

        setBatteryData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching battery information:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchLocationName = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      );
      let responseData = response.data;
      if (responseData.address) {
        let add = responseData.address;
        const newAdd = [
          add.city || "",
          add.city_district || "",
          add.country || "",
          add.postcode || "",
          add.road || "",
        ]
          .filter(Boolean)
          .join(", ");
        return newAdd;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      return null;
    }
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(resolve, reject);
        });

        const { coords } = position;
        const location = await fetchLocationName(
          coords.latitude,
          coords.longitude,
        );

        setLocationHistory((prevHistory) => [
          ...prevHistory,
          {
            latitude: coords.latitude,
            longitude: coords.longitude,
            timestamp: moment().format("MM/DD/YYYY HH:mm:ss"),
            location: location,
          },
        ]);
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    getLocation();

    const intervalId = setInterval(() => {
      getLocation();
    }, 600000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AppNavigator initialParams={{ batteryData, isLoading, locationHistory }} />
  );
};

export default App;
