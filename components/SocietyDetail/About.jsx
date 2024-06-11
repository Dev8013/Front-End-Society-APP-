import { View, Text } from 'react-native'
import React from 'react'

export default function About({society}) {
  return (
    <View style={{
        padding:20,
        backgroundColor:'#fff',
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>About</Text>
      <Text style={{
        fontFamily:'outfit',
        lineHeight:25
      }}>{society?.about}</Text>
    </View>
  )
}