import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import {Colors} from './../../constants/Colors'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { Rating } from 'react-native-ratings';

export default function Review({society}) {

    const [rating,setRating] = useState(4);
    const [userInput,setUserInput] = useState();
    const {user}= useUser();

    const onSubmit=async()=>{
      const docRef=doc(db,'SocietyList',society?.id);
      await updateDoc(docRef,{
        reviews:arrayUnion({
          rating:rating,
          comment:userInput,
          userName:user?.fullName,
          userImage:user?.imageUrl,
          userEmail:user?.primaryEmailAddress?.emailAddress
        })
      })
    }

  return (
    <View style={{
        padding:20,
        backgroundColor:'#fff'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>Reviews</Text>

      <View>
        <Rating 
        showRating={false}
        imageSize={20}
        onFinishRating={(rating)=>setRating(rating)}
        style={{
            paddingVertical:10
        }}
        />
        <TextInput 
        placeholder='Write your comment'
        numberOfLines={4}
        onChangeText={(value)=>setUserInput(value)}
        style={{
          borderWidth:1,
          padding:10,
          borderRadius:10,
          borderColor:Colors.GRAY,
          textAlignVertical:'top'
        }}
        />
        <TouchableOpacity 
        disabled={!userInput}
        onPress={()=>onSubmit()}
        style={{
          padding:10,
          backgroundColor:Colors.PRIMARY,
          borderRadius:6,
          marginTop:10

        }}>
          <Text style={{
            fontFamily:'outfit',
            color:'#fff',
            textAlign:'center'
          }}>Submit</Text>
        </TouchableOpacity>
      </View>
          <View>
            {society?.reviews?.map((item,index)=>(
              <View style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap:10,
                padding:10,
                borderRadius:15,
                borderColor:Colors.GRAY,
                marginTop:10
              }}>
                <Image source={{uri:item.userImage}} 
                style={{
                  width:50,
                  height:50,
                  borderRadius:99
                }}
                />
                <View style={{
                  display:'flex',
                  gap:5
                }}>
                  <Text style={{
      
                    fontFamily:'outfit-medium'
                  }}>{item.userName}</Text>
                  <Rating
                  imageSize={20}
                  ratingCount={item.rating}
                  style={{
                    alignItems:'flex-start'
                  }}
                  />
                  <Text>{item.comment}</Text>
                </View>
                
              </View>
            ))}
          </View>
    </View>
  )
}