import './gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";

import navigationTheme from "./app/navigation/navigationTheme";
import { useState,useEffect } from "react";
import { navigationRef } from "./app/navigation/rootNavigation";
import SellerNavigator from "./app/navigation/SellerNavigator";
import useAuth from './app/auth/useAuth';
import LoginScreen from './app/screens/LoginScreen';
import * as SecureStore from 'expo-secure-store';
import AuthContext from './app/auth/context';
import ManagerNavigator from   './app/navigation/manager/ManegarNavigator';
import TechnicalNavigator from './app/navigation/TechnicalNavigator';
import CollecterScreen from './app/screens/CollecterScreen.js';
import CustomerServesScreen from './app/screens/CustomerServesScreen.js';
  // <ListingEditScreen style={ {flex:1, with:'100%'}}/>
  // < StatusBar style="auto" />

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  // console.log('user from app',user)
  const restoreUser = async () => {
    const SecureUser = await SecureStore.getItemAsync('user');
    if (SecureUser) setUser(JSON.parse(SecureUser));
  };
    useEffect(()=>{restoreUser()},[]);
  // if (!isReady)
  //   return (
  //     <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
  //   );
  return (<AuthContext.Provider value={{ user, setUser }}>
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      { !user ? (<LoginScreen setUser={setUser} />) : (<>
        {user.role === '0' && <ManagerNavigator/>}
        {user.role === '2' && <SellerNavigator/>}
        {user.role === '3' && <TechnicalNavigator setUser={setUser}/>}
        {user.role === '4' && <CustomerServesScreen user={user} setUser={setUser}/>}
        {user.role === '5' && <CollecterScreen user={user} setUser={setUser}/>}
      </>) }
        
     
    </NavigationContainer>
    </AuthContext.Provider>

 
  
      
     
  );
}

const styles = StyleSheet.create({
  container: {flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
