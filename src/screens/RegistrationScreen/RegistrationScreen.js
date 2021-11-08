import React, {useState} from 'react'
import style from './style';
import { StyleSheet, Text, TextInput, SafeAreaView, View, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import {auth, firestore} from '../../firebase/config'

export default function RegistrationScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword12] = useState('')

    const onSignUp = () => {
        if(password1 == password2) {
            auth
            .createUserWithEmailAndPassword(email, password1)
            .then(userCredentials => {
                const user = userCredentials.user 
                const data = {
                    id: user.uid,
                    email: user.email
                }
                // Get users collection from firestore
                const usersRef = firestore.collection('users')
                usersRef
                .doc(user.uid)
                .set(data)
                .then(() => {
                    navigation.navigate('Create User')
                })
                .catch(error => {
                    alert(error)
                })
            })
            .catch(error => alert(error.message))
        }
        else {
            alert("Passwords don't match")
        }
    }

    const onLogin = () => {
        navigation.navigate('Login')
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
                    onChangeText = {text => setEmail(text)}
                />
            </View>
            <View style={style.inputView}>
                <TextInput
                    style={style.TextInput}
                    placeholder="Password" secureTextEntry
                    placeholderTextColor="#003f5c"
                    onChangeText = {text => setPassword1(text)}
                />
            </View>
            <View style={style.inputView}>
                <TextInput
                    style={style.TextInput}
                    placeholder="Re-enter Password" secureTextEntry
                    placeholderTextColor="#003f5c"
                    onChangeText = {text => setPassword12(text)}
                />
            </View>
            <TouchableOpacity style={style.loginBtn} onPress={onSignUp}>
                <Text>SIGNUP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.loginBtn} onPress={onLogin}>
                <Text>LOGIN</Text>
            </TouchableOpacity>
        </View>
    )
}