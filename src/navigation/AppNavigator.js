import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import BatteryStatus from "../screens/BatteryStatus";
import Location from "../screens/Location";
import LocationList from "../screens/LocationList";
import Maps from "../screens/Maps";

const Stack = createStackNavigator();

const AppNavigator = ({ initialParams }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "LocatePro" }}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{ title: "Location" }}
          initialParams={{ initialParams }}
        />
        <Stack.Screen
          name="BatteryStatus"
          component={BatteryStatus}
          options={{ title: "Battery Status" }}
          initialParams={initialParams}
        />
        <Stack.Screen
          name="LocationList"
          component={LocationList}
          options={{ title: "Location List" }}
          initialParams={{ locationHistory: initialParams.locationHistory }}
        />
        <Stack.Screen
          name="Maps"
          component={Maps}
          options={{ title: "Map" }}
          initialParams={{ locationHistory: initialParams.locationHistory }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
