import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PDFReader from '../screens/PDFReader/PDFReader';
import { BookProvider } from './BooksProvider'
import DownloadScreen from '../screens/DownloadScreen/DownloadScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import UpdateProfile from '../screens/UpdateProfile/UpdateProfile';
import TabNavigation from './TabNavigation';
import SignUpPage3 from '../screens/SignUpPage3/SignUpPage3';
import SignInScreen from '../screens/SignInScreen/SignInScreen';

// if the user succesfully login, they can navigate these screens
const AppNavigation = () => {
    const Stack = createNativeStackNavigator()  
    return (
        // This <BookProvider> is a a global state management system.
        // Which all those screens wrap inside can access the data 
        // from <BookProvider>, which is also modified from <BookProvider>
        // {children} component
        <BookProvider>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='home' component={TabNavigation}/>
                <Stack.Screen name='PDFReader' component={PDFReader}/>
                <Stack.Screen name='Downloads' component={DownloadScreen}/>
                <Stack.Screen name='UpdateProfile' component={UpdateProfile}/>
                <Stack.Screen name='SignInScreen' component={SignInScreen}/>
            </Stack.Navigator>
        </BookProvider>
    )
}

export default AppNavigation;