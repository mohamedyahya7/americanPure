import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrdersScreen from "../screens/seller/OrdersScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

const Stack = createStackNavigator();
//  mode="modal"
const SellerFeedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false,presentation:"modal" }}>
    <Stack.Screen name="Orders" component={OrdersScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
  </Stack.Navigator>
);

export default SellerFeedNavigator;
