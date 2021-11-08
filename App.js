import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegistrationScreen, DashboardScreen, MessageScreen, ProfileScreen, MyProfileScreen, PreferenceScreen, AccountSettingsScreen, CreateUserScreen} from "./src/screens";
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <IconRegistry icons={EvaIconsPack} />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Registration" component={RegistrationScreen}/>
        <Stack.Screen name="Dashboard" component={DashboardScreen}/>
        <Stack.Screen name="Message" component={MessageScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="MyProfile" component={MyProfileScreen}/>
        <Stack.Screen name="Preference" component={PreferenceScreen}/>
        <Stack.Screen name="AccountSettings" component={AccountSettingsScreen}/>
        <Stack.Screen name="Create User" component={CreateUserScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ApplicationProvider>
    
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
