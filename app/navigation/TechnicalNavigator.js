import { createDrawerNavigator } from "@react-navigation/drawer";
import TechnicalOrdersScreen from "../screens/technical/TechnicalOrdersScreen";
import OrderDetailsScreen from "../screens/technical/OrderDetailsScreen";

const Drawer = createDrawerNavigator();

const TechnicalNavigator = ({setUser}) => {
    let TechnicalOrdersScreenWithProps = () => <TechnicalOrdersScreen  setUser={setUser} />;
 return <Drawer.Navigator>
    <Drawer.Screen name="Home" component={TechnicalOrdersScreenWithProps} />
    <Drawer.Screen name="OrderDetails" component={OrderDetailsScreen} /> 
  </Drawer.Navigator>
};
    
export default TechnicalNavigator;
