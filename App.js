import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegistrationScreen, DashboardScreen, CreateUserScreen} from "./src/screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Registration" component={RegistrationScreen}/>
        <Stack.Screen name="Dashboard" component={DashboardScreen}/>
        <Stack.Screen name="CreateUser" component={CreateUserScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
