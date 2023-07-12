import React, {useState} from 'react';
import { 
    View, 
    ScrollView,
    StyleSheet,
    ToastAndroid,
    Text} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

const NewPasswordScreeen = () => {

    const {control, handleSubmit}= useForm('');  

    const navigation = useNavigation();

    const Submit =() =>{
         ToastAndroid.show('Pressed login', ToastAndroid.SHORT);
         navigation.navigate('SignInScreen')
    };
    const onBackToSignInPressed =() =>{
         ToastAndroid.show('Pressed login', ToastAndroid.SHORT);
         navigation.navigate('SignInScreen')
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <View style={styles.formNameCont}>
                     <Text style={styles.formName}>Reset your password</Text>
                </View>
                <CustomInput
                    name='code'
                    control={control}
                    placeholder="Enter your verification code"
                    icon1="shield-key-outline"
                    icon2="shield-key"
                    rules={{required:'This field is required'}}
                />
                <CustomInput
                    name='newPassword'
                    control={control}
                    placeholder="Enter new password"
                    icon1="lock-remove"
                    icon2="lock-check"
                    secureTextEntry={true}
                    rules={{
                        required:'This field is required',
                        minLength:{
                            value: 6,
                            message: 'Password should be atleast 6 characters long'
                        },
                    }}
                />
                <CustomButton text="Submit" onPress={handleSubmit(Submit)} type='PRIMARY'/>
                <CustomButton text="Back to Sign-in" onPress={onBackToSignInPressed} type='TERTIARY'/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        padding: 20,
    },
    formNameCont:{
        width: '100%',
        alignItems: "flex-start",
        marginTop: 20,
        marginBottom: 20,
    },
    formName:{
        color:'#0CC978',
        fontSize: 25,
    }
});

export default NewPasswordScreeen;