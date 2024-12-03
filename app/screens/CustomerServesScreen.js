import { View, Text, Button ,FlatList,Modal } from 'react-native'
import TextInput from '../components/TextInput'
import React, { useState, useEffect } from 'react'
import { logout } from '../api/auth'
import { getCustomerService,checked,canceled } from '../api/customerServiceService'
import ActivityIndicator from '../components/ActivityIndicator'
import Screen from '../components/Screen'
import OrderCard from '../components/OrderCard'
import EditOrderScreen from './EditOrderScreen'


const CustomerServesScreen = ({setUser}) => {
  const [orders,setOrders] = useState([])
  const [order,setOrder] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const [cancelModal,setCancelModal] = useState(false)
  const [editModal,setEditModal] = useState(false)
  const [cancelReason,setCancelReason] = useState('')

  const refresh = async ()=>{
    setLoading(true)
    try{
      const res = await getCustomerService()
      if(res){
      setOrders(res.data)
    }else{
      setError(res.message)
    }
    }catch(e){
      setError(e.message)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    refresh()
  },[])
  const canceling = async (item)=>{
    setOrder(item)
    setCancelModal(true)
  }
  const cancel = async (reason)=>{
    try{
      setLoading(true)
      const res = await canceled({id:order.id,reason})
      if(res) refresh()
      setCancelModal(false)
    }catch(e){
      setError(e.message)
    }
    setLoading(false)
  }
  const edit = async (item)=>{
    console.log('item',JSON.stringify(item,null,2))
    setOrder(item)
    setEditModal(true)
  }
  const checkedOrder = async (id)=>{
    setLoading(true)
    try{
      const res = await checked(id)
      if(res) refresh()
        alert('تم تاكيد الطلب')
    }catch(e){
      setError(e.message)
    }
    setLoading(false)
  }
  return (
    <Screen style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Button title="تسجيل الخروج" onPress={() =>{logout(setUser)} }  />
      <Button title="تحديث الصفحة" onPress={refresh}  />
      {error && <Text style={{color:'red'}}>{error}</Text>}
       <ActivityIndicator visible={loading}/>
       <FlatList
       data={orders}
       renderItem={({item})=>{
         return<>
         <OrderCard item={item}/>
         <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%'}}>

         <Button title='الغاء الطلب' onPress={()=>canceling(item)}/>
         <Button title='تاكيد الطلب' onPress={()=>checkedOrder(item.id)}/>
         <Button title='تعديل الطلب' onPress={()=>edit(item)}/>
         </View>

         </> 
       }}
       keyExtractor={(item)=>item.id}
       refreshing={loading}
       onRefresh={refresh}
       />
       
       <Modal visible={editModal} transparent={true} animationType='fade' 
       style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center',opacity:0.9}}>
          <View style={{width:'93%',backgroundColor:'white',borderRadius:10}}>
            <Text>هل انت متاكد من تعديل الطلب؟</Text>
            <EditOrderScreen order={order} setModal={setEditModal} refresh={refresh}/>

          

          </View>
        </View>
       </Modal>
       {/* cancel modal */}
       <Modal visible={cancelModal} transparent={true} animationType='fade' 
       style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <View style={{width:'80%',padding:20,backgroundColor:'white',borderRadius:10}}>
            <Text>هل انت متاكد من الغاء الطلب؟</Text>
            <TextInput placeholder='reason' onChangeText={(text)=>setCancelReason(text)}/>
            <Button title='تاكيد الغاء الطلب' onPress={()=>cancel(cancelReason)}/>
            <Button title='التراجع عن الغاء الطلب' onPress={()=>setCancelModal(false)}/>
          </View>
        </View>
       </Modal>
    </Screen>
  )
}

export default CustomerServesScreen