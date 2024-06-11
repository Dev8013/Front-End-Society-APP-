import { View, Text, FlatList, TouchableOpacity, Linking,Image} from 'react-native'
import React from 'react'

export default function ActionButton({society}) {

    const actionButtonMenu=[
        {
            id:1,
            name:'Call',
            icon:require('./../../assets/images/call.png'),
            url:'tel:'+society?.contact
        },
        {
            id:2,
            name:'Location',
            icon:require('./../../assets/images/pin.png'),
            url:'https://www.google.com/maps/search/?api=1&query='+society?.address

        },
        {
            id:3,
            name:'Share',
            icon:require('./../../assets/images/share.png'),
            url:'tel:'+society?.contact
        }
    ]

    const onPressHandler=(item)=>{
        if(item.name=='share') {
            return;
        }
        Linking.openURL(item.url);
    }

  return (


    <View style={{
        backgroundColor: '#fff',
        padding:20
    }}>
      <FlatList
      data={actionButtonMenu}
      numColumns={4}
      columnWrapperStyle={{justifyContent:'space-between'}}
      renderItem={({item,index})=>(
        <TouchableOpacity key={index}
        onPress={()=>
            onPressHandler(item)
        }
        >
            <Image source={item?.icon}
            style={{
                with:50,
                height:50
            }}
            />
            <Text style={{
                fontFamily:'outfit-medium',
                textAlign:'center',
                marginTop:3
            }}>{item.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}