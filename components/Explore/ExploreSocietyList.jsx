import { View, Text, FlatList } from 'react-native'
import React from 'react'
import SocietyListCard from './SocietyListCard'

export default function ExploreSocietyList({societyList}) {
  return (
    <View>
      <FlatList
      data={societyList}
      showsVerticalScrollIndicator={false}
      renderItem={({item,index})=>(
        <View>
            <SocietyListCard 
            key={index}
            society={item}/>
        </View>
     )}
      />
      <View style={{
        height: 400
      }}>

      </View>
    </View>
  )
}