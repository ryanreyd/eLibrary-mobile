import React, {useState, useContext} from 'react';
import { 
    View, 
    ScrollView,
    StyleSheet,
    ToastAndroid,
    Text} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { set, useForm } from 'react-hook-form';
import { AuthContext } from '../../navigation/AuthProvider';
import Verify from '../../components/Verify/Verify';

// a screen to reset user password
const ForgotPasswordScreen = ({navigation}) => {
    const {control, handleSubmit, watch} = useForm('');  
    const {reset, messageToUserResetPassword,  setShowModal, showModal, setUserEmail}= useContext(AuthContext); // access reset password method from auth context
    const email = watch('email');

    const onSendCodePressed =() =>{
        reset(email) // get email and send password reset link
        setUserEmail(email)
        setShowModal(true)
      //  alert('Please Check your email address. Reset Password link is sent to '+email);
        //navigation.navigate('SignUpPage3',{messageToUser}); // navigate to verifying screen and pass a message
    };
    const onBackToSignInPressed =() =>{
        setShowModal(false)
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Verify showModal={showModal} message={messageToUserResetPassword} />
                <View style={styles.formNameCont}>
                     <Text style={styles.formName}>Reset your password</Text>
                </View>
                <CustomInput
                    name='email'
                    control={control}
                    placeholder="Enter your Institutional email"
                    icon1="email-remove"
                    icon2="email-check"
                    rules={{required:'This field is required'}} //email must not be empty
                />
                <View style={styles.buttonWrapper}>
                    <View style={styles.button}>
                        <CustomButton text="Reset Password" onPress={handleSubmit(onSendCodePressed)} type='PRIMARY'/>
                    </View>
                    <View style={styles.button}>
                        <CustomButton text="Back to login" onPress={onBackToSignInPressed} type='TERTIARY'/>
                    </View>
                </View>
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
    },
    button:{
        maxHeight: 45,
        marginBottom: 5,
    },
    buttonWrapper:{
        width: '100%'
    }
});

export default ForgotPasswordScreen;