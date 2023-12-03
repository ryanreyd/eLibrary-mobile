/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Providers from './src/navigation';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
       <Providers/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});

export default App;
