import React, { useEffect, useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import DownloadScreen from '../screens/DownloadScreen/DownloadScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Pressable, Text, View, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import TopTabNavigator from './TopTabNavigator';
import { BookProvider } from './BooksProvider';
import Home from '../screens/Home/Home';
const Tab = createBottomTabNavigator();

//a Bottom tab navigator
const TabNavigation = () => {

  return (
    <BookProvider>
      <Tab.Navigator  
        style={styles.tabNav}      
        screenOptions={ ({route}) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle : {...styles.tabNav},
          tabBarLabel: ({ focused }) => {
            let label;
            return label = focused ? 
              <Animatable.Text  animation={"bounceIn"} duration={900}
                style={{
                  position:'absolute',
                  fontSize: 10,
                  color: "white",
                  paddingBottom: 5,
                  paddingHorizontal : 12,
                  paddingVertical: 3,
                  borderRadius: 10,
                  backgroundColor: '#14C38E',
                  bottom: 5,
                  elevation: 3,
                  shadowColor:'#14C38E'
                }}>
                {route.name}
              </Animatable.Text>
              : <Text
                  style= {{
                    position:'absolute',
                    fontSize: 10,
                    color: "#333",
                    paddingBottom: 5,
                    bottom: 5,
                  }}
                >{route.name}</Text>
          },

          tabBarButton: props => 
            <Pressable
              {...props}
              android_ripple={{ color: '#537A71',radius: 50, borderless: true, foreground: false }}
            />, 
    
          tabBarIcon: ({focused}) => {
            const iconRef = useRef(null)
            let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home'  : 'home';
              } else if (route.name === 'Books') {
                iconName = focused ? 'bookshelf' : 'bookshelf';
              }else if(route.name === 'Downloads'){
                iconName = focused ? 'download' : 'download';
              }else if(route.name === 'Profile'){
                iconName = focused ? 'account' : 'account';
              }

            return(
            <Animatable.View animation={focused ? "rubberBand" : null} duration={900} style = {styles.iconContainer}> 
              <Icon  style = {styles.icon} 
                  name={iconName}
                  size ={24}  
                  color= {focused ? "#14C38E" : "gray"}
                />  
              </Animatable.View>
            )
          },  
        })}
      > 
          <Tab.Screen name='Home' component={Home}/>
          <Tab.Screen name='Books' component={TopTabNavigator}/>
          <Tab.Screen name='Downloads' component={DownloadScreen}/>
          <Tab.Screen name='Profile' component={ProfileScreen}/>
      </Tab.Navigator>
    </BookProvider>
  )
}
const styles = StyleSheet.create({
  tabNav:{
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10, 
    borderRadius: 10,
    marginHorizontal: 15,
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 20,
  },
   iconContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
   },
   icon:{
    bottom: 10,
   },
   selectedlabel:{
    position: 'absolute',
    top: 21,
    fontSize: 10,
    color: "white",
    paddingHorizontal : 15,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: '#12935B',
    zIndex: 66,
   },
   selectedlabelCont:{
    position: 'absolute',
    top: 21,
    fontSize: 10,
    color: "white",
    paddingHorizontal : 15,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: '#12935B',
    zIndex:-1,
   },
    notSelectedlabel:{
      position: 'absolute',
      fontSize: 10,
      color: "#333",
      paddingBottom: 5,
      paddingVertical: 3,
      top: 21,
    }
});
export default TabNavigation