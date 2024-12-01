import { StyleSheet,TouchableOpacity,View,Text  } from "react-native";
import { useState,useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import AppText from "../../components/Text";
import routes from "../../navigation/routes";
import { getManagerDetails } from "../../api/managerService";
//منصة المدير العام 

// الصفحه عباره عن كروت متقسمه بالنص كارت عن الاجهزه والموظفين والفريق والطلبات والاشعارات والتقارير

// كل كارت يحتوي علي كارد للاضافه والتعديل والحذف

export default function ManagerMainScreen({navigation}){
    const [managerDetails,setManagerDetails] = useState(null);
    useEffect(()=>{
        fetchManagerDetails();
    },[]);

    const fetchManagerDetails = async ()=>{
        const {data} = await getManagerDetails();
        setManagerDetails(data);
        console.log('manager details 1',JSON.stringify(managerDetails,null,2));
    }
    //هنا يتم تقسيم الكارتات بالنص 
    return <Screen style={styles.container}>
        {/* كارت الاجهزه */}
        <TouchableOpacity onPress={()=>fetchManagerDetails()}>
        <Text>تحديث</Text>
        </TouchableOpacity>
        {/* كارت الاجهزه */}
        <TouchableOpacity onPress={()=>navigation.navigate(routes.DEVICES)}>
        
        <View style={styles.card}>  
            <View style={styles.cardItem}>
              {/* <Icon name="devices" color={colors.primary} size={40} /> */}
              <AppText> الاجهزه</AppText>
              
            </View>
            <View style={styles.cardItem}>
              <AppText style={styles.cardItemText}>{managerDetails?.devicesCount}</AppText>
            </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate(routes.TEAMS,{teams:managerDetails.teams})}>
        <View style={styles.card}>  
            <View style={styles.cardItem}>
              {/* <Icon name="devices" color={colors.primary} size={40} /> */}
              <AppText> الفريق</AppText>

            </View>
            <View style={styles.cardItem}>
              <AppText style={styles.cardItemText}>{managerDetails?.teamsCount}</AppText>
            </View>
        </View>
        </TouchableOpacity>
        {/* كارت الموظفين */}
        <TouchableOpacity onPress={()=>navigation.navigate(routes.EMPLOYEES)}>
            <View style={styles.card}>
                <View style={styles.cardItem }>
                    <Icon name="users" color={colors.primary} size={40} />
                    <AppText>الموظفين</AppText> 
                </View>
                <View style={styles.cardItem}> 
                    <AppText style={styles.cardItemText}>8/10</AppText>
                </View>
            </View>
        </TouchableOpacity>



    </Screen>
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        margin:10,
        },
    card:{
        marginTop:10,
        width:'100%',
        borderRadius:30,
        gap:10,
        padding:20,
        backgroundColor:colors.light,                
        borderColor:colors.primary,
        borderWidth:3 ,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'

        },
    cardItem:{
        flexDirection:"row",
        gap:5,
        alignItems:"center",width:'50%',
        justifyContent:"center"
    },
    cardItemText:{
        fontWeight:"bold",
        textAlign:"center",
        fontSize:26
    }

})



