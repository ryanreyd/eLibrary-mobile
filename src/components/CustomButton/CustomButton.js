import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

// a component for dynamic button style
// accepts type, "PRIMARY" is the default, if no type is pass.
const CustomButton = ({onPress, text, type = "PRIMARY", contParent_type}) => { 
  return (
    <View style={[styles.contParent, styles[`contParent_${contParent_type}`]]}>
        <Pressable 
            onPress={onPress} 
            style={[styles.container, styles[`container_${type}`]]}
            android_ripple={{ color: '#C5E4D6',radius: 80, borderless: false, foreground: false }}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    text:{
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    container_PRIMARY:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00DE95',
        elevation: 10,
        shadowColor: '#00DE95',
        shadowOffset: 2, 
        shadowRadius: 12,
    },
    container_SECONDARY:{
        display: 'flex',
        height: '100%',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#227C70'
    },
    text_SECONDARY:{
        color: 'white',
        fontSize: 13,
    },
    container_TERTIARY:{},
    
    text_TERTIARY:{
        color: 'grey',
    },
    container_UNIQUE:{
        backgroundColor: '#00DE95',
        width: '40%',
        elevation: 10,
        shadowColor: '#00DE95',
        shadowOffset: 0, 
        shadowRadius: 12,
    },
    contParent_end:{
        alignItems: 'flex-end',
    },
    contParent:{
        width: '100%',
        alignItems: 'center'   
    },
});

export default CustomButton;