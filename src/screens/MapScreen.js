import { TouchableOpacity, View } from "react-native";

import { Icon } from "react-native-elements";
import Map from "../components/Map";
import MapScreenNavigation from "../components/MapScreenNavigation";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={tw`bg-gray-50 absolute top-8 left-4 z-50 p-3 rounded-full shadow-lg`}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <MapScreenNavigation />
      </View>
    </View>
  );
};

export default MapScreen;
