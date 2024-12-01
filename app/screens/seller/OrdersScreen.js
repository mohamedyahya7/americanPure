import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Alert } from "react-native";
import Screen from "../../components/Screen";
import OrderCard from "../../components/OrderCard";
import colors from "../../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getOrders } from "../../api/sellerService";

const STORAGE_KEY = "ListItems";

function OrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setRefreshing(true);
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
    } finally {
      setRefreshing(false);
    }
  };

  const loadFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const parsedData = storedData ? JSON.parse(storedData) : [];
      setOrders(parsedData);
      Alert.alert('تنبيه', 'تم تحميل الطلبات من الذاكرة المحلية');
    } catch (error) {
      Alert.alert('خطأ', 'فشل في تحميل الطلبات');
    }
  };

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={loadOrders}
        renderItem={({item}) => item.id && <OrderCard item={item} onPress={() => console.log(item.id)}/>}
          // navigation.navigate('OrderDetailsScreen', { id: item.id })} 
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.light,
  },
});

export default OrdersScreen;
