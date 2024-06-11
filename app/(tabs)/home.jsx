import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import SocietyList from '../../components/Home/SocietyList'

export default function home() {
  return (
    <ScrollView>
      {/* Header */}

      <Header/>

      {/* Slider */}

      <Slider/>

      {/* Categories */}

      <Category/>
      {/* popular society */}

      <SocietyList/>

      <View style={{
        height:50
      }}>

      </View>
      
    </ScrollView>
  )
}