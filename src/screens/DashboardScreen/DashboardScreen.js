import React from 'react'
import { StyleSheet, Text,SafeAreaView, View, Button } from 'react-native'

export default function DashboardScreen({navigation}) {
    const onLogout = () => {
        navigation.navigate('Login')
    }
    return (
        <SafeAreaView>
            <Button title="Logout" onPress={onLogout}/>
        </SafeAreaView>
    )
}

