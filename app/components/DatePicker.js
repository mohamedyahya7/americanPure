import { View, Text, Pressable,StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import defaultStyles from '../config/styles';
import { useFormikContext } from 'formik';
import ErrorMessage from './forms/ErrorMessage';
import TextInput from './TextInput';
const DatePicker = ( {name,width='50%',row=false,...otherProps}) => {
    // default date month from now
    
  const { setFieldValue,  values } = useFormikContext();
    let defaultDate = new Date();
    defaultDate.setMonth(defaultDate.getMonth() + 1);
    // useEffect(() => {
    //     setFieldValue(name, defaultDate);
    // }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || defaultDate;
        setFieldValue(name, currentDate);
    };
    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: values[name],
            onChange: onChange,
            mode: currentMode,
            is24Hour: true,
            display: 'calendar',
        });
    };

    const showDatePicker = () => {
        showMode('date');
    };

  return (
      <Pressable style={{width:width}} onPress={showDatePicker}>
      

       <View style={[styles.container,{padding:15}]}>
      
        <MaterialCommunityIcons
          name="calendar"
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      
      <Text
        style={  [defaultStyles.text,{color:defaultStyles.colors.medium,textAlign:'left'}] }
        
      >
      {values[name].toLocaleDateString('ar')}
      </Text>

    </View>
  
      </Pressable>
    
  )
}

export default DatePicker

    
  

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width:'100%',
    padding: 10,
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
});