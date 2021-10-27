import React from 'react'
import style from './style';
import { StyleSheet, Text,SafeAreaView, View, Button, TouchableOpacity } from 'react-native'

export default function CreateUserScreen({navigation}) {
    const onLogout = () => {
        navigation.navigate('Registration')
    }
    return (
        <View style={style.container}>
            <Text>Create User Profile</Text> 
            <TouchableOpacity style={style.logoutBtn} onPress={onLogout}>
                <Text>BACK</Text>
            </TouchableOpacity>   
        </View>
        
    )
}
