import React from 'react'
import style from './style';
import { StyleSheet, Text,SafeAreaView, View, Button, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faComment, faUser} from '@fortawesome/free-solid-svg-icons'
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
    
    const onMessage = () => {
        navigation.navigate('Message')
    }

    const onProfile = () => {
        navigation.navigate('Profile')
    }

    const onDashBoard = () => {
        navigation.navigate('Dashboard')
    }

    return (
        <View style={style.container}>
            {/* Logo Img here
             <Image style={styles.image} source={require("./assets/logo.png")} />*/}
            <TouchableOpacity style={style.logoutBtn} onPress={onLogout}>
              <Text>LOGOUT</Text>
            </TouchableOpacity> 
            <Text>Hello {auth?.currentUser.email}</Text>
            <View style={style.navbar}>
              <TouchableOpacity style={style.messageBtn} onPress={onMessage}>
                <FontAwesomeIcon icon={faComment} />
              </TouchableOpacity> 
              <TouchableOpacity style={style.homeBtn} onPress={onDashBoard}>
                <FontAwesomeIcon icon={faHome} />
              </TouchableOpacity> 
              <TouchableOpacity style={style.profileBtn} onPress={onProfile}>
                <FontAwesomeIcon icon={faUser} />
              </TouchableOpacity> 
            </View>      
        </View>
    )
}


