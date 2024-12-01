import React, { useState } from "react";
import { StyleSheet, Image,View } from "react-native";
import * as Yup from "yup";
import * as AuthService from "../api/AuthService";
import Screen from "../components/Screen";
import colors from "../config/colors";
import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";
// import authApi from "../api/auth";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";


const validationSchema = Yup.object().shape({
  login: Yup.string().required().label("Phone"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen() {
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const {user,setUser } = useAuth();
  
  const handleSubmit = async ({login,password},{resetForm})=>{
    setLoading(true);
    const result = await AuthService.login({login,password});
    if(!result){
      setLoading(false);
      setLoginFailed(true);
    } else{
    setLoginFailed(false);
    resetForm();
    setLoading(false);
    setUser(result);
    }
  }

  if(loading) return   <ActivityIndicator visible={loading}/> 
  return (<>
<Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />

      <Form
        initialValues={{ login: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid phone and/or password."
          visible={loginFailed}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          maxLength={11}
          keyboardType="phone-pad"
          name="login"
          placeholder="رقم الهاتف"
          textContentType="phoneNumber"
          row={true}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="كلمة المرور"
          secureTextEntry
          textContentType="password"
          row={true}
        />
        <SubmitButton title="تسجيل الدخول" />
      </Form>
    </Screen>
    </>
  );
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

export default LoginScreen;
