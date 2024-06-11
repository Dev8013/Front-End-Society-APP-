import { View, Text, FlatList, Image, TouchableOpacity,TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors'
import {useRouter} from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import {collection, getDocs, query,ref,snapshotEqual,uploadBytes,getDownloadURL, setDoc} from 'firebase/firestore';
import {db, storage} from './../../configs/FirebaseConfig';
import {useUser} from '@clerk/clerk-expo';


export default function CreateClub() {

    const {user}=useUser();
    const [loading,setLoading] = useState(false);
  
    const onSubmit=async()=>{
      setLoading(true);
      const fileName=Date.now().toString()+".jpg";
      const resp=await fetch(image);
      const blob=await resp.blob();
  
      const imageRef=ref(storage,'society-app/'+fileName);
  
      uploadBytes(imageRef,blob).then((snapshot)=>{
        console.log('Uploaded');
      }).then(resp=>{
        getDownloadURL(imageRef).then(async(downloadUrl)=>{
          console.log(downloadUrl);
          saveSocietyDetail(downloadUrl);
        })
      })
      setLoading(false);
    }
  
    const saveSocietyDetail=async(imageUrl)=>{
      await setDoc(doc(db,'SocietyList',Date.now().toString()),{
        name:name,
        address:address,
        contact:contact,
        about:about,
        email:email,
        category:category,
        username:user?.fullName,
        userImage:user?.imageUrl,
        imageUrl:imageUrl
      })
    }
  
    const [name,setName] = useState();
    const [address,setAddress] = useState();
    const [contact,setContact] = useState();
    const [email,setEmail] = useState();
    const [about,setAbout] = useState();
    const [categoryList,setCategoryList] = useState();
  
    const [category,setCategory] = useState([]);
  
    const GetCategoryList=async()=>{
      setCategory([]);
      const q=query(collection(db,'Category'));
      const snapShot=await getDocs(q);
      snapShot.forEach((doc)=>{
        console.log(doc.data());
        setCategory(prev=>[...prev,{
          label:(doc.data()).name,
          value:(doc.data()).name
        }])
      })
    }
  
      const [image,setImage] = useState(null);
  
      const onImagePick=async()=>{
  
          let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            setImage(result?.assets[0].uri);
      }
  
      const navigation=useNavigation();
      useEffect(()=>{
          navigation.setOptions({
              headerTitle:'Create Your Club',
              headerShown:true,
          })
          GetCategoryList();
      },[])
    return (
      <View style={{
          padding:20
      }}>
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:25
        }}>Create New Club</Text>
        <Text style={{
          fontFamily:'outfit',
          color:Colors.GRAY
        }}>Fill all detials in order to add new club</Text>
  
        <TouchableOpacity style={{
          marginTop:20
        }}
        onPress={()=>onImagePick()}
        >
          {!image?
        <Image source={require('./../../assets/images/placeholder.png')} 
        style={{
          width:100,
          height:100
        }}
        />
        :
        <Image source={{uri:image}} 
        style={{
          width:100,
          height:100,
          borderRadius:15
        }}
        />
      }
  
        </TouchableOpacity>
  
        <View>
          <TextInput placeholder='Name' 
          onChangeText={(v)=>setName(v)}
          style={{
              padding:10,
              borderWidth:1,
              borderRadius:5,
              fontSize:17,
              backgroundColor:'#fff',
              marginTop:10,
              borderColor:Colors.PRIMARY,
              fontFamily:'outfit'
          }}
          />
           <TextInput placeholder='Address' 
           onChangeText={(v)=>setAddress(v)}
          style={{
              padding:10,
              borderWidth:1,
              borderRadius:5,
              fontSize:17,
              backgroundColor:'#fff',
              marginTop:10,
              borderColor:Colors.PRIMARY,
              fontFamily:'outfit'
          }}
          />
           <TextInput placeholder='Contact' 
           onChangeText={(v)=>setContact(v)}
          style={{
              padding:10,
              borderWidth:1,
              borderRadius:5,
              fontSize:17,
              backgroundColor:'#fff',
              marginTop:10,
              borderColor:Colors.PRIMARY,
              fontFamily:'outfit'
          }}
          />
           <TextInput placeholder='Email' 
           onChangeText={(v)=>setEmail(v)}
          style={{
              padding:10,
              borderWidth:1,
              borderRadius:5,
              fontSize:17,
              backgroundColor:'#fff',
              marginTop:10,
              borderColor:Colors.PRIMARY,
              fontFamily:'outfit'
          }}
          />
           <TextInput placeholder='About'
           onChangeText={(v)=>setAbout(v)}
           multiline 
           numberOfLines={5}
          style={{
              padding:10,
              borderWidth:1,
              borderRadius:5,
              fontSize:17,
              backgroundColor:'#fff',
              marginTop:10,
              borderColor:Colors.PRIMARY,
              fontFamily:'outfit',
              height:100
          }}
          />
          <View style={{
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'#fff',
            marginTop:10,
            borderColor:Colors.PRIMARY,
            fontFamily:'outfit'
          }}>
          <RNPickerSelect
          onChangeText={(v)=>setCategoryList(v)}
        onValueChange={(value) => console.log(value)}
        items={category}
      />
          </View>
        </View>
        <TouchableOpacity 
        disabled={loading}
        onPress={()=>onSubmit()}
        style={{
          padding:15,
          backgroundColor:Colors.PRIMARY,
          borderRadius:5,
          marginTop:20
  
        }}>
          {loading?
            <ActivityIndicator 
            size={'large'}
            color={'#fff'}
            />:
            <Text style={{
            fontFamily:'outfit-medium',
            color:'#fff',
            textAlign:'center'
          }}>Submit</Text>}
        </TouchableOpacity>
  
        
      </View>
    )
  }