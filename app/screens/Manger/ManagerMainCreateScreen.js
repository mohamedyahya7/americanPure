import { StyleSheet,TouchableOpacity,View  } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import AppText from "../../components/Text";
import routes from "../../navigation/routes";

//منصة المدير العام 

// الصفحه عباره عن كروت متقسمه بالنص كارت عن الاجهزه والموظفين والفريق والطلبات والاشعارات والتقارير

// كل كارت يحتوي علي كارد للاضافه والتعديل والحذف

export default function ManagerMainCreateScreen({navigation}){
//هنا يتم تقسيم الكارتات بالنص 
    return <Screen style={styles.container}>
        
        {/* كارت الاجهزه */}
        <TouchableOpacity onPress={()=>navigation.navigate(routes.CREATEDEVICE)}>
        <View style={styles.card}>  
            <View style={styles.cardItem}>
              {/* <Icon name="devices" color={colors.primary} size={40} /> */}
              <AppText>جهاز</AppText>
              
            </View>
           
        </View>
        </TouchableOpacity>
        {/* كارت الموظفين */}
        <TouchableOpacity onPress={()=>navigation.navigate(routes.CREATEEMPLOYEE)}>
            <View style={styles.card}>
                <View style={styles.cardItem }>
                    <Icon name="users" color={colors.primary} size={40} />
                    <AppText>موظف</AppText> 
                </View>
                
            </View>
        </TouchableOpacity>
        {/* كارت الفريق */}
        <TouchableOpacity onPress={()=>navigation.navigate(routes.CREATETEAM)}>
            <View style={styles.card}>
                <View style={styles.cardItem }>
                    <Icon name="users" color={colors.primary} size={40} />
                    <AppText>فريق</AppText> 
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



