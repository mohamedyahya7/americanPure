import React from "react";
import { View,Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


function MapMarker({ location }) {

return (
        <View style={{ flex: 1 }}>
          <Text>hi</Text>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location?.latitude || 0,
              longitude: location?.longitude || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {location && (<Text>hi</Text>
              // <Marker coordinate={{ latitude: location.latitude, longitude: location.longitu }} />
            )}
          </MapView> 
        </View>
      );}
// const styles = StyleSheet.create({
// });

export default MapMarker;
