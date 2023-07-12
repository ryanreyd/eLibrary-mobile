import { View, Text, Image, StyleSheet, Dimensions} from 'react-native'
import React from 'react'
import EmptyState from '../../../assets/images/EmptyDownloadList.jpg'

const { height, width } = Dimensions.get('window');

const ListEmpty = () => {
  return(
    <View style={styles.emptyStateCont}>
      <Image source={EmptyState} style={[styles.emptyState,{height: height * 0.35}]} resizeMode="contain" /> 
      <View style={styles.textCont}>
        <Text style={styles.emptyState_TEXT}>
          You have not downloaded books yet.
        </Text>
        <Text style={[styles.emptyState_TEXT,{fontSize: 12, fontWeight: 400, marginTop: 5,}]}>
          Start downloading books to see it here.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyState_TEXT:{
    fontSize: 15,
    fontWeight: 600,
    textAlign: 'center',
    color: '#747474'
  },
  emptyStateCont:{
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: .7
  },
  textCont:{
    width: width * 0.8,
  },
})

export default ListEmpty