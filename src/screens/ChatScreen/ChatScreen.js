import React from 'react'
import style from './style';
import { StyleSheet, Text,SafeAreaView, View, TouchableOpacity } from 'react-native'

export default function ChatScreen({navigation}) {
    const onLogout = () => {
        navigation.navigate('Login')
    }
    const onMessage = () => {
        navigation.navigate('Message')
    }

    return (
        <View style={style.container}>
            {/* Logo Img here
             <Image style={styles.image} source={require("./assets/logo.png")} />*/}
            <TouchableOpacity style={style.logoutBtn} onPress={onLogout}>
              <Text>LOGOUT</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={style.logoutBtn} onPress={onMessage}>
              <Text>Message</Text>
            </TouchableOpacity> 
                   
        </View>
    )
}