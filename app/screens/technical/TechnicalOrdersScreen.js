import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableOpacity,
} from "react-native";
import ActivityIndicator from "../../components/ActivityIndicator";
import { logout } from "../../api/AuthService";
import TechnicalOrderCard from "../../components/TechicalOrderCard";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import { getOrders } from "../../api/technicalService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import useLocation from "../../hooks/useLocation";

function TechnicalOrdersScreen({ navigation ,setUser}) {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(false);
  const STORAGE_KEY = "technicalListItems";
  const location = useLocation();
  const loadOrders = async () => {
    setLoading(true);
    try {
      // محاولة تحميل البيانات من السيرفر
      const serverData = await getOrders();
      if (serverData) {
        setOrders(serverData);

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(serverData));
      } else {
        // إذا فشل التحميل من السيرفر، نحاول التحميل من التخزين المحلي
        await loadFromStorage();
      }
    } catch (error) {
      // في حالة حدوث خطأ، نحاول التحميل من التخزين المحلي
      await loadFromStorage();
    }
    setLoading(false);
  };

  const loadFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const parsedData = storedData ? JSON.parse(storedData) : [];
      setOrders(parsedData);
      Alert.alert("تنبيه", "تم تحميل الطلبات من الذاكرة المحلية");
    } catch (error) {
      Alert.alert("خطأ", "فشل في تحميل الطلبات");
    }
  };
  useEffect(() => {
    loadOrders();
  }, []);

  return (
    !loading && (
      <Screen style={styles.screen}>
        <View
          style={{
            width: "100%",
            alignSelf: "center",
            margin: 10,
            height: "35%",
            borderRadius: 24,
            overflow: "hidden",
          }}
        >
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: +orders[0]?.latitude || 0,
              longitude: +orders[0]?.longitude || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,

            }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            showsMyLocationButton
          >
            
            {orders.map(
              (order, index) => (
                <Marker
                  key={index + 1}
                  coordinate={{
                    latitude: +order.latitude,
                    longitude: +order.longitude,
                  }}
                  onPress={() => setOrder(order)}
                />
              )
              //    <Callout  style={{backgroundColor:colors.danger,height:100,width:200}}>   <Text style={{backgroundColor:colors.primary,color:colors.white,padding:6,borderRadius:15,width:135,textAlign:"center"}}>{Math.floor((new Date()-new Date(order.date))/1000/60/60)}:{Math.floor((new Date()-new Date(order.date))/1000/60%60)}:{Math.floor((new Date()-new Date(order.date))/1000%60)}</Text> </Callout></Marker>
            )
            }
            { orders.length > 0 && <Marker
              key={0}
              pinColor="green"
              title="الموقع الحالي"
              coordinate={{
                latitude: +orders[0].latitude - 0.0001,
                longitude: +orders[0].longitude - 0.0001,
              }}
            />}
          </MapView>
        </View>
        {/* <ActivityIndicator visible={loading} /> */}
        <Pressable
          style={{ height: 50 }}
          onPress={() => {
            logout(setUser);
          }}
        >
          <Text style={styles.text}>تسجيل الخروج</Text>
        </Pressable>

        {order && (
          <View style={{ width: "100%", height: "35%", marginBottom: 10 }}>
            <Pressable
              style={{ zIndex: 1000, position: "absolute", top: 10, right: 10 }}
              onPress={() => setOrder(null)}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: 20,
                  fontWeight: "bold",
                  backgroundColor: colors.primary,
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                x
              </Text>
            </Pressable>
            <TechnicalOrderCard item={order}  />
          </View>
        )}

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          refreshing={loading}
          onRefresh={loadOrders}
          renderItem={({ item }) => item.id && <TechnicalOrderCard item={item}  />}
        />

        {orders.length > 0 && <TechnicalOrderCard item={{ ...orders[0] }} setOrders={setOrders}  />}
      </Screen>
    )
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.light,
  },
  text: {
    color: colors.danger,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    flex: 1,
    justifyContent: "center",
  },
});

export default TechnicalOrdersScreen;
