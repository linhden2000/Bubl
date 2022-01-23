import React from 'react'
import style from './style';
import { StyleSheet,SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
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

    const createQuestion = () => {
      console.log("question button pushed")
      navigation.navigate('CreateQuestions');
    }
  
    return (
      <View>
        <Text>Dashboard</Text>
        <Button style={style.submitBtn} onPress={createQuestion}>
          <Text>Post a Question</Text>
        </Button>
        <TouchableOpacity style={style.logoutBtn} onPress={onLogout}>
          <Text>LOGOUT</Text>
         </TouchableOpacity>
         {/* <Text>Hello {auth?.currentUser.email}</Text>  */}
      </View>
    )
}


