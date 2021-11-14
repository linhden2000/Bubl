import React, {useEffect, useState} from 'react'
import style from './style';
import { StyleSheet, Text, TextInput, SafeAreaView, View, Button, TouchableOpacity } from 'react-native'
import { auth } from '../../firebase/config';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // Navigate to Registration Screen
    const onRegistration = () => {
        navigation.navigate('Registration')
    }
    /*
        - Listeen to authentication event
        - if the event returns an user, navigate to 'DashboardNavigation'
    */
    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                navigation.replace('DashboardNavigation')
            }
        })
        return unsubscribe
    }, [])
    /*
        - Login User
        - If success, the useEffect function should navigate the app to 'DashboadNavigation'
        - Otherwise, throws an error
    */
    const onLogin = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user
        })
        .catch(error => {
            alert(error)
        })        
    }

    return (
        <View style={style.container}>
            <View style={style.inputView}>
                <TextInput
                    style={style.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c" 
                    onChangeText={text=>setEmail(text)}
                />
            </View>
            <View style={style.inputView}>
                <TextInput
                    style={style.TextInput}
                    placeholder="Password" secureTextEntry
                    placeholderTextColor="#003f5c"
                    onChangeText={text=>setPassword(text)}
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

