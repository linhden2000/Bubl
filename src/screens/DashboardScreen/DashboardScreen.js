import React from 'react'
import style from './style';
import { StyleSheet, Text,SafeAreaView, View, Button, TouchableOpacity } from 'react-native';
import {auth} from '../../firebase/config';

export default function DashboardScreen({navigation}) {
    const onLogout = () => {
      auth
      .signOut()
      .then(() => {
        navigation.replace('Login')
      })
      .catch(error => {
        alert(error.message)
      })
        
    }

    return (
      <View>
        <Text>Dashboard</Text>
        <TouchableOpacity style={style.logoutBtn} onPress={onLogout}>
          <Text>LOGOUT</Text>
         </TouchableOpacity>
         <Text>Hello {auth?.currentUser.email}</Text> 
      </View>
    )
}


