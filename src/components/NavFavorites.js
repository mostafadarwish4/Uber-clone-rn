import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  selectOrigin,
  setDestination,
  setOrigin,
} from "../app/slices/navigationSlice";
import { useDispatch, useSelector } from "react-redux";

import { Icon } from "react-native-elements";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { favoritesData } from "../data/locations";

const NavFavorites = ({ shouldSetOrigin }) => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();

  return (
    <FlatList
      data={favoritesData.filter(
        // Checks to see if Home or Work is already selected
        (item) => shouldSetOrigin || origin?.location !== item.location
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View
          style={[
            tw`bg-gray-200`,
            {
              height: 0.5,
            },
          ]}
        />
      )}
      renderItem={({ item: { name, icon, location, description } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center py-5`}
          onPress={() => {
            if (shouldSetOrigin) {
              dispatch(
                setOrigin({
                  location,
                  description,
                })
              );
              navigation.navigate("MapScreen");
            } else {
              dispatch(
                setDestination({
                  location,
                  description,
                })
                );
                navigation.navigate("RideOptionsCard");
            }
          }}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-bold text-lg`}>{name}</Text>
            <Text style={tw`text-gray-500`}>{description}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};



export default NavFavorites;
