
import React, { useState } from "react";
import { StyleSheet, Image,ScrollView } from "react-native";
import * as Yup from "yup";
import * as ManagerService from "../../api/managerService";
import Screen from "../../components/Screen";
import FormImagePicker from "../../components/forms/FormImagePicker";
import ActivityIndicator from "../../components/ActivityIndicator";
import { getToken } from "../../api/tokenService";
import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,
  } from "../../components/forms";
  
  
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("الاسم"),
    type: Yup.string().required().label("النوع"),
    price: Yup.number().required().min(1).label("السعر"),
    stages: Yup.number().required().min(1).label("المراحل"),
    images: Yup.array().min(1, "Please select one image."),
  });

export default function CreateDeviceScreen(){
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);

    const handleSubmit = async (device,{resetForm})=>{
        setLoading(true);
        try{
          const result = await ManagerService.createDevice(device);
            if(!result){
              console.log('error',result);
              setError(true)
            }
            else{
              resetForm();
              setLoading(false);
            }
        }catch(error){
            console.log('error',error);
            setError(true);
            setLoading(false);
        }
    }

    return <>
    <ScrollView >
    <Screen style={[styles.container, loading && {height:0}]}>
        <Image source={require('../../assets/logo-red.png')} style={styles.logo}/>
        <Form
            initialValues={{name:'',price:'',type:'',stages:'',images:[]}}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            <ErrorMessage error='حدث خطأ أثناء إنشاء الجهاز' visible={error}/>
            <FormField
                autoCapitalize="none"
                autoCorrect={false}
                name="name"
                placeholder="الاسم"
            />
            <FormField
                autoCapitalize="none"
                autoCorrect={false}
                name="type"
                placeholder="النوع"
            />
            <FormField
                autoCapitalize="none"
                keyboardType="numeric"
                autoCorrect={false}
                name="price"
                placeholder="السعر"
            />
            <FormField
                autoCapitalize="none"
                keyboardType="numeric"
                autoCorrect={false}
                name="stages"
                placeholder="المراحل"
            />
            <FormImagePicker name="images" />
            <SubmitButton title="انشاء"/>

        </Form>
        </Screen>
    </ScrollView>

        <ActivityIndicator visible={loading} />
    
    </>
}
const styles = StyleSheet.create({
    container: {
      padding: 10,
      justifyContent:'space-around'
    },
    logo: {
      width: 80,
      height: 80,
      alignSelf: "center",
      marginTop: 50,
      marginBottom: 20,
    },
  });
  
  