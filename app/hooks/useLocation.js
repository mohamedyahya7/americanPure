import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocation = async () => {
    try {
      const  r  = await Location.requestForegroundPermissionsAsync();
      if(r.status != "granted") return ;
      const {coords: { latitude, longitude }} = await Location.getCurrentPositionAsync();
      return ({ latitude, longitude });
    } catch (error) {
      console.log(error);
    }
  };
export default useLocation;
