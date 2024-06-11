import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { deleteDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';


export default function Intro({society}) {

  

  const {user}=useUser();

    const router=useRouter();

    const OnDelete=()=>{
      Alert.alert('Do you want to Delete?',[{
        text:'Cancel',
        style:'cancel'
      }
    ,
  {
    text:'Delete',
    style:'destructive',
    onPress:()=>deleteSociety()
  }])
    }
    const deleteSociety=async()=>{
      console.log('Delete');
      await deleteDoc(doc(db,'SocietyList',society?.id));
      router.back();
      ToastAndroid.show('Society Deleted',ToastAndroid.LONG)
    }

  return (
    <View>
        <View style={{
            position:'absolute',
            zIndex:10,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            width:'100%',
            padding:20
        }}>
            <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons name="arrow-back-circle" size={40} color="white" />
            </TouchableOpacity>
        
        <Ionicons name="heart-outline" size={40} color="white" />
        </View>
      <Image source={{uri:society?.imageUrl}}
        style={{
            width:'100%',
            height:340
        }}
      />
      <View style={{
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#fff',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        padding:20,
        marginTop:-20,
        justifyContent:'space-between',
        alignItems:'center'
      }}>
      <View style={{
        padding:20,
        marginTop:-20,
        backgroundColor:'#fff',
        borderTopLeftRadius:25,
        borderTopRightRadius:25
      }}>
        <Text style={{
            fontSize:26,
            fontFamily:'outfit-bold'
        }}>{society?.name}
        
        </Text>
        <Text style={{
            fontSize:18,
            fontFamily:'outfit'
        }}>{society?.address}</Text>
      </View>
      {user?.primaryEmailAddress.emailAddress==society?.userEmail&&<TouchableOpacity 
      onPress={()=>OnDelete()}
      >
      <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>}
      

      </View>
      
    </View>
  )
}