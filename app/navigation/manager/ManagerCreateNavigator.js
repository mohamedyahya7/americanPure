import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateDeviceScreen from "../../screens/Manger/CreateDeviceScreen";
import ManagerMainCreateScreen from "../../screens/Manger/ManagerMainCreateScreen";
import CreateEmployeeScreen from "../../screens/Manger/CreateEmployeeScreen";
import CreateTeamScreen from "../../screens/Manger/CreateTeamScreen.js";
const Stack = createStackNavigator();

const ManagerCreateNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="ManagerMainCreate" component={ManagerMainCreateScreen}/>
        <Stack.Screen name="CreateDevice" component={CreateDeviceScreen}/>
        <Stack.Screen name="CreateEmployee" component={CreateEmployeeScreen}/>
        <Stack.Screen name="CreateTeam" component={CreateTeamScreen}/>
    </Stack.Navigator>
)

export default ManagerCreateNavigator;

