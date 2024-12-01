import React, { useState } from "react";
import { StyleSheet,KeyboardAvoidingView,Platform,ScrollView, View} from "react-native";
import * as Yup from "yup";
import { createOrder } from "../api/sellerService";

import  AsyncStorage  from "@react-native-async-storage/async-storage";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import { ListItem } from "../components/lists";
// import listingsApi from "../api/listings";
// import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  phone: Yup.string().required().min(1).max(11).matches(/^\d+$/).label("Phone"),
  phone2: Yup.string().required().min(1).max(11).matches(/^\d+$/).label("Phone2"),
  nationalId: Yup.string().required().min(1).max(14).matches(/^\d+$/).label("nationalId"),
  address: Yup.string().required().label("address"),
  payMethod: Yup.object().nullable().label("Pay Method"),
  images: Yup.array().min(1, "Please select one image.").max(1, "Please select one image."),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "كاش",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "قسط",
    value: 2,
  },
  // {
  //   backgroundColor: "#fed330",
  //   icon: "camera",
  //   label: "Cameras",
  //   value: 3,
  // },
  // {
  //   backgroundColor: "#26de81",
  //   icon: "cards",
  //   label: "Games",
  //   value: 4,
  // },
  // {
  //   backgroundColor: "#2bcbba",
  //   icon: "shoe-heel",
  //   label: "Clothing",
  //   value: 5,
  // },
  // {
  //   backgroundColor: "#45aaf2",
  //   icon: "basketball",
  //   label: "Sports",
  //   value: 6,
  // },
  // {
  //   backgroundColor: "#4b7bec",
  //   icon: "headphones",
  //   label: "Movies & Music",
  //   value: 7,
  // },
  // {
  //   backgroundColor: "#a55eea",
  //   icon: "book-open-variant",
  //   label: "Books",
  //   value: 8,
  // },
  // {
  //   backgroundColor: "#778ca3",
  //   icon: "application",
  //   label: "Other",
  //   value: 9,
  // },
];

function ListingEditScreen() {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  
let key ="ListItems"
  async function handleSubmit(listing , { resetForm }){
    let nlisting= {...listing,payment_method: listing.payMethod.value,
      latitude:location.latitude,longitude:location.longitude,national_id:listing.nationalId,
      device_id:1
    }
    // setProgress(0);
    // setUploadVisible(true);

    // const result = await listingsApi.addListing(
    //   { ...listing, location },
    //   (progress) => setProgress(progress)
    // );
    // if (!result.ok) {
    //   setUploadVisible(false);
    //   return alert("Could not save the listing");
    // }

    //post data to api by fetch
    // fetch('http://127.0.0.1:8000/api/v1/order',{
    //   method:'POST',
    //   headers:{'Content-Type':'application/json'},
    //   body:JSON.stringify(nlisting)
    // }).then(res=>res.json()).then(data=>{
    //   console.log('d:',data)
    // }).catch(err=>{
    //   console.log('err:',err)
    // })
//apndend images by formdata to api

 let data = new FormData();
    
data.append('name',nlisting.name)
data.append('phone',nlisting.phone)
data.append('phone2',nlisting.phone2)
data.append('national_id',nlisting.nationalId)
data.append('address',nlisting.address)
data.append('payment_method',nlisting.payMethod)
data.append('latitude',nlisting.latitude)
data.append('longitude',nlisting.longitude)
nlisting.images.forEach((image, index) =>data.append(`image${index+1}`, { name: `image${index+1}`, type: "image/jpeg",uri: image,}));
//uplode file to apiuplode file to api



try {
  // 192.168.1.17
  //americanpure.000.pe
      const {data} = await createOrder(nlisting);
        if(data){
          console.log('استجابة:f', data);
          resetForm();
        }else{
          console.log('خطأ:f', data);
          alert('حدث خطأ أثناء حفظ القائمة');
        } 
    } catch (error) {
      console.log('خطأ:', error.message);
      alert('حدث خطأ أثناء حفظ القائمة');
    }


    

  //  console.log('l:',listing)

  // (async()=> {
  //   //"location": {"latitude": 31.1191959, "longitude": 29.790650}
  //   const value = await AsyncStorage.getItem(key);
  //   const items = JSON.parse(value)
  //   if (!items) {
  //     await AsyncStorage.setItem(key , JSON.stringify([{...nlisting}]));
  //   }else{
  //     const updatedItems = [{...nlisting},...items];
  //     await AsyncStorage.setItem(key, JSON.stringify(updatedItems));
  //    console.log('u;',updatedItems)
  //   }})(listing);
      // resetForm();
  }  

  return ( 
    <Screen style={styles.container}>
      { /* <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
        /> */
      }
        <Form
        initialValues={{
          name: "",
          phone: "",
          phone2:"",
          nationalId:"",
          address: "",
          payMethod:null,
          images: [],}}

        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
      <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={0} >
      {/* {Platform.OS==='ios'?'padding':'height'} */}
        <ScrollView >
        
        <FormField maxLength={255} name="name" placeholder="الاسم" />

        <View style={{flexDirection:'row',gap:8}}>
        <FormField
           keyboardType="numeric"
          maxLength={11}
          name="phone"
          // icon='phone'
          placeholder="رقم الهاتف"
          width='48%'
          row={true}
        />
        <FormField
          keyboardType="numeric"
          maxLength={11}
          name="phone2"
          // icon='phone'
          placeholder="رقم الهاتف"
          width='48%'
          row={true}
        />
        </View>
        <View style={{flexDirection:'row',gap:8,}}>
        <FormField
        // style={{flexDirection:'column'}}
          keyboardType="numeric"
          maxLength={14}
          name="nationalId"
          placeholder="الرقم القومي"
          width="65%"
          row={true}
        />
        <Picker
        items={categories}
        name="payMethod"
        numberOfColumns={3}
        PickerItemComponent={CategoryPickerItem}
        placeholder="طريقة الدفع"
        width="35%"
      />
        </View>
        <FormField
        maxLength={255}
        multiline
        name="address"
        numberOfLines={3}
        placeholder="العنوان"
        />
        <FormImagePicker name="images" />

        <SubmitButton title="Post"  />
        </ScrollView>
      </KeyboardAvoidingView>
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    // width:'100%',
    padding: 5,
  },
  form:{
    flexDirection:"row",
    flexWrap:"wrap"
  },
});
export default ListingEditScreen;
