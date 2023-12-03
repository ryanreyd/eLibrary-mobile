import { View, Text, Image, StyleSheet} from 'react-native'
import React from 'react'
import RingLoader from '../../../assets/images/doubleRing.gif'

const Loader = ({message}) => {
  return (
    <View style={styles.root}>
        <View style={styles.container}>
            <Image source={RingLoader} style={{height: 200, width: 200}} resizeMode="contain" />     
            <View style={styles.text}>
                <Text style={{color: 'gray', fontSize: 12,}}>
                   {message}
                </Text>
            </View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    container:{
    },
    text:{
        position: 'absolute',
        alignSelf: 'center',
        height: '100%',
        justifyContent: 'center'
    }
})

export default Loader