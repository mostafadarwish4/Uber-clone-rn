import { FlatList, SafeAreaView,TouchableOpacity, StyleSheet, Text,TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import tw from "twrnc";
import { locations } from '../data/locations';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../app/slices/navigationSlice';
import { useNavigation, useRoute } from '@react-navigation/native';

const RenderComponent=({item,setSearch,s})=>{
  const dispatch=useDispatch();
  const navigation=useNavigation()
  const {name}=useRoute()
  return(
    <TouchableOpacity onPress={()=>{
      //console.log(item,'RT')
      if(name==='HomeScreen'){
         dispatch(
              setOrigin({
                location: item?.location,
                description: item.description,
              })
            );
            setSearch(item.title)
            dispatch(setDestination(null));
      }else{
         dispatch(
                setDestination({
                  location: item.location,
                  description: item.description,
                })
              );
              navigation.navigate("RideOptionsCard");
      }
      
    }}
     style={[tw`bg-gray-200 h-9 mx-2 `,{
      
     // height:35,
      marginHorizontal:10,
      borderRadius:5,
     
   }]}>
        <Text style={tw`text-black text-lg p-1`}>{item.name}</Text>
    </TouchableOpacity>
  )
}
export default function RealTimeSearch({to,from}) {
    const [search,setSearch]=useState('')
    const {name}=useRoute()
  return (
   <>
      <View
        style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={name==="HomeScreen"?"Where from?":"To where ?"}
          value={search}
          onChangeText={setSearch}
         
        />
      </View>
      <FlatList
        style={{marginBottom:10}}
        data={search?locations.filter(i=>i.name.toLowerCase().match(new RegExp(search.toLowerCase()))):[]}
        renderItem={({item})=><RenderComponent setSearch={setSearch} s={false} item={item}/>}
        keyExtractor={(item,index)=>item+index}
         ItemSeparatorComponent={()=><View style={tw`h-1  `}></View>}
      />
    </>
  )
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 10,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input:{
        height: 40, 
        marginLeft: 10,
        borderColor:'snow',
        borderWidth:1,
        borderRadius:3,
        color:'black',
        width:'92%',
        fontSize:18
    }
})