import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "../AccountNavigator";
import ManagerFeedNavigator from "./ManagerFeedNavigator";
import ListingEditScreen from "../../screens/ListingEditScreen";
import NewListingButton from "../NewListingButton";
import routes from "../routes";
import navigation from "../rootNavigation";
import useNotifications from "../../hooks/useNotifications";
import ManagerCreateNavigator from "./ManagerCreateNavigator";
const Tab = createBottomTabNavigator();

const ManagerNavigator = () => {
  useNotifications();
// hide header
  return (
    <Tab.Navigator  screenOptions={{headerShown:false}}>
      <Tab.Screen
        name="Feed"
        component={ManagerFeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ManagerCreate"
        component={ManagerCreateNavigator}
        options={ ({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton
              onPress={() =>
                navigation.navigate('ManagerCreate')
               }
              
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        })}

      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),headerShown:false
        }}
      />
    </Tab.Navigator>
  );
};

export default ManagerNavigator;
