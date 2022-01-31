import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import { Formik } from 'formik';


import Ionicons from 'react-native-vector-icons/Ionicons';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {LoginScreen, RegistrationScreen, DashboardScreen, MessageScreen, ProfileScreen, MyProfileScreen, CreateUserScreen,
        CreateQuestionsScreen} from "./src/screens";


/* Navigation Structure: 
    Login (AuthStack)
    Signup (AuthStack)
    Create new user (AuthStack)
    DashboardNavigation (AuthStack)
      - Dashboard (Tab)
        *Create Questions (Button)
      - Profile (Tab)
      - Message (Tab)
*/

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();
function DashboardNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={"Dashboard"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Dashboard") {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === "Message") {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';

          } else if (rn === "Profile") {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
          "tabBarActiveTintColor": "#ADD8E6",
          "tabBarInactiveTintColor": "grey",
          "tabBarLabelStyle": {
            "fontSize": 10
          },
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]
      })} >
      <Tab.Screen name="Message" component={MessageScreen}/>
      <Tab.Screen name="Dashboard" component={DashboardScreen}/>
      <Tab.Screen name="Profile" component={ProfileScreen}/>
    </Tab.Navigator>
  )
  
}
export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <IconRegistry icons={EvaIconsPack} />
    <NavigationContainer independent={true}>
      <AuthStack.Navigator screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="Login" component={LoginScreen}/>
        <AuthStack.Screen name="Registration" component={RegistrationScreen}/>
        <AuthStack.Screen name="DashboardNavigation" component={DashboardNavigation}/>
        <AuthStack.Screen name="Create User" component={CreateUserScreen}/>
        <AuthStack.Screen name="MyProfile" component={MyProfileScreen}/>
        <AuthStack.Screen name="CreateQuestions" component={CreateQuestionsScreen}/>
      </AuthStack.Navigator>
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
