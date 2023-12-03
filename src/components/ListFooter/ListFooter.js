import { View, Text, Image, StyleSheet, Dimensions} from 'react-native'
import React from 'react'
import footerImage from '../../../assets/images/foot.jpg'

const { height, width } = Dimensions.get('window');

const ListFooter = () => {
    return(
      <View style={styles.footer}>
        <Text>
          Opps you've reach the bottom of the list!
        </Text>
        <Image source={footerImage} style={[{height: height * 0.36}]} resizeMode="contain" /> 
      </View>
    )
}

const styles = StyleSheet.create({
    footer:{
        marginTop: 20,
        marginBottom: 200,
        alignItems: 'center',
    },
})

export default ListFooter