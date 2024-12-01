import Screen from "../../components/Screen";
import { useState,useEffect } from "react";
import { View,Modal,TextInput,Button,Alert,FlatList,StyleSheet,Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import {getDevices,updateDevicePrice,updateDeviceName,deleteDevice} from "../../api/managerService";
import ActivityIndicator from "../../components/ActivityIndicator";

// import AppText from "./components/AppText";


export default DevicesScreen = () => {
    const [devices,setDevices] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [refreshing,setRefreshing] = useState(false);
    const [modalVisible,setModalVisible] = useState(false);
    const [editPriceModalVisible,setEditPriceModalVisible] = useState(false);
    const [editNameModalVisible,setEditNameModalVisible] = useState(false);
    const [name,setName] = useState();
    const [price,setPrice] = useState();
    const [id,setId] = useState();

    const handleRefresh = async ()=>{
        setRefreshing(true);
        await getDevicesData();
        setRefreshing(false);
    }

    async function getDevicesData(){
        setLoading(true);
        let result = await getDevices();
        if(!result) setError(true);
        else setDevices(result.data);
        setLoading(false);
    }
    useEffect(()=>{getDevicesData()},[])

    return <Screen style={{flex:1 ,backgroundColor:colors.light}}>
        <ActivityIndicator visible={loading}/>
        <Text style={!error? { display:'none'}:{color:colors.danger,fontSize:20,fontWeight:'bold',textAlign:'center',marginVertical:10 }}
         >حدث خطأ أثناء جلب الأجهزه</Text>
        <FlatList
            data={devices}
            keyExtractor={(device)=>device.id.toString()}
            renderItem={({item})=> <DeviceItem 
            device={item} setId={setId} setName={setName} setPrice={setPrice} setModalVisible={setModalVisible}/>}
        //  numColumns={2}
         refreshing={refreshing}
         onRefresh={handleRefresh}
        />
        <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View style={styles.modal}>
            
            <Pressable style={styles.modalButton} onPress={()=>{
                setEditPriceModalVisible(true);
                 setModalVisible(false);
                setPrice(price)
            }} >
                <Text style={{fontSize:24}}>تعديل السعر</Text>
                    <Icon  name="pencil" size={20} color={colors.primary}/>
                </Pressable>
             
                <Pressable style={styles.modalButton} onPress={()=>{
                    setEditNameModalVisible(true);
                    setModalVisible(false);
                    setName(name)
                }}>
                <Text style={{fontSize:24}}>تعديل الاسم</Text>
                    <Icon  name="pencil" size={20} color={colors.primary}/>
                </Pressable>    
            
            
            <Pressable style={[styles.modalButton,{borderBottomWidth:0}]} onPress={()=>
                
                        Alert.alert("مسح الجهاز", "هل انت متأكد من مسح هذا الجهاز؟", [
                    {text: "إلغاء", style: "cancel"},
                    {text: "مسح", onPress:async () => {
                            setLoading(true);
                            setDevices(devices.filter(d=>d.id !== id))
                            setModalVisible(false);
                            await deleteDevice(id)
                            setLoading(false);
                    }}
                ])
            }>
                <Text style={{fontSize:24}}>مسح</Text>
                    <Icon  name="delete" size={20} color={colors.primary}/>
                </Pressable>
            <Pressable style={{position:'absolute',top:15,right:10,padding:5,backgroundColor:colors.primary,
                borderRadius:10}} onPress={()=>setModalVisible(false)}>
                    <Icon  name="close" size={20} color={colors.light}/>
                </Pressable>
            </View>
            </Modal>
            <Modal visible={editPriceModalVisible} transparent={true} animationType="slide" >
                <View style={styles.modal}>
                    <Text style={{fontSize:24,fontWeight:'bold',marginBottom:10}}>تعديل السعر</Text>
                    <TextInput
                    style={styles.input}
                     placeholder="السعر"
                     value={price}
                   onChangeText={(text)=>setPrice(text)}
                    />
                    <Button title="تحديث" onPress={async ()=>{
                        setLoading(true);
                        setDevices(devices.map(d=>d.id === id ? {...d,price:price} : d))
                        setEditPriceModalVisible(false)
                    await updateDevicePrice(id,price)
                    setPrice('')
                    setLoading(false);
                    }}/>
                </View>
            </Modal>
            <Modal visible={editNameModalVisible} transparent={true} animationType="slide" >
                <View style={styles.modal}>
                    <Text style={{fontSize:24,fontWeight:'bold',marginBottom:10}}>تعديل الاسم</Text>
                    <TextInput 
                    style={styles.input}
                     placeholder="اسم الجهاز"
                    value={name}
                    onChangeText={ (text)=>setName(text)}/>
                <Button title="تحديث"  onPress={async ()=>{
                    setLoading(true);
                    setDevices(devices.map(d=>d.id === id ? {...d,name:name} : d))
                    setEditNameModalVisible(false)
                    await updateDeviceName(id,name)
                    setName('')
                    setLoading(false);
                }}/>
                </View>
            </Modal>
    </Screen>
}

const DeviceItem = ({device,setModalVisible,setId,setName,setPrice}) => {
    
    

    return <View style={styles.container}>
        <Icon  name="cog-outline" size={30} color={colors.primary} 
        onPress={()=>{
            setModalVisible(true)
            setId(device.id)
            setName(device.name)
            setPrice(device.price)
        }
        }/>

        <Text style={styles.name}>{device.name}</Text>
        <Text style={styles.price}>{device.price}</Text>
        
    </View>
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        backgroundColor:colors.white,
        flexDirection:'row-reverse',
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:15,
        marginVertical:15,
        borderRadius:15,
        borderWidth:2,
        borderColor:colors.primary,
    },
    modal:{
        alignSelf:'center',
        top:'25%',
        alignItems:'center',
        justifyContent:'center',
        width:'50%',
        borderRadius:30,
        backgroundColor:colors.white,
        padding:40,
        borderWidth:2,
        borderColor:colors.primary,
    },
    modalButton:{
        flexDirection:'row',gap:15 ,paddingVertical:25,borderBottomWidth:2,borderColor:colors.primary,alignItems:'center',justifyContent:'center'
    },
    input:{
        borderWidth:2,
        borderColor:colors.primary,
        borderRadius:10,
        padding:10,
        width:'100%',
        marginVertical:10,fontSize:18
    },
    name:{
        fontSize:20,
        textAlign:'right',
        fontWeight:'bold',

    },
    price:{
        fontSize:16,
        backgroundColor:colors.primary,
        color:colors.white,
        textAlign:'center',
        borderWidth:2,
        width:75,
        borderColor:colors.primary,
        borderRadius:10,
        padding:10,
    }
})
