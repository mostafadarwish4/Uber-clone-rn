import {
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectTravelTimeInfo, setDestination } from "../app/slices/navigationSlice";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ridesData } from "../data/rides";
const RideOptionsCard = () => {
  const navigation = useNavigation();
  const dispatch=useDispatch();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInfo);
  console.log(travelTimeInformation?.duration.value,'travel ride')
  const SURGE_CHARGE_RATE = 1.25;
  const price= +(travelTimeInformation?.duration.value) *SURGE_CHARGE_RATE 
  useEffect(()=>{
    return()=>{
      dispatch(setDestination(null))
    }
  },[])
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw``}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[tw`absolute  top-1 left-0 px-5 rounded-full `]}
        >
          <Icon
            name={Platform.OS === "ios" ? "ios-chevron-back" : "md-arrow-back"}
            type="ionicon"
            size={30}
          />
        </TouchableOpacity>
        <Text style={tw`text-center mb-5 text-lg`}>
          Select a Ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <FlatList
        data={ridesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw.style(
              `flex-row justify-between items-center px-6`,
              id === selected?.id && "bg-gray-200"
            )}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{
                uri: image,
              }}
            />
            <View style={tw`-ml-8`}>
              <Text style={tw`text-lg font-bold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text}</Text>
            </View>
            <Text style={tw`text-lg`}>{new Intl.NumberFormat('en-gb',{
              style:'currency',
              currency:'USD',
            }).format( price*multiplier)}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw.style(
            `bg-black py-3 m-3`,
            !selected && "bg-gray-200"
          )}
        >
          <Text style={tw`text-center text-white text-lg`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};






export default RideOptionsCard;
