import { View, Text, FlatList,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import {useRouter} from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';


export default function MenuList() {

  const router=useRouter();
  const {singOut} = useAuth();

    const menuList=[
        {
            id:1,
            name:'Society',
            icon:require('./../../assets/images/add.png'),
            path:'/society/society'
        },
        {
            id:2,
            name:'Clubs',
            icon:require('./../../assets/images/add2.png'),
            path:'/club/club'
        },
        {
            id:3,
            name:'Communities',
            icon:require('./../../assets/images/add.png'),
            path:'/communities/communities' 
        },{
            id:4,
            name:'Logout',
            icon:require('./../../assets/images/logout.png'),
            path:'logout'
        }
    ]
    const onMenuClick=(item)=>{
      if(item.path=='logout'){
        singOut();
        return;
      }
      router.push(item.path)
    }
  return (
    <View style={{
        marginTop:50
    }}>
      <FlatList 
      data={menuList}
      numColumns={2}
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