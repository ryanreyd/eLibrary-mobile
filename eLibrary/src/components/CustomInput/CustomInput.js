import { View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
// #react-hook-form is a library that provides form state management and validation
import { Controller } from 'react-hook-form'; 
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons' 
import * as Animatable from 'react-native-animatable';

// A dynamic text input component that tracks the Textinput value
// Also handles input validation, e.g "This field is required", 
// "Please enter your instituional email", checks password and etc.
const CustomInput = ({control, name, placeholder,secureTextEntry, rules, icon1, icon2= {}}) => {
  return (
      <Controller 
        control={control}
        name={name}
        rules={rules}
        render={({field: {value, onChange, onBLur}, fieldState:{error}})=>(
          <View style={styles.parent}>
            <Text style={styles.label}>{name[0].toUpperCase()+name.slice(1)}</Text>
            <View style={[
              styles.container
              ]} >
                <MaterialCommIcon
                    name={error? icon1 : icon2 }
                    size={24}
                    style={[styles.icon,{color: error? '#6C6C6C' : '#00DE95'}]}
                  />
              <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBLur}
                  placeholder={placeholder}
                  style={styles.input}
                  secureTextEntry={secureTextEntry}
              />
            </View>
               {error && (
                <Animatable.View animation={"shake"} duration={900} style={styles.errMsgContainer}>
                  <MaterialCommIcon
                    name="alert-circle"
                    size={13}
                    color="red"
                    style={styles.errIcon}
                  />
                <Text style={styles.errMsg}>{error.message || "This field is required"}</Text>
              </Animatable.View>
            )}
          </View>
        )}
      />
  );
};

const styles = StyleSheet.create({
    container:{
      display: 'flex', 
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '100%',
      maxWidth: '100%',
      paddingHorizontal: 10,
      borderRadius: 5,    
      overflow: 'hidden',
    },
    input:{
      fontSize: 14,
      fontWeight: 'bold',
      width: '100%',
      color: "#484848",
    },
    label:{
      position: 'absolute',
      top: 0,
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
    error:{

    },
    errMsg:{
      color: 'red',
      fontSize: 12,
      marginLeft: 3,
    },
    errMsgContainer:{
      display: 'flex',
      alignSelf: 'stretch',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    icon:{
      marginRight: 2,
    },
    parent:{
      shadowColor:"black",
      elevation: 2,
      borderColor: 'black',
      marginVertical: 10,
      borderRadius: 5,
      paddingBottom: 3,
      backgroundColor: 'white',
      paddingVertical: 10,
    }
});
export default CustomInput;