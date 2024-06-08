import { View, Text,Image } from 'react-native'
import React from 'react'
import {Colors} from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";


WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow();
  
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    }, []);

  return (
    <View>
        <View style={{
           display:'flex',
           alignItems: 'center',
           marginTop:100
        }}>
        <Image source={require('./../assets/images/front.png')}
      style={{
        width: 220,
        height: 450,
        borderRadius:20,
        borderWidth:6,
        borderColor:'#000'

      }}
      />
        </View>
      
      <View style={{
        backgroundColor:'#fff', 
        padding:20,
        marginTop:-20,
        elevation:1
        }}>

        <Text style={{
            fontSize: 35,
            fontFamily:'outfit-bold',
            textAlign:'center'
        }}>Your Ultimate <Text style={{color:Colors.PRIMARY}}>Society Community </Text>App</Text>
        
        <Text style={{
            fontSize: 15,
            fontFamily:'outfit',
            textAlign:'center',
            marginTop:20,
            color:Colors.GRAY
        }}>Find Socities And Join Them Now</Text>

        <TouchableOpacity style={{
            backgroundColor:Colors.PRIMARY,
            padding:16,
            borderRadius:99,
            marginTop:20

        }} onPress={onPress}>
            <Text style={{textAlign:'center',color:'#fff',fontFamily:'outfit'}}>Lets Get Started</Text>
        </TouchableOpacity>

      </View>


    </View>
  )
}


