import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback,Image,Pressable } from "react-native";
import Icon from "./Icon";
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';
// import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";


let storage = imageUrl => `http://192.168.1.6:8000/storage/${imageUrl}`


function Card({ title, subTitle, imageUrl, onPress, thumbnailUrl,latitude,longitude }) {
  
const openLocation = async (latitude,longitude) => {
  try {
    const result = await Linking.openURL(`geo:${latitude},${longitude}`);
    if (!result) {
      console.error('Failed to open google map:', result);
    }
  } catch (error) {
  
    console.error( 'Error opening google map:', error);
  }
};
const copyLocationToClipboard = async (latitude,longitude) => {
  try {
    const result = await Clipboard.setStringAsync(`${latitude},${longitude}`);
    if (result) {
      alert('تم نسخ الموقع');
    }
  } catch (error) {
  
    console.error( 'Error opening google map:', error);
  }
};
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
       {imageUrl && <Image
          style={styles.image}
          //srouce url
          src={storage(imageUrl)}

           
          // source={{uri:imageUrl}  }
        />}
        {/* <Image
          style={styles.image}
          tint="light"
           preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        /> */}
        
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
          <Pressable style={styles.subTitle} 
          onLongPress={()=>openLocation(latitude,longitude)}
          onPress={()=>copyLocationToClipboard(latitude,longitude)}
           numberOfLines={2}>
            <Icon name="map-marker" backgroundColor={colors.primary} iconColor={colors.white} size={40} />
          
          </Pressable>

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: colors.white,
    flexDirection:"row",
    marginBottom: 20,
    overflow: "hidden",
    padding:10
  },
  detailsContainer: {
    padding: 20,
    width:"70%"
  },
  image: {
    width: "30%",
    height: 150,
    borderRadius:16
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
