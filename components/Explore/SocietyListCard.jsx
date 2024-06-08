import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function SocietyListCard({society}) {

    const router=useRouter();

  return (
    <TouchableOpacity 
    onPress={()=>router.push('/societydetail/'+society?.id)}
    style={{
        backgroundColor:'#fff',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        marginTop:15
    }}>
      <Image source={{uri:society?.imageUrl}} 
      style={{
        width:'100%',
        height:150,
        borderTopRightRadius:15,
        borderTopLeftRadius:15
      }}
      />
      <View style={{
        padding:10
      }}>
        <Text style={{
            fontSize:20,
            fontFamily:'outfit-bold'
        }}>{society?.name}</Text>
        <Text style={{
            fontFamily:'outfit',
            color:Colors.GRAY
        }}>{society?.address}</Text>
      </View>
    </TouchableOpacity>
  )
}