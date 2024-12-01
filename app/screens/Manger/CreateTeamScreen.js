
import React, { useState } from "react";
import { StyleSheet, Image,View,set } from "react-native";
import * as Yup from "yup";
import * as ManagerService from "../../api/managerService";
import ActivityIndicator from "../../components/ActivityIndicator";
import Screen from "../../components/Screen";

import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,
  } from "../../components/forms";
  
  
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("الاسم"),
  });

export default function CreateTeamScreen(){
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);

    const handleSubmit = async ({name},{resetForm})=>{
        setLoading(true);
        try{
            const result = await ManagerService.createTeam({name});
            if(!result) setError(true);
            else setError(false);
            resetForm();
            setLoading(false);
        }catch(error){
            setError(true);
        }
    }

    return <>
        <ActivityIndicator visible={loading}/>
    <Screen style={styles.container}>
        <Form
            initialValues={{name:''}}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
        <ErrorMessage
         error='حدث خطأ أثناء إنشاء الفريق' visible={error}
         />

        <FormField
            autoCapitalize="none"
            autoCorrect={false}
            name="name"
            placeholder="الاسم"
            
        />
        <SubmitButton title="انشاء"/>
        </Form>
    </Screen>
    </>
}

const styles = StyleSheet.create({
    container:{
        padding:10
    }
})
