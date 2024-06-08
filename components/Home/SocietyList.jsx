import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Colors} from './../../constants/Colors'
import { query, collection, getDoc, getDocs,limit } from 'firebase/firestore';
import {db} from './../../configs/FirebaseConfig';
import PopularSocietyList from './PopularSocietyList'

export default function SocietyList() {

    const [societyList,setSocietyList] = useState([]);

    useEffect(()=>{
        GetSocietyList();
    },[])

    const GetSocietyList=async()=>{

        setSocietyList([]);

        const q=query(collection(db,'SocietyList'),limit(10));
        const querySnapshot= await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());

            setSocietyList(prev=>[...prev,{id:doc.id,...doc.data()}])
        })
    }

  return (
    <View>
      <View style={{
                padding:20,
                display:'flex',
                flexDirection:'row',
                marginTop: 10,
                justifyContent:'space-between'
            }}>
                <Text style={{
                
                    
                    fontSize: 20,
                    fontFamily: 'outfit-bold'
                }}>Popular Society</Text>
                <Text style={{color:Colors.PRIMARY,fontFamily:'outfit-medium'}}>View All</Text>
            </View>

            <FlatList
                data={societyList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item,index})=>(
                    <PopularSocietyList
                    society={item}
                    key={index}
                    />
                )}
            />
    </View>
  )
}