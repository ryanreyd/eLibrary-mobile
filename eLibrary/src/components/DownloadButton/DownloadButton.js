import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// accepts onPress event for download
// also accepts button state like button is disabled if
// books are not availabe for download
const DownloadButton = ({onPress, disabled}) => {
  return (
    <Pressable
     onPress={onPress} 
     style={[styles.container,{ backgroundColor: disabled ? '#C2D1CF' : '#00DE95'}]}
     disabled={disabled}
     android_ripple={{ color: '#E3FCBF',radius: 30, borderless: false, foreground: false }}
     >
        <Icon
            name="download"
            size={17}
            color="white"
        />
    </Pressable>
  );
};
const styles = StyleSheet.create({
    container:{
        borderRadius: 4,
        height: '100%',
       // paddingVertical: 11.5,
        alignItems: 'center',
        shadowOffset: 2, 
        shadowRadius: 12,
        display: 'flex',
        elevation: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
});

export default DownloadButton;