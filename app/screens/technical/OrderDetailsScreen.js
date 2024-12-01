import React, { useState } from "react";
import { PhoneIcon } from "../../components/OrderCard";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
// import { Image } from "react-native-expo-image-cache";

import colors from "../../config/colors";
import { storage } from "../../config/settings";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Linking from "expo-linking";
import StopWatch from "../../components/StopWatch";

function OrderDetailsScreen({ route, navigation }) {
  const [time, setTime] = useState();

  const orderparams = route.params;

  // if (orderparams == undefined) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text
  //         style={{
  //           textAlign: "center",
  //           margin: 10,
  //           fontSize: 20,
  //           fontWeight: "bold",
  //         }}>
  //         لا يوجد طلب للتنفيذ
  //       </Text>
  //       <Button title="الرجوع" onPress={() => navigation.goBack()} />
  //     </View>
  //   );
  // }
  const order = orderparams
    ? orderparams.order
    : {
        id: 36,
        user_id: 1,
        device_id: 1,
        team_id: 1,
        technical_id: 4,
        name: "اشرف فرج الدين",
        price: null,
        phone: "01712589358",
        phone2: "01148523654",
        address: "شارع ام الصبيان",
        national_id: "84528965",
        location: null,
        seller_id: 3,
        client_id: 37,
        date: "2024-11-11 23:28:52",
        status: 0,
        latitude: "31.1191975",
        longitude: "29.7906333",
        payment_method: "1",
        image1: "images/1731367732.jpg",
        image2: null,
        image3: null,
        created_at: "2024-11-11T23:28:52.000000Z",
        updated_at: "2024-11-13T16:05:44.000000Z",
        user: {
          id: 3,
          name: "محمد",
          phone: "01220910505",
          role: "2",
          email: "mohamed007yahya@gmail.com",
          created_by: 0,
          email_verified_at: "2024-11-01T15:03:01.000000Z",
          created_at: "2024-10-28T01:05:10.000000Z",
          updated_at: "2024-10-28T01:05:10.000000Z",
        },
        team: {
          id: 1,
          name: "first",
        },
        device: {
          id: 1,
          name: "فلتر 5 مراحل كومباكت تايواني",
        },
      };
  console.log(JSON.stringify(order, null, 2));
  let location = {
    latitude: +order.latitude,
    longitude: +order.longitude,
  };

  let Details = () => (
    <>
      <View style={styles.detailsContainer}>
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>{order.name}</Text>
          <Text
            style={{
              color: colors.white,
              backgroundColor: colors.primary,
              padding: 6,
              borderRadius: 15,
              width: 135,
              textAlign: "center",
            }}
          >
            {Math.floor((new Date() - new Date(order.date)) / 1000 / 60 / 60)}:
            {Math.floor(((new Date() - new Date(order.date)) / 1000 / 60) % 60)}
            :{Math.floor(((new Date() - new Date(order.date)) / 1000) % 60)}
          </Text>
        </View>
        <Text style={styles.price}>العنوان : {order.address} </Text>
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.price}>المسوق : {order.user.name} </Text>
          <PhoneIcon phone={order.user.phone} />
        </View>
        <Text style={styles.price}>الجهاز: {order.device.name} </Text>
      </View>
    </>
  );
  return (
    <>
      <View style={{ flex: 1, height: "100%", padding: 10 }}>
        <StopWatch setTime={setTime} />

        {location.latitude && (
          <View
            style={{
              width: "100%",
              margin: 1,
              height: "30%",
              overflow: "hidden",
              borderRadius: 16,
              marginBottom: 10,
            }}
          >
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: location?.latitude || 0,
                longitude: location?.longitude || 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              provider={PROVIDER_GOOGLE}
              showsUserLocation
              showsMyLocationButton
            >
              <Marker coordinate={location} />
            </MapView>
          </View>
        )}
        {order.image1 && (
          <Image style={styles.image} source={{uri: storage(order.image1) }} />
        )}
        {/* // preview={{ uri: listing.images[0].thumbnailUrl }}
        // tint="light"
        // uri={listing.images[0].url} */}

        <Details />
        <Text>{time}</Text>
      </View>
    </>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  image: {
    width: "100%",
    height: 150,
    overflow: "hidden",
    borderRadius: 16,
    marginBottom: 10,
  },
  price: {
    color: colors.primary,
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

export default OrderDetailsScreen;
