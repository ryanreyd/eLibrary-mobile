import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/EvilIcons'

// A search component that accepts input value
// and update the value every time a user is typing
// including backspace. Thanks to {onChangeText} <TextInput> property.
const Search = ({value, onChange}) => {
  return (
    <View style={styles.wrapper}>
        <Text style={styles.greet}>Welcome to e-library</Text>
        <View style={styles.searchBar}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={value}
                    placeholder='search...' 
                    onChangeText={onChange}
                    style={styles.input}
                />
            </View>
            <Pressable 
            android_ripple={{ color: '#F6EDDE',radius: 30, borderless: false, foreground: false }}
            style={styles.iconContainer}>
            <Icon
                name="search"
                size={20}
                color="gray"
            />
            </Pressable>
        </View>
        <Text style={styles.note}>Some books are available for download</Text>
    </View>

  )
}

const styles = StyleSheet.create({
wrapper:{
    paddingHorizontal: 30,
    paddingVertical: 5,
    elevation: 10,
    display: 'flex',
    alignItems:'center',
    backgroundColor: '#14C38E'
},
searchBar:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    width: '100%',
    height: 45,
    overflow: 'hidden',
    borderRadius: 25,
    elevation: 3,
    backgroundColor:'#FDFCFA',
},
inputContainer:{
    width: '85%',
    height: '100%',
},
input:{
    paddingVertical: 3,
    height:'100%',
    paddingHorizontal: 10,
    fontSize: 13,
},
iconContainer:{
    height: '100%',
    width:'15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
},
note:{
    marginVertical: 5,
    fontSize: 11,
    color: 'white'
},
greet:{
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 20,
    color: 'white'
}
})

export default Search