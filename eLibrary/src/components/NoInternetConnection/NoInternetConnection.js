import React, {useState, useEffect} from 'react';
import { 
    View, 
    Image,
    StyleSheet,
    Text,
    Modal,
    TouchableOpacity,
    Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import NoSignal from '../../../assets/images/radio.gif'
const { height, width } = Dimensions.get('window');

const NoInternetConnection = ({showModal}) => {

    //const message = {msg, email, verified} = route.params.messageToUser;
    const [modalVisible, setModalVisible] = useState(false);
   
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
                color='#B1C2CF'
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
                        <Image source={NoSignal} style={{height: 150, width: 150}} resizeMode="contain" />     
                        <Text style={styles.centerTextBig}>No Internet</Text>
                        <Text style={styles.centerTextSmall}>Internet is required for best experience</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
} 

const styles = StyleSheet.create({
     root:{
        height: height * 0.4,
        width: width * 0.9,
        elevation: 20,
        shadowColor: 'gray',
        backgroundColor: 'white',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        top: height*0.3,
        borderRadius: 20,
        overflow:'hidden'
    },
    centerTextBig:{
        marginTop: 5,
        fontSize: 16,
        fontWeight: '900',
        color: '#7F9E9A',
        textAlign: 'center',
    }, 
    centerTextSmall:{
        marginTop: 15,
        fontSize: 13,
        color: '#7F9E9A',
        textAlign: 'center',
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
      modalContent: {
        alignItems: 'center',
        flex: 6,
        width: '100%',
      },
});

export default NoInternetConnection