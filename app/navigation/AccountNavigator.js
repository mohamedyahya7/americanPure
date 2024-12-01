import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ListingsScreen from "../screens/ListingsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator  >
    <Stack.Screen name="Account" options={{title:'الملف الشخصي' }} component={AccountScreen}  />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="listingsScreen" component={ListingsScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
