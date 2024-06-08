import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { useRouter } from 'expo-router'

export default function SocietyListCard({society}) {
    const router=useRouter();
  return (
    <TouchableOpacity style={{
        padding:10,
        margin:10,
        borderRadius:15,
        backgroundColor:'#fff',
        display:'flex',
        flexDirection:'row',
        gap:10
    }}
    onPress={()=>router.push('/societydetail/'+society.id)}
    
    >
        <Image
        source={{uri:society.imageUrl}}
        style={{
            width: 120,
            height: 120,
            borderRadius:15
        }}
        />
        <View style={{
            flex:1,
            gap:7
        }}>
            <Text style={{
                fontFamily:'outfit-blod',
                fontSize:20
            }}>{society.name}</Text>
            <Text style={{
                fontFamily:'outfit',
                color:Colors.GRAY,
                fontSize:15
            
            }}>{society.address}</Text>
            <View style={{
            display:'flex',
            flexDirection:'row',
            gap:5
        }}>
            <Image source={require('./../assets/images/star.png')} 
            style={{
                width:15,
                height:15
            }}
            />
            <Text style={{fontFamily:'outfit'}}>Likes 4K</Text>
        </View>
        </View>
    </TouchableOpacity>
  )
}