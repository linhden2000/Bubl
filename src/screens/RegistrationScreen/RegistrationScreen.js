import React from 'react'
import { StyleSheet, Text, TextInput, SafeAreaView, View, Button } from 'react-native'

export default function RegistrationScreen({navigation}) {
    const onSignUp = () => {
        navigation.navigate('Login')
    }
    const onLogin = () => {
        navigation.navigate('Dashboard')
    }
    return (
        <SafeAreaView>
            <TextInput placeholder="Email"/>
            <TextInput placeholder="Password" secureTextEntry/>
            <TextInput placeholder="Re-enter password" secureTextEntry/>
            <Button title="Sign Up" onPress={onSignUp}/>
            <Button title="Login" onPress={onLogin}/>
        </SafeAreaView>
    )
}
