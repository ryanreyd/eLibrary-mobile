import React, {useState, useContext, useEffect} from 'react';
import { 
    View, 
    Image,
    StyleSheet,
    ToastAndroid,
    Text,
    Modal,
    TouchableOpacity,
    Dimensions,
    StatusBar} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { openInbox } from "react-native-email-link";
import gmailIcon from '../../../assets/images/gmail.png'
import Check from '../../../assets/images/check-mark.png'
import sent from '../../../assets/images/email_sent.jpg'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const { height, width } = Dimensions.get('window');

const Verify = ({showModal, message}) => {


    /*     const EmailVerified = () =>{
        return(
        <View  style={{flex:1, alignItems: 'center', width : '100%'}}>
          <StatusBar backgroundColor='white' barStyle={'dark-content'}/>
            <View style={styles.verifying}>
                <Image source={Check} style={{height: height *0.4}} resizeMode='contain' /> 
                <Text style={styles.centerText}>
                    Email Verified
                </Text>
                <Text style={styles.centerTextSmall}>
                    Your email address has been successfully verified.
                    You can Login now
                </Text>    
            </View>
            <View style={styles.buttonArea}>
                <View style={styles.buttonWrapper}>
                    <View style={styles.button}>
                        <CustomButton text="Back to login" onPress={onBackToSignInPressed} type='PRIMARY'/>
                    </View>
                </View>
            </View>
        </View>
        )
    } */

  /*   return (
        <View  style={styles.root}>
            <StatusBar backgroundColor='white' barStyle={'dark-content'}/>
                <EmailNotVerified/>
        </View>
    ); */

    const EmailNotVerified = () =>{
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.verifying}>
                    <Image source={sent} style={{height: height *0.37}} resizeMode='contain' /> 
                    <Text style={styles.centerText}>
                        Check your Email!
                    </Text>
                    <View>
                        <Text style={styles.centerTextSmall}>
                            {message.msg},{`\n`} 
                    
                            please click the link sent to {`\n`}
                            <Text style={{color:'#07C3A8', fontWeight: 'bold'}}> {message.email}.{`\n`}</Text>      
                        </Text>                                  
                    </View>
                    <View style={{paddingHorizontal: 40,}}>
                        <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>
                            NOTE: If the email doesn't appear in your inbox, please check your spam folder.
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonArea}>
                    <View style={styles.buttonWrapper}>
                        <View style={styles.openMail}>
                            <View styles={styles.Icon}>
                                <Image source={gmailIcon} style={[{height: 30, width: 30}]} resizeMode='contain' /> 
                            </View>
                            <View style={styles.mailButton}>
                                <CustomButton text="Open Gmail App" onPress={onConfirmPressed} type='SECONDARY'/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )           
    }

    //const message = {msg, email, verified} = route.params.messageToUser;
    const [modalVisible, setModalVisible] = useState(false);
   
    const onConfirmPressed =() =>{
        ToastAndroid.show('Opening Gmail', ToastAndroid.SHORT);
        openInbox()
    };
    

    useEffect(()=>{
        if(showModal){
            setModalVisible(true)
        }else{
            setModalVisible(false)
        }
    },[showModal])

    const modalClose = () =>{
        setModalVisible(false)
    } 

    const ModalCloseButton = ({onPress}) =>{
      return(
        <TouchableOpacity style={styles.closeButton} onPress={onPress}>
              <Icon
                name="close-circle"
                size={25}
                color='#235952'
              />
        </TouchableOpacity>
      )
    }

    return (
        <View>
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={modalClose}
                >
                <View style={styles.root}>
                    <View style={styles.modalHeader}>
                      <ModalCloseButton onPress={modalClose}/>
                    </View>
                    <View style={styles.modalContent}>       
                        <EmailNotVerified/>
                    </View>
                </View>
            </Modal>
        </View>
    );
} 

const styles = StyleSheet.create({
     root:{
        height: height * 0.75,
        width: width * 0.9,
        elevation: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        alignSelf: 'center',
        top: height*0.12,
        borderRadius: 20,
        overflow:'hidden'
    },
    buttonArea:{
        flex: 1,
        width: '100%',
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    verifying:{
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex:3,
        width: '100%',
    },
    centerText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    centerTextSmall:{
        marginTop: 5,
        paddingHorizontal: 40,
        fontWeight: 400,
        fontSize: 13,
        textAlign: 'center',
        color: 'black',
        fontWeight: '400'
    },
    button:{
        maxHeight: 40,
        marginBottom: 5,
        marginTop: 5,
    },
    buttonWrapper:{
        width: '70%'
    },
    openMail:{
        maxHeight: 45,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius : 6,
        paddingLeft : 10,
        width: '100%',
        alignItems: 'center',
        overflow: 'hidden',
        elevation : 15,
    },
    Icon:{
        flex: 1,
        backgroundColor: 'white',
    },
    mailButton:{
        flex: 1,
        marginLeft: 10,
    }, 
    openButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
      },
      openButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
      },
      modalHeader:{
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        padding:5,
      },
      closeButton: {
        borderRadius: 5,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
      closeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        flex: 12,
        marginTop: 10,
      },
      modalText: {
        fontSize: 18,
        marginBottom: 10,
      },
});

export default Verify