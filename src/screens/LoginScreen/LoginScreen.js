import React from 'react'
import { StyleSheet, Text, TextInput, SafeAreaView, View, Button } from 'react-native'

export default function LoginScreen({navigation}) {
    const onRegistration = () => {
        navigation.navigate('Registration')
    }

    const onLogin = () => {
        navigation.navigate('Dashboard')
    }

    return (
        <SafeAreaView>
            <TextInput placeholder="Email"/>
            <TextInput placeholder="Password" secureTextEntry/>
            <Button title="Login" onPress={onLogin}/>
            <Button title="Registration" onPress={onRegistration}/>
        </SafeAreaView>
    )
}
