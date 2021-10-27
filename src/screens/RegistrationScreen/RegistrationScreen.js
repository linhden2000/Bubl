import React from 'react'
import style from './style';
import { StyleSheet, Text, TextInput, SafeAreaView, View, Button, TouchableOpacity } from 'react-native'

export default function RegistrationScreen({navigation}) {
    const onSignUp = () => {
        navigation.navigate('CreateUser')
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

            <View style={style.inputView}>
                <TextInput
                    style={style.TextInput}
                    placeholder="Re-enter Password" secureTextEntry
                    placeholderTextColor="#003f5c"
                />
            </View>

            <TouchableOpacity style={style.loginBtn} onPress={onSignUp}>
                <Text>SIGNUP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.loginBtn} onPress={onLogin}>
                <Text>LOGIN</Text>
            </TouchableOpacity>

            
        </View>
        // <SafeAreaView>
        //     <TextInput placeholder="Email"/>
        //     <TextInput placeholder="Password" secureTextEntry/>
        //     <TextInput placeholder="Re-enter password" secureTextEntry/>
        //     <Button title="Sign Up" onPress={onSignUp}/>
        //     <Button title="Login" onPress={onLogin}/>
        // </SafeAreaView>
    )
}
