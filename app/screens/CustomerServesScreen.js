import { View, Text, Button } from 'react-native'
import React from 'react'

const CustomerServesScreen = ({user,setUser}) => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:20}}>
      لا يوجد تصميم حالي لخدمات العملاء برجاء العوده قريبا يا {user.name}
      </Text>
    <Button title="تسجيل الخروج" onPress={() =>{logout(setUser)} }  />
    </View>
  )
}

export default CustomerServesScreen