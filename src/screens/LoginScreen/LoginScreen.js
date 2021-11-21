import React, {useEffect, useState} from 'react'
import style from './style';
import { StyleSheet, Text, TextInput, SafeAreaView, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import logo from '../../../assets/bublLogo.png';

import AppLoading from 'expo-app-loading';
//import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import {
    useFonts,
    OleoScript_400Regular,
    OleoScript_700Bold,
  } from '@expo-google-fonts/oleo-script';

import { auth } from '../../firebase/config';
import * as Animatable from 'react-native-animatable';


export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValidEmail, setValidEmail] = useState(true)
    const [isValidPassword, setValidPassword] = useState(true)
    
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

    const handleEmailChange = (val) => {
        if( val.trim().length > 0 ) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length > 0 ) {
            setValidPassword(true)
        } else {
            setValidPassword(false)
        }
    }

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
                <ImageBackground style={style.imageBG} resizeMode="cover" source={require("../../../assets/bg.png")} />
                <View style={style.box}>
                    <View style={style.logo}>
                        <Image style= {{ alignSelf: "center", width: 180, height: 180}} source={logo} />
                        <Text style={{marginTop: -90, alignSelf: "center",color:"#8898AA", fontFamily: "OleoScript_400Regular", fontSize: 30 }}>Bubl</Text>
                    </View>
                    
                    
                    <View style={style.social}>
                        {/* <Text style={{textAlignVertical: "center",textAlign: "center", fontSize: "15", color:"#8898AA"}}> Log in with</Text> */}
                        <View style={style.socialElement}>
                            <FontAwesome.Button name="facebook" backgroundColor="#3b5998" justifyContent="center">Login with Facebook </FontAwesome.Button>
                        </View>
                        <View style={style.socialElement}>
                            <FontAwesome.Button name="google" backgroundColor="#DB4437" justifyContent="center">Login with Google </FontAwesome.Button>
                        </View> 
                    </View>
    
                    <View style={style.login}>
                        <Text style={{marginTop: 30, textAlignVertical: "center",textAlign: "center", fontSize:15, color:"#8898AA"}}> Or log in the classic way</Text>
                        <View style={style.inputView}>
                            <View style={{textAlign: 'center',alignItems:"center", justifyContent: "center",fontSize: 15, width: 45, height: 45}} >
                                <FontAwesome name="envelope"/>
                            </View>
                            <TextInput
                                style={style.TextInput}
                                placeholder="Email"
                                placeholderTextColor="#003f5c" 
                                onChangeText={text=>setEmail(text)}
                                onEndEditing={text=>handleEmailChange(text.nativeEvent.text)}
                            />
                        </View>
                        { isValidEmail ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={style.errorMsg}>Email is required .</Text>
                        </Animatable.View>
                        }
                        <View style={style.inputView}>
                            <View style={{textAlign: 'center',alignItems:"center", justifyContent: "center",fontSize: 15, width: 45, height: 45}} >
                                <FontAwesome name="unlock-alt"/>
                            </View>
                            <TextInput
                                style={style.TextInput}
                                placeholder="Password" secureTextEntry
                                placeholderTextColor="#003f5c"
                                onChangeText={text=>setPassword(text)}
                                onEndEditing={text=>handlePasswordChange(text.nativeEvent.text)}
                            />
                        </View>
                        { isValidPassword ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={style.errorMsg}>Password is required .</Text>
                        </Animatable.View>
                        }
                        <TouchableOpacity>
                            <Text style={{marginTop: 30, textAlignVertical: "center",textAlign: "center", fontSize:15, color:"#8898AA"}} onPress={onLogin}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.loginBtn} onPress={onLogin}>
                            <Text >LOGIN</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", justifyContent: "center"}}>
                            <Text style={{marginTop: 30, textAlignVertical: "center",textAlign: "center", fontSize:15, color:"#8898AA"}}> Don't have account? </Text>
                            <TouchableOpacity>
                                <Text style={{marginTop: 30, textAlignVertical: "center",textAlign: "center", fontSize:15}} onPress={onRegistration}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                </View>    
            </View>
        )
    }
    
}

