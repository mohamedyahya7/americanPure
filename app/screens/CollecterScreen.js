import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { logout } from '../api/AuthService'


const CollecterScreen = ({user,setUser}) => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:20}}>
      لا يوجد تصميم حالي للمحصلين برجاء العوده قريبا يا {user.name}
      </Text>
    <Button title="تسجيل الخروج" onPress={() =>{logout(setUser)} }  />
    </View>
  )
}

export default CollecterScreen

