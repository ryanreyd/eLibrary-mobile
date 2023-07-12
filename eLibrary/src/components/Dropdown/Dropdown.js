import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list'; //library for dropdown component

// A dropdown component responsible for chossing college and course
// when creating an account
const Dropdown = ({data, placeholder, searchPlaceholder, name,setSelected, onSelect, defaultOption,save}) => {
    return(
        <View style={styles.ddContainner}>
        <Text style={styles.label}>{name[0].toUpperCase()+name.slice(1)}</Text>
        <SelectList 
            data={data} 
            maxHeight={150}
            setSelected={setSelected}
            save={save}
            placeholder={placeholder}
            onSelect={onSelect}
            searchPlaceholder={searchPlaceholder}
            dropdownTextStyles={[styles.ddText,{height: 'auto'}]}
            boxStyles={styles.box}
            dropdownStyles={styles.listDropDown}
            inputStyles={styles.inputStyles}
            defaultOption={defaultOption}
            search={false}
            />
        </View> 
    )
};

const styles = StyleSheet.create({
    ddContainner:{
        marginTop: 9,
        paddingBottom: 4,
    },
    box:{
        width: '100%',
        maxWidth: '100%',
        minWidth: '100%',
        borderColor: '#0CC978',
        borderWidth: 0,
        backgroundColor: 'white',
        marginVertical: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        borderRadius: 5,
        elevation: 10,
        shadowColor: 'grey',
    },

    listDropDown:{
        marginTop: 0,
        backgroundColor: 'white',
        borderColor: '#0CC978',
        elevation: 10,
        borderRadius: 0,
        shadowColor: 'grey',
        borderWidth :0,
        borderRadius: 5,
        marginBottom: 0,
        height: 150,
    },
    label:{
        position: 'absolute',
        top: -5,
        backgroundColor: 'white',
        display: 'flex',
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'row',
        fontSize: 10,
        fontWeight: 'bold',
        color: "#8E8E8E",
        zIndex: 121,
        width:'100%',
        paddingHorizontal: 41,
        paddingVertical: 2,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
      },
    ddText:{
        fontSize: 13,
        color: '#484848',
        fontWeight: 'bold'
    },
    inputStyles:{
        color: '#484848',
        fontSize: 14,
        paddingLeft: 30,
        fontWeight: 'bold'
        
    },

    errMsgContainer:{
        display: 'flex',
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    errMsg:{
        color: 'red',
        fontSize: 12,
        marginLeft: 3,
    },
});

export default Dropdown;