import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ManagerMainScreen from "../../screens/Manger/ManagerMainScreen.js"; 
import DevicesScreen from "../../screens/Manger/DevicesScreen.js";
import EmployeesScreen from "../../screens/Manger/EmployeesScreen.js";
import TeamsScreen from "../../screens/Manger/TeamsScreen.js";
import routes from "../../navigation/routes";

const Stack = createStackNavigator();
//  mode="modal"
const ManagerFeedNavigator = () => (
  <Stack.Navigator screenOptions={{  presentation:"modal" }}>
    <Stack.Screen name="ManagerMain" component={ManagerMainScreen} />
    <Stack.Screen name={routes.DEVICES} component={DevicesScreen} />
    <Stack.Screen name={routes.TEAMS} component={TeamsScreen} />
    <Stack.Screen name={routes.EMPLOYEES} component={EmployeesScreen} />
  </Stack.Navigator>
);

export default ManagerFeedNavigator;
