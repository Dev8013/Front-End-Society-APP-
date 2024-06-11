import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors'
import {useRouter} from 'expo-router'

export default function society() {

    const router=useRouter();

    const societylist=[
        {
            id:1,
            name:'Created',
            icon:require('./../../assets/images/add.png'),
            path:'../CreateSociety/CreateSociety'
        },
        {
            id:2,
            name:'Joined',
            icon:require('./../../assets/images/add.png'),
            path:'../CreateSociety/my-society'
        }
    ]
    const onMenuClick=(item)=>{
        router.push(item.path)
      }

    const navigation=useNavigation();
    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'Create or View Societies',
            headerShown:true,
        })
    },[])
  return (
    <View style={{
        
    }}>
        <FlatList
        data={societylist}
        renderItem={({item,index})=>(
            <TouchableOpacity 
            onPress={()=>onMenuClick(item)}
            style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap:10,
                flex:1,
                padding:10,
                borderRadius:15,
                borderWidth:1,
                margin:10,
                backgroundColor:'#fff',
                borderColor:Colors.PRIMARY
              }}>
                 <Image source={item.icon} 
            style={{
                width:50,
                height:50
            }}
            />
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:14,
                flex:1
            }}>{item.name}</Text>
            </TouchableOpacity>
        )}
        />
    </View>
  )
}