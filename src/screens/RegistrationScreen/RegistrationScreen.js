import React, {useState} from 'react'
import style from './style';
import { StyleSheet, Dimensions, Text, TextInput, SafeAreaView, View, Button, TouchableOpacity, KeyboardAvoidingView, Image, ImageBackground } from 'react-native'
import {auth, firestore} from '../../firebase/config'
import { FontAwesome } from '@expo/vector-icons';
import logo from '../../../assets/bublLogo.png';

import AppLoading from 'expo-app-loading';

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

    const { width, height } = Dimensions.get("screen");

    let [fontsLoaded] = useFonts({
        OleoScript_400Regular,
        OleoScript_700Bold,
    });

    if(!fontsLoaded) {
        return <AppLoading />;
    }
    else {

        return (
            <View style={style.container}>
                {/* 1. The background gradient */}
                <ImageBackground style={style.imageBG} resizeMode="cover" source={require("../../../assets/gradientBackground.png")} />
                
                    {/* 2. The white box around all registration options */}
                <View style={style.whiteBox}>

                    {/* The logo box */}
                    <View style={style.logo}>
                                <Image style= {{ marginTop: width/15, alignSelf: "center", width: width/1.8, height: height/5}} source={logo} />
                                <Text style={{marginTop: -width/5, alignSelf: "center",color:"#8898AA", fontFamily: "OleoScript_400Regular", fontSize: width/12 }}>Bubl</Text>
                                <Text style={style.textDescription}>Please enter a valid email and password</Text>
                    </View>
                    <View style={style.interactiveBoxes}>
                        {/* Entry Boxes */}
                        <View style={style.entryBoxes}>
                            {/* 3. Email box */}
                            <View style={style.inputView}>
                            <View style={style.icon}>
                                <FontAwesome name="envelope"/>
                            </View>
                                <TextInput
                                    style={style.TextInput}
                                    placeholder="Email"
                                    placeholderTextColor="#003f5c"
                                    onChangeText = {text => setEmail(text)}
                                />
                            </View>

                            {/* 4. password box */}
                            <View style={style.inputView}>
                            <View style={style.icon} >
                                <FontAwesome name="unlock-alt"/>
                            </View>
                                <TextInput
                                    style={style.TextInput}
                                    placeholder="Password" secureTextEntry
                                    placeholderTextColor="#003f5c"
                                    onChangeText = {text => setPassword1(text)}
                                />
                            </View>

                            {/* 5. re-enter password box */}
                            <View style={style.inputView}>
                            <View style={style.icon} >
                                <FontAwesome name="unlock-alt"/>
                            </View>
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

                            {/* 7. login  - go back to log in */}
                            <View style={{ flexDirection: "row", justifyContent: "center"}}>
                            <Text style={style.text}> Already have an account? </Text>
                            <TouchableOpacity>
                                <Text style={style.signUp} onPress={onLogin}>Login</Text>
                            </TouchableOpacity>
                        </View>

                        </View>
                    </View>
                </View>    
            </View>
        )
    }
}
