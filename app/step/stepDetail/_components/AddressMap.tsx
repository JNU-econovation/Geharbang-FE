import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function AddressMap() {
  return (
    <View className='h-60'>
      <MapView
        style={{ flex: 1, borderRadius: 10 }}
        initialRegion={{
          latitude: 37,
          longitude: 127,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomEnabled={true}
        mapType={"standard"}
      >
        <Marker
          coordinate={{
            latitude: 37,
            longitude: 127,
          }}
        />
      </MapView>
    </View>
  );
}
