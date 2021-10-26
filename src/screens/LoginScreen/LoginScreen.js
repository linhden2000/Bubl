import React from 'react'
import style from './style';
import { StyleSheet, Text, TextInput, SafeAreaView, View, Button, TouchableOpacity } from 'react-native'

export default function LoginScreen({navigation}) {
    const onRegistration = () => {
        navigation.navigate('Registration')
    }

    const onLogin = () => {
        navigation.navigate('Dashboard')
    }

    return (
        <View style={style.container}>
            {/* Logo Img here
             <Image style={styles.image} source={require("./assets/logo.png")} />*/}
            <View style={style.inputView}>
                <TextInput
                    style={style.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c" 
                />
            </View>
            <View style={style.inputView}>
                <TextInput
                    style={style.TextInput}
                    placeholder="Password" secureTextEntry
                    placeholderTextColor="#003f5c"
                />
            </View>

            <TouchableOpacity>
                <Text style={style.forgot_button} onPress={onLogin}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.loginBtn} onPress={onLogin}>
                <Text style={style.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={style.forgot_button} onPress={onRegistration}>Don't have account? Sign up</Text>
            </TouchableOpacity>

            
        </View>
        
    )
}
