import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpPage1 from '../screens/SignUpPage1/SignUpPage1';
import SignUpPage2 from '../screens/SignUpPage2/SignUpPage2';
import SignUpPage3 from '../screens/SignUpPage3/SignUpPage3';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import NewPasswordScreeen from '../screens/NewPasswordScreeen/NewPasswordScreeen';
import AppNavigation from './AppNavigation';

const Stack = createNativeStackNavigator()

// if the user is not login, these are the only screens they can navigate
// login page, register, forgot password
const AuthNavigation = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='SignIn' component={SignInScreen}/>
            <Stack.Screen name='SignUpPage1' component={SignUpPage1}/>
            <Stack.Screen name='SignUpPage2' component={SignUpPage2}/>
            <Stack.Screen name='SignUpPage3' component={SignUpPage3}/>
            <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen}/>
            <Stack.Screen name='NewPasswordScreeen' component={NewPasswordScreeen}/>
      </Stack.Navigator>
  );
};

export default AuthNavigation;