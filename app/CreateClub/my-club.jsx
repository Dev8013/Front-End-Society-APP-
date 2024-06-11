import { View, Text, FlatList, Image, TouchableOpacity,TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors'
import {useRouter} from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import {collection, getDocs, query,ref,snapshotEqual,uploadBytes,getDownloadURL, setDoc, where} from 'firebase/firestore';
import {db, storage} from './../../configs/FirebaseConfig';
import {useUser} from '@clerk/clerk-expo';
import SocietyListCard from './../../components/SocietyListCard'

export default function MyClub() {

  const navigation=useNavigation();
  useEffect(()=>{
      navigation.setOptions({
          headerTitle:'My-Club',
          headerShown:true,
      })
  },[])

    const [societyList,setSocietyList] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        user&&GetUserSociety()
    },[user])

    const {user}=useUser();

    const GetUserSociety=async()=>{
      setLoading(true);
        setSocietyList([]);

        const q=query(collection(db,'SocietyList'),where('userEmail','==',user?.primaryEmailAddress.emailAddress));

        const querySnapshot=await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setSocietyList(prev=>[...prev,{id:doc,...doc.data()}])
        })
        setLoading(false);

    }

  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>My Clubs</Text>

      <FlatList 
      data={societyList}
      onRefresh={GetUserSociety}
      refreshing={loading}
      renderItem={({item,index})=>(
        <SocietyListCard society={item}
        key={index}
        />
      )}
      />
    </View>
  )
}