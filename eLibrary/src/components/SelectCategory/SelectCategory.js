import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import React from 'react'

//accepts list of buttons unique to every screens e.g. LocationScreen,
//SectionScreen and Subjects Screen
const SelectCategory = ({buttonsArray, buttonPressed, focused}) => {
// render each item from buttonsArray
// that contains a value of button name and an emoji to represent the button
  const _renderItem = ({item, index}) =>{
    return(
      // returns a dynamic view if buttons render to a <FlatList/> component
        <TouchableOpacity 
            focusable
          /*   android_ripple={{ color: '#41644A',radius: 50, borderless: false, foreground: false }} */
            onPress={buttonPressed.bind(this, item.name)}
            style={[
              styles.button,
              {backgroundColor: focused === item.name ? '#235952' : 'white' }]}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={[styles.buttonText, {color: focused === item.name ? 'white' : '#235952'}]}>{item.name}</Text>
        </TouchableOpacity>
    )
}

  return (
    <View style={styles.card}>
      <View style={styles.category}>
        <View style={styles.wrapper}>
          <Text style={styles.header}>SELECT CATEGORY :</Text>
          <FlatList
              ListFooterComponent={<View/>}
              ListFooterComponentStyle={{paddingBottom: 20}}
              numColumns={3}
              keyExtractor={(item) =>item.name}
              data={buttonsArray}
              renderItem={_renderItem}
              style={styles.flatList}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card:{
    zIndex: 99,
    display: 'flex',
    maxHeight: 150,
    minHeight: 100,
    alignItems: 'center',
    paddingTop: 5,
    backgroundColor: 'white',
 //   elevation: 10,
  },
  category:{
    flex: 3,
    width: '100%'
  },
  wrapper:{
    borderRadius: 5,
    overflow: 'hidden',
    flex: 1,
},
flatList:{
    margin: 0,
    paddingHorizontal: 5,
},
button:{
    marginHorizontal: 3,
    shadowColor: 'black',
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
   // flex: 1,
    paddingHorizontal: 30,
    borderRadius: 50,
    paddingLeft: 12,
    borderWidth: 0.5,
    borderColor: '#235952'
},
buttonText:{
    fontSize: 10,
    paddingVertical: 2,
    fontWeight: 500,
},
emoji:{
    position: 'absolute',
    fontSize: 15,
    color:'black',
    top: 2,
    zIndex: 99,
    right: 8, 
    borderRadius: 3,
},
header:{
    fontSize: 10,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#235952',
    paddingVertical: 2,
}
})

export default SelectCategory