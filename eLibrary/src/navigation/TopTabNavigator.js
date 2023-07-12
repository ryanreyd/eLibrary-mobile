import { View, Text, StyleSheet, StatusBar} from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import LocationScreen from '../screens/LocationScreen/LocationScreen'
import SectionScreen from '../screens/SectionScreen/SectionScreen'
import SubjectScreen from '../screens/SubjectScreen/SubjectScreen'

// A top Top tab Navigator
const TopTabNavigator = () => {
  const TopTab = createMaterialTopTabNavigator();
  return (
        <TopTab.Navigator
          screenOptions={{
            tabBarStyle : {...styles.tab},
            tabBarIndicatorStyle: { backgroundColor: 'white' },
            tabBarLabelStyle:{fontSize: 10, color: 'white'}
          }}

        >   
            <TopTab.Screen name='Location' component={LocationScreen}/>
            <TopTab.Screen name='Section' component={SectionScreen}/>
            <TopTab.Screen name='Subject' component={SubjectScreen}/>
        </TopTab.Navigator>
  )
}

const styles = StyleSheet.create({
    tab:{
      padding: 5,
      borderBottomEndRadius: 0,
      borderBottomStartRadius: 0,
      marginBottom: 0,
      display: 'flex',
      backgroundColor: '#14C38E'
    }
})
export default TopTabNavigator