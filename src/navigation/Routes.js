import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import auth from '@react-native-firebase/auth' // import firbase auth method
import { AuthContext } from './AuthProvider';
import AuthNavigation from './AuthNavigition';// contains authetication screens e.g. login, create
import AppNavigation from './AppNavigation';

const Routes = () => {

  const {user, setUser}= useContext(AuthContext); // access context from auth context, user state
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => { //listen user state, loged out or loged in                           
    setUser(user);
    if(initializing) setInitializing(false); //set false if app done initializing
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged); //update when user log out or in
    return subscriber; // unsubscribe on unmount
  }, []);

  if(initializing) return null; // if loading
  
  return (
      //if user is authenticate, login or register it navigate inside the app.
      // and user log in
      // else if user is null or logout() method is called it navigate outside the app and user logout
      <NavigationContainer>
        {user? <AppNavigation/> : <AuthNavigation/>}
      </NavigationContainer>
  );
};
export default Routes;