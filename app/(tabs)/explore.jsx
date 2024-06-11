import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import Category from './../../components/Home/Category';
<<<<<<< HEAD
import { collection, getDocs, query,category } from 'firebase/firestore';
=======
import { collection, getDocs, query } from 'firebase/firestore';
>>>>>>> ec1fc8ecf80d4c9da6e6dedb3bed2c9f30be26be
import { db } from '../../configs/FirebaseConfig';
import ExploreSocietyList from '../../components/Explore/ExploreSocietyList';

export default function explore() {

<<<<<<< HEAD
  const [societyList,SetSocietyList] = useState([]);
=======
  const [societylist,SetSocietyList] = useState([]);
>>>>>>> ec1fc8ecf80d4c9da6e6dedb3bed2c9f30be26be

  const GetSocietyByCategory=async()=>{
    SetSocietyList([]);
    const q=query(collection(db,'SocietyList'),where('category','==',category));

    const querySnapshot=await getDocs(q);

    querySnapshot.forEach((doc)=>{
      console.log(doc.data());
      SetSocietyList(prev=>[...prev,{id:doc.id,...doc.data()}])
    })

  }

 

  return (
    <View style={{
      padding:20
    }}>

      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>Explore More</Text>

      {/* SearchBar */}
      <View style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap:10,
                backgroundColor:'#fff',
                padding:10,
                marginVertical:10,
                marginTop:15,
                borderRadius:15,
                borderWidth:1,
                borderColor:Colors.PRIMARY
            }}>
                {/* SearchBar */}
                <AntDesign name="search1" size={24} color={Colors.PRIMARY} />
                <TextInput placeholder='Search'
                style={{
                    fontFamily:'outfit',
                    fontSize:16
                }}
                />

            </View>

      {/* Category */}

                <Category 
                explore={true}
                onCategorySelect={(Category)=>GetSocietyByCategory(Category)}
                
                />

      {/* Society List */}

      <ExploreSocietyList societyList={societyList}/>

    </View>
  )
}