import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import tw from 'twrnc'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../app/slices/navigationSlice'
const CurentLocation = () => {
    const origin=useSelector(selectOrigin);
  return (
    <View style={tw`flex-row m-2 `}>
      <Icon name='navigation' color='black' type='feather' size={30}/>
      <Text style={tw`text-lg mx-2`}>{origin?.description || 'No location set yet'}</Text>
    </View>
  )
}

export default CurentLocation

const styles = StyleSheet.create({})