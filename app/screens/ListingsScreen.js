import React, { useEffect ,useState} from "react";
import { FlatList, StyleSheet } from "react-native";
import axios from "axios";
import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import  AsyncStorage  from "@react-native-async-storage/async-storage";


function ListingsScreen({ navigation }) {
const [listItems,setListItems]=useState([])
  // const getListingsApi = useApi(listingsApi.getListings);
  useEffect(() => {
    //getListingsApi.request();
    fetch()
   
  }, []);
  

  let key ="ListItems"
  const storage = async()=>{
    
    // await AsyncStorage.clear()

    try {
      // let v= await axios.get('http://192.168.1.17:8000/api/v1/order')
      console.log('v',v.data)
      return v.data?v.data:[]
    } catch (error) {
      console.log(error)
    
      try {
        const v = await AsyncStorage.getItem(key);
      return v != null ? JSON.parse(v) :null
      } catch (error) {
        console.log(error)
      }
    }
  }
let fetch =()=>{ 
  storage().then(items=>setListItems(items))
  console.log('f',listItems)
}
  return (
    //<AppText>hi</AppText>
    <>
      {/* <ActivityIndicator visible={getListingsApi.loading} /> */}
      <Screen style={styles.screen}>
        {/* {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            </>
            )}
            <Button title="Retry" onPress={getListingsApi} /> */}
            <Button title="تحميل" style={{width:"50%"}} onPress={fetch} />
        <FlatList
          // data={getListingsApi.data}
           data={listItems}
          keyExtractor={(item) => item.name}
          // keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
           item.name &&  <Card
              title={item.name}
              subTitle={ item.address}
              imageUrl={item.images[0]}
              latitude={item.latitude}
              longitude={item.longitude}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              // thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    // padding: 10,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
