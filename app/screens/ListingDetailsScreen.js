import React from "react";
import {
  View,
  StyleSheet,Button,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  Image
} from "react-native";
// import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";

import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Linking from 'expo-linking';
import MapMarker from "../components/MapMarker";

function ListingDetailsScreen({ route }) {
  const listing = route.params;
let location={
  latitude:listing.latitude,
  longitude:listing.longitude,
}
const copyNumberToClipboard = async (phoneNumber) => {
  try {
    const result = await Linking.openURL(`tel:${phoneNumber}`);
    if (result.status !== 'success') {
      console.error('Failed to open phone call:', result);
    }
  } catch (error) {
    console.error( 'Error opening phone call:', error);
  }
};
let Details =()=> <> 
<View style={styles.detailsContainer}>
<Text style={styles.title}>{listing.name}</Text>
<Pressable  onPress={() => copyNumberToClipboard(listing.phone)} >
  <Text style={styles.price}>
    رقم التلفون : {listing.phone} 
    </Text> 
{/* <Button title="اتصل" onPress={() => copyNumberToClipboard(listing.phone)} /> */}

</Pressable>
{/* <View style={styles.userContainer}>
  <ListItem
    image={require("../assets/mosh.jpg")}
    title="Mosh Hamedani"
    subTitle="5 Listings"
  />
</View> */}
</View>
</>
  return (
    // <KeyboardAvoidingView
    // behavior="position"
    // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    // >
      <View style={{flex:1,height:'100%'}}>
      <Image
        style={styles.image}
        source={{uri:listing.images[0]}}
        // preview={{ uri: listing.images[0].thumbnailUrl }}
        // tint="light"
        // uri={listing.images[0].url}
      />
    <View style={{width:'90%',alignSelf:'center',margin:10 , height:'50%'}}>
      
      <MapView
        style={{ flex: 1,}}
        initialRegion={{
          latitude: location?.latitude || 0,
          longitude: location?.longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        showsMyLocationButton
        
      >
         {location && <Marker coordinate={location} />}
      </MapView>  
    </View>
  
    <Details/>
    
  </View>
// </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 150,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
 {/* <MapMarker location={listing.location}/> */}

  
 { /* <Callout>
  <Details/>
</Callout> 
</Marker>*/}
      