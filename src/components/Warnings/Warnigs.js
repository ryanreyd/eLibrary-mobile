import { View, Text, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//renders custom error message
const Warnigs = ({errorMessage, showError}) => {
    if(showError){
        return(
            <Animatable.View animation={'shake'} style={[styles.card,]}>
                <View style={styles.icon}>
                    <Icon
                        name='alert'
                        size={16}
                        color='#C92B2B'
                    />
                </View>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </Animatable.View>
        )
    }else{
        return null;
    }
}

const styles = StyleSheet.create({
    card:{
        width: 250,
        height: 40,
        backgroundColor: '#FDE9E9',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#C92B2B',
        paddingHorizontal: 10,
    },
    icon:{
        flex: 1,
        alignItems: 'flex-end',
    },
    errorMessage:{
        textAlign: 'left',
        letterSpacing: 0.8,
        flex: 4,
        fontWeight: 600,
        fontSize: 11,
        paddingLeft: 10,
    }
})

export default Warnigs