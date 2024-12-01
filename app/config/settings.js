import Constants from "expo-constants";

// const url='http://192.168.1.7:8000'
 const url='https://mohammed.uplancerps.com'

const settings = {
  dev: {
    apiUrl:  "http://192.168.1.7:8000/api/v1",
  },
  staging: {
    apiUrl:  "http://192.168.1.7:8000/api/v1",
  },
  prod: {
    apiUrl:  "http://192.168.1.7:8000/api/v1",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export const storage = (imageUrl) =>  `http://192.168.1.7:8000/storage/${imageUrl}`;
export default getCurrentSettings();
