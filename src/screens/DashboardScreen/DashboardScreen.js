import React from 'react'
import style from './style';
import { StyleSheet, Text,SafeAreaView, View, Button, TouchableOpacity } from 'react-native'

export default function DashboardScreen({navigation}) {
    const onLogout = () => {
        navigation.navigate('Login')
    }
    return (
        <View style={style.container}>
            {/* Logo Img here
             <Image style={styles.image} source={require("./assets/logo.png")} />*/}
            <TouchableOpacity style={style.logoutBtn} onPress={onLogout}>
                <Text>LOGOUT</Text>
            </TouchableOpacity>      
        </View>
    )
}

