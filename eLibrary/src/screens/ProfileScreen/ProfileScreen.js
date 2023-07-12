import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Pressable, Image} from 'react-native'
import React, { useState , useEffect, useContext} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import auth, { firebase } from '@react-native-firebase/auth';
import '@react-native-firebase/database';
import { AuthContext } from '../../navigation/AuthProvider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { BookContext } from '../../navigation/BooksProvider';
import goal from '../../../assets/images/goal.png'
import pen from '../../../assets/images/pen.png'
import NoInternetConnection from '../../components/NoInternetConnection/NoInternetConnection';
import Loader from '../../components/Loader/Loader';

// a profile screen or page
const ProfileScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const {pdfFiles, isConnected} = useContext(BookContext);
  const [studentData,setStudentData]= useState(null);
  const db = firebase.database();
  const studentRef = db.ref('students/'+auth().currentUser.uid);

  useEffect(() => {
    // Fetch student data from Firebase to use display profile
    studentRef.on('value', (snapshot) => { 
      try {
        const data = snapshot.val();
        setStudentData(data);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  if (!studentData) { // loading screen
    return (
      <View style={{flex:1 , alignItems:'center', justifyContent: 'center'}}> 
        <Loader message={'Loading Profile'}/>
      </View>
    )
  }

  const LogoutButton = ({onPress}) =>{ // logout button component
    return(
      <TouchableOpacity 
        onPress={onPress}
        style={styles.LogoutButton}>
        <Text style={{fontWeight: '500', color: 'gray'}}>
          Log out
        </Text>
        <View style={{marginLeft: 5,}}>
          <MaterialIcons
            name='logout'
            size={15}
            color='gray'
          />
        </View>
      </TouchableOpacity>
    )
  }

  const onPressedlogout = () =>{
    logout();  // logout
  }   
  // edit profile is press
  const onPressedEdit = () =>{ //pass current user info to update profile screen
    const userData = {
      firstname: studentData.firstname,
      middlename: studentData.middlename,
      lastname: studentData.lastname,
      college: studentData.college,
      course: studentData.course
   };
    navigation.navigate('UpdateProfile',{userData}) // navigate to Update profile screen
  }   

  return (
      <View style={styles.root}>
        {isConnected ? <></> : <NoInternetConnection showModal={true}/>}
        <View style={styles.profileHeader}>
          <View style={styles.logout}>
            <LogoutButton onPress={onPressedlogout}/>
          </View>
          <View style={styles.Icon}>
            <View style={styles.nameIcon}>
              <View  style={styles.nameIconBg}>
              <Text style={{fontSize: 24, color: 'white'}}>
                {studentData.firstname[0].toUpperCase()}
                {studentData.lastname[0].toUpperCase()}
              </Text>
              </View>
            </View>
          </View>
          <View style = {styles.name}>
            <TouchableOpacity onPress={onPressedEdit} style={styles.editIcon}>
              <View style={{backgroundColor:'#E0E2DD', borderRadius: 50, padding: 3}}>
                <Icon
                  name="account-edit"
                  size={20}
                  color='black'
                />
              </View>
            </TouchableOpacity>
            <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
              {studentData.firstname}
              {' '+studentData.middlename[0].toUpperCase()+'.'}
              {' '+studentData.lastname}
            </Text>
          </View>
        </View>
        <View style={styles.school}>
          <View style={styles.studentInfo}>
            <View style={styles.schoolIcon}>
              <View style={styles.schoolIconInner}>
                <Image source={pen} style={{height: 25, width: 25}} resizeMode="contain" /> 
              </View> 
            </View>
            <Text style={styles.schoolText}> 
              {studentData.college}
            </Text>
          </View>
          <View style={styles.studentInfo}>
            <View style={styles.schoolIcon}>
              <View style={styles.schoolIconInner}>
                <Image source={goal} style={{height: 25, width: 25}} resizeMode="contain" /> 
              </View>
            </View>
            <Text style={styles.schoolText}>Course :  {studentData.course}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <TouchableOpacity 
            onPress={()=>navigation.navigate('Downloads')}
            style={styles.download}>
            <View style={styles.downloadIcon}>
              <View style={{backgroundColor:'#E0E2DD', borderRadius: 100, padding: 7,}}>
                <Icon
                  name="download"
                  size={20}
                  color='#49494A'
                />
              </View>
            </View>
            <Text 
              style={{fontSize: 11,
              color: '#49494A', 
              fontWeight: 400}} >{pdfFiles.length > 1 ? pdfFiles.length+'  DOWNLOADS' :pdfFiles.length+'  DOWNLOAD'} </Text>
          </TouchableOpacity>
          <View style={styles.more}>
            <Text style={{fontSize: 15, color: 'gray', fontWeight: 500}} >more coming soon...</Text>
          </View>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  root:{
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  profileHeader:{
    flex: 3,
    backgroundColor: "white",
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 3,
    borderRadius: 15,
    flexDirection: 'column',
  },
  logout:{
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  LogoutButton:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  Icon:{
    alignItems: 'center',
    width: '100%',
    flex:5,
    justifyContent: 'flex-end'
  },
  nameIconBg:{
    backgroundColor: 'teal',
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  nameIcon:{
    backgroundColor: 'white',
    elevation: 2,
    padding: 3,
    borderRadius: 100,
  },
  name:{
    alignItems: 'center',
    width: '100%',
    flex:2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  school:{
    flex: 2,
    marginBottom: 5,
  },
  schoolText:{
    fontSize: 12,
    fontWeight: 500,
    marginLeft: 15,
  },
  studentInfo:{
    flex :1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 6,
    marginTop: 5,
  },
  editIcon:{
    padding: 2,
    position: 'absolute',
    right: 4,
    bottom: 4,
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 3,
  },
  details:{
    flex: 4,
  },
  download:{
    flex: 1,
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: 'white',
    alignItems : 'center',
    justifyContent: 'flex-start',
    marginBottom: 5,
    paddingHorizontal: 65,
  },
  downloadIcon:{
    position: 'absolute',
    left: 10,
    backgroundColor:'white',
    borderRadius: 50, 
    padding: 2,
    elevation: 10,
    zIndex: 999,
  },
  schoolIcon:{
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 50, 
    elevation: 10,
  },
  schoolIconInner:{
    padding: 5,
    borderRadius: 50, 
    backgroundColor: '#E0E2DD'
  },
  more:{
    flex: 3,
    alignItems : 'center',
    justifyContent: 'center',
  },
})

export default ProfileScreen