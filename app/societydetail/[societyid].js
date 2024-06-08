import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { collection, doc, getDoc, query } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/SocietyDetail/Intro';
import ActionButton from '../../components/SocietyDetail/ActionButton';
import About from '../../components/SocietyDetail/About';
import Review from '../../components/SocietyDetail/Review';

export default function SocietyDetail() {

  const {societyid}=useLocalSearchParams();
  const [society,setSociety] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
  GetSocietyDetailById();
  },[])



  const GetSocietyDetailById=async()=>{
    setLoading(true);
    // const q=query(collection(db,'SocietyList'))
    const docRef=doc(db,'SocietyList',societyid);
    const docSnap=await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:",docSnap.data());
      setSociety({id:docSnap.id,...docSnap.data()});
      setLoading(false);
    } else {
      console.log("No such Document!");
    }
  }

  return (
    <View>
      {loading?
      <ActivityIndicator
      size={'large'}
      color={Colors.PRIMARY}

      style={{
        marginTop:'70%'
      }}
      />:
      <ScrollView>

        {/* Intro */}

        <Intro society={society}/>

        {/* ActionButton */}

        <ActionButton society={society}/>

        {/* AboutSection */}

        <About society={society}/>

        {/* ReviewSection */}

        <Review society={society}/>

      </ScrollView>
      }
    </View>
  )
}