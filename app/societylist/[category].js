import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import SocietyListCard from '../../components/SocietyListCard';
import { Colors } from '../../constants/Colors';

export default function SocietyListByCategory() {

    const navigation=useNavigation();
    const {category}=useLocalSearchParams();

    const [societyList,setSocietyList] = useState();
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle:category
        })
        getSocietyList
    },[]);

    const getSocietyList=async()=>{
        setLoading(true);
        const q=query(collection(db,'SocietyList'),where("category",'==',category));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data())
            setSocietyList(prev=>[...prev,{id:doc?.id,...doc.data()}])
        })
        setLoading(false);
    }

  return (
    <View>
      
     {societyList?.length>0 &&loading==false?  <FlatList
      data={societyList}
      onRefresh={getSocietyList}
      refreshing={loading}
      renderItem={({item,index})=>(
        <SocietyListCard
        society={item}
        key={index}
        />
    )}
      />:
      loading?<ActivityIndicator
      style={{
        marginTop:'60%'
      }}
      size={'large'}
      color={Colors.PRIMARY}
      />:
    <Text style={{
        fontSize:20,
        fontFamily:'outfit-bold',
        color:Colors.GRAY,
        textAlign:'center',
        marginTop:'50%'
    }}>No Society Found</Text>}
    </View>
  )
}