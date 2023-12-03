import React, {useContext, useState} from 'react';
import { 
    View, 
    ScrollView,
    StyleSheet,
    ToastAndroid,
    Text} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../navigation/AuthProvider';
import auth, { firebase } from '@react-native-firebase/auth';
import '@react-native-firebase/database';
import Warnigs from '../../components/Warnings/Warnigs';
import Verify from '../../components/Verify/Verify';

// step 2 of account register
// implement form validation
const SignUpPage2 = ({route, navigation}) => {
    const studentData = {
        firstname,
        middlename,
        lastname,
        college, 
        course,
        created,
    } = route.params.userData; //receive all this data from previous screen

    const [showErrMsg, setShowErrMsg] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const {register,logout,user, showModal, setShowModal, messageToNewUser, setUserEmail} = useContext(AuthContext);
    const {control, handleSubmit, watch}= useForm();
    let watchPassword = watch('password');
    let watchEmail = watch('email');
    //a regex to only a student in buksu that has institustional email can create an account
    // other email format is not accepted
    //const EMAIL_REGEX = /[0-9]+@student.buksu.edu.ph$/gmi; 

    const db = firebase.database(); // define database
    const studentRef = db.ref('students'); // define reference

    studentRef.on('value', (snapshot) => { // for debug only
        const data = snapshot.val();
      //  console.log(data);  check if student data is uploaded  successfully
      // without opening firebase on web browser
    });
    const onNextPressed=async() =>{
        try {
           // register (watchEmail, watchPassword); //create email, assword, and user details to database
            const result  = await register(watchEmail, watchPassword);
            const userCreate = auth().currentUser;
            if(result instanceof Error){
                setErrMsg(result.code.charAt(0).toUpperCase()+result.code.slice(1)); //capital first letter
                setShowErrMsg(true)
            }else if(!userCreate.emailVerified) { // if user email not verified
                 // send email verifcation
                setUserEmail(watchEmail)
                setShowModal(true)
                setShowErrMsg(false)    
            //    navigation.navigate('SignUpPage3', {messageToUser}) //pass message to next page
                studentRef.child(userCreate.uid).set(studentData) //upload student data to firebase
                await userCreate.sendEmailVerification()
                await logout();
                alert('Please verfiy your email address first. Email verfication link is sent to '+watchEmail);
            }
        } catch (error) {
            console.log(error)
        }
    }; 

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Verify showModal={showModal} message={messageToNewUser} />
                <Warnigs showError={showErrMsg} errorMessage={errMsg}/>
                <View style={styles.formNameCont}>
                     <Text style={styles.formName}>Create an account 2 of 2</Text>
                </View>
                <CustomInput
                    name="email"
                    control={control}
                    placeholder="Enter your email"
                    icon1="email-remove"
                    icon2="email-check"
                    rules={{
                        required:'This field is required',
                        pattern:{
                           // value: EMAIL_REGEX, // use regular expression
                            message: "Please enter your instituional email" /* error message if email is invalid */
                        }
                    }}
                />
                <CustomInput
                    name="password"
                    control={control}
                    placeholder="Enter password"
                    icon1="lock-remove"
                    icon2="lock-check"
                    secureTextEntry={true}
                    rules={{
                        required:'This field is required',
                        minLength:{
                            value: 6,  /* rule for password should >= 6 character */
                            message: 'Password should be atleast 6 characters long'
                        },
                    }}
                />
                <CustomInput
                   name="Confirm"
                   control={control}
                   placeholder="Re-type your password"
                   icon1="lock-remove"
                   icon2="lock-check"
                   secureTextEntry={true}
                   rules={{
                      required:'This field is required', /* error message if password did not match */
                      validate: value => value === watchPassword || 'Password do not match'
                    }}
                />
                <View style={styles.buttons}>
                    <View style={styles.next}>
                        <CustomButton
                            text="Next"
                            onPress={handleSubmit(onNextPressed)} // trigger Validation
                            type='UNIQUE'
                            contParent_type='end'
                        />
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
        marginTop: 50,
        marginBottom: 20,
    },
    formName:{
        color:'#0CC978',
        fontSize: 25,
    },
    buttons:{
        width: '100%',
        paddingBottom: 30,
    },
    next:{
        maxHeight: 45,
    },
});

export default SignUpPage2;