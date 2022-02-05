import React, {useState} from 'react'
import style from './style';
import { StyleSheet, Dimensions, Text, TextInput, SafeAreaView, View, Button, TouchableOpacity, KeyboardAvoidingView, Image, ImageBackground } from 'react-native'
import {auth, firestore} from '../../firebase/config'
import { FontAwesome } from '@expo/vector-icons';
// import logo from '../../../assets/bublLogo.png';
import {
    useFonts,
    OleoScript_400Regular,
    OleoScript_700Bold,
  } from '@expo-google-fonts/oleo-script';


export default function RegistrationScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword12] = useState('')
    /*
        - Create new user 
        - If success, Then create new user in authentication, store user's email in firestore, 
        and navigate to 'Create User'
        - Otherwise, Throw an error and create alert
    */
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
                // Get 'users' collection from firestore
                const usersRef = firestore.collection('users')
                usersRef
                // Get user document using user's uid
                .doc(user.uid)
                // Set user data in firestore
                .set(data)
                .then(() => {
                    navigation.replace('Create User')
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
    
    // Navigate to Login Screen
    const onLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={style.container}>
            {/* 1. The background gradient */}
            <ImageBackground style={style.imageBG} resizeMode="cover" source={require("../../../assets/gradientBackground.png")} />
            
            {/* 2. The white box around all registration options */}
            <View style={style.whiteBox}>

             {/* The logo box */}
             <View style={style.logo}>
                <Image style={style.imageLogo} source={require("../../../assets/bublLogo.png")} />
                <Text style={style.textLogo}>Bubl</Text>
                <Text style={style.textDescription}>Please enter a valid email and password</Text>
            </View>

            {/* Entry Boxes */}
            <View style={style.entryBoxes}>
                {/* 3. Email box */}
                <View style={style.inputView}>
                    <TextInput
                        style={style.TextInput}
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                        onChangeText = {text => setEmail(text)}
                    />
                </View>

                {/* 4. password box */}
                <View style={style.inputView}>
                    <TextInput
                        style={style.TextInput}
                        placeholder="Password" secureTextEntry
                        placeholderTextColor="#003f5c"
                        onChangeText = {text => setPassword1(text)}
                    />
                </View>

                {/* 5. re-enter password box */}
                <View style={style.inputView}>
                    <TextInput
                        style={style.TextInput}
                        placeholder="Re-enter Password" secureTextEntry
                        placeholderTextColor="#003f5c"
                        onChangeText = {text => setPassword12(text)}
                    />
                </View>
            </View>

            {/* Button Boxes */}
            <View style={style.buttonBoxes}>
                {/* 6. signup box - after finish entering email, password */}
                <TouchableOpacity style={style.signUpBtn} onPress={onSignUp}>
                    <Text>SIGNUP</Text>
                </TouchableOpacity>

                {/* 7. login box - go back to log in */}
                <TouchableOpacity style={style.loginBtn} onPress={onLogin}>
                    <Text>RETURN TO LOGIN</Text>
                </TouchableOpacity>
            </View>

        </View>    
    </View>
    )
}
