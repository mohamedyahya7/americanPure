import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Pressable,
} from "react-native";
import Icon from "./Icon";
import * as Linking from "expo-linking";
import * as Clipboard from "expo-clipboard";
// import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";
import { storage } from "../config/settings";

function OrderCard({ item, onPress }) {

  let {
    id,
    first_name,
    last_name,
    phone,
    phone2,
    address,
    latitude,
    longitude,
    nationalId,
    installments_count,
    status,
    created_at:date,
  } = item;
  let name = `${first_name} ${last_name}`;
  item.name = name;
  let location = `${latitude},${longitude}`;
  const openLocation = async (location) => {
    try {
      const result = await Linking.openURL(`geo:${location}`);
      if (!result) {
        console.error("Failed to open google map:", result);
      }
    } catch (error) {
      console.error("Error opening google map:", error);
    }
  };

  const copyToClipboard = async (string) => {
    try {
      const result = await Clipboard.setStringAsync(string);
      if (result) {
        alert("لقد تم النسخ ");
      }
    } catch (error) {
      console.error("Error opening google map:", error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.card,
          {
            borderColor:

              status == 0
                ? "gray"
                : status == 1
                ? "#00e676"
                : status == 2
                ? colors.primary
                : "red",
          },
        ]}
      >
        {/* <View style={{width:"30%"}}> */}
        {/* {image1 && (
          <Image
            style={styles.image}
            src={storage(image1)}
            // source={{uri:imageUrl}  }
          />
        )} */}
        {/* <Image
          style={styles.image}
          tint="light"
           preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        /> */}
        {/* </View> */}

        <View style={styles.detailsContainer}>
          <View style={styles.row}>

          <Text
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              padding: 6,
              borderRadius: 15,
              width: 135,
              textAlign: "center",
            }}
          >
            {Math.floor((new Date() - new Date(date)) / 1000 / 60 / 60)} ساعه و{" "}
            {Math.floor(((new Date() - new Date(date)) / 1000 / 60) % 60)} دقيقه
          </Text>
          <Text style={[{color:colors.white,backgroundColor:installments_count>1?colors.primary:colors.secondary ,padding:6,borderRadius:15}]}>{installments_count>1?"قسط":"كاش"}</Text>
          </View>
          
          <View style={styles.row}>

<Text style={styles.title}>{name}</Text>

          <Text style={styles.title} >
            {nationalId}
          </Text>
          </View>
          

          <View style={styles.row}>
            <Pressable onPress={() => copyToClipboard(location)}>
              <Text style={styles.subTitle}>العنوان : {address}</Text>
            </Pressable>
            <Pressable
              style={styles.icon}
              onPress={() => openLocation(location)}
            >
              <Icon
                name="map-marker"
                backgroundColor={colors.white}
                iconColor={colors.primary}
                size={35}
              />
            </Pressable>
          </View>
          <PhoneIcon phone={phone} />
          <PhoneIcon phone={phone2} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: colors.white,
    flexDirection: "row",
    overflow: "hidden",
    padding: 10,
    width: "100%",
    marginBottom: 20,
    borderWidth: 4,
  },
  detailsContainer: {
    padding: 20,
    width: "100%",
    gap: 10,
  },
  row: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",

    // alignSelf:"center",
    // justifyContent:"center"
  },
  image: {
    width: "30%",
    height: "100%",
    borderRadius: 16,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
  text: {
    fontSize: 20,
  },
  icon: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary,
  },
});

export default OrderCard;

export function PhoneIcon({ phone }) {
  const openPhone = async (phone) => {
    try {
      const result = await Linking.openURL(`tel:${phone}`);
      if (!result) {
        console.error("Failed to open google map:", result);
      }
    } catch (error) {
      console.error("Error opening google map:", error);
    }
  };
  const openWhatsapp = async (phone) => {
    try {
      const result = await Linking.openURL(`https://wa.me/+2${phone}`);
      if (!result) {
        console.error("Failed to open google map:", result);
      }
    } catch (error) {
      console.error("Error opening google map:", error);
    }
  };
  const copyToClipboard = async (string) => {
    try {
      const result = await Clipboard.setStringAsync(string);
      if (result) {
        alert("لقد تم النسخ ");
      }
    } catch (error) {
      console.error("Error opening google map:", error);
    }
  };
  return (
    <View style={styles.row}>
      <Pressable style={styles.icon} onPress={() => openPhone(phone)}>
        <Icon
          name="phone"
          backgroundColor={colors.white}
          iconColor={colors.primary}
          size={33}
        />
      </Pressable>
      <Pressable onPress={() => copyToClipboard(phone)}>
        <Text style={styles.text}>{phone} </Text>
      </Pressable>
      <Pressable
        style={[styles.icon, { borderColor: "#00e676" }]}
        onPress={() => openWhatsapp(phone)}
      >
        <Icon
          name="whatsapp"
          backgroundColor={colors.white}
          iconColor="#00e676"
          size={35}
        />
      </Pressable>
    </View>
  );
}
