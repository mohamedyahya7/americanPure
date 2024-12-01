import React from "react";
import { useFormikContext } from "formik";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import { View } from "react-native";

function AppFormField({ name, width,row=false, set, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
  <View style={row ? {flex:1,flexGrow:1,alignItems:'center',justifyContent:'center',width:width} : {width:width}} >
       <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => {setFieldValue(name, text);if(set)set(text)}}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

export default AppFormField;

