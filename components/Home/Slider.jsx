import { View, Text,Image, FlatList } from 'react-native';
import { useEffect, useState, React } from 'react';
import { query, collection, getDoc, getDocs, } from 'firebase/firestore';

import {db} from './../../configs/FirebaseConfig';

export default function Slider() {

    const [sliderList,setSliderList] = useState([]);

    useEffect(()=>{
        GetSliderlist();
    },[]);

    const GetSliderlist =async()=>{
        setSliderList([]);
        const q = query(collection(db,'Slider'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setSliderList(prev=>[...prev,doc.data()]);
        })
    }

  return (
    <View>
      <Text style={{
        fontSize:20,
        fontFamily:'outfit-bold',
        paddingLeft:20,
        paddingTop:20,
        marginBottom:5
      }}>#Special for you</Text>
        <FlatList 
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
            paddingLeft:20,

        }}
        renderItem={({item,index})=>(
            <Image source={{uri:item.imageUrl}}
            style={{
                width:300,
                height:150,
                marginRight:15,
                borderRadius:15
            }}
            />
    )}
        />
      
    </View>
  )
}