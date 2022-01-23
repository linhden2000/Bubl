import React, {useEffect, useState} from 'react'
import style from './style';
import { StyleSheet, Dimensions, Text, TextInput, SafeAreaView, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { FontAwesome} from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import logo from '../../../assets/bublLogo.png';
import {Card} from '@ui-kitten/components';

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
    const [authError, setAuthError] = useState(false) //Displays message if auth fails
    
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
        auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            setAuthError(false)
            const user = userCredential.user
        })
        .catch(error => {
            setAuthError(true)
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
                <ImageBackground style={style.imageBG} resizeMode="cover" source={require("../../../assets/gradientBackground.png")} />
                {/* White box container */}
                <View style={style.box}>
                    {/* 1. The logo */}
                    <View style={style.logo}>
                        <Image style= {{ alignSelf: "center", width: width/2, height: height/5}} source={logo} />
                        <Text style={{marginTop: -width/5, alignSelf: "center",color:"#8898AA", fontFamily: "OleoScript_400Regular", fontSize: width/15 }}>Bubl</Text>
                    </View>
                    {/* 2. Login with social account */}
                    <View style={style.social}>
                        <View style={style.socialElement}>
                            <FontAwesome.Button name="facebook" backgroundColor="#3b5998" justifyContent="center">Login with Facebook </FontAwesome.Button>
                        </View>
                        <View style={style.socialElement}>
                            <FontAwesome.Button name="google" backgroundColor="#DB4437" justifyContent="center">Login with Google </FontAwesome.Button>
                        </View> 
                    </View>
                    {/* 3. Login with traditional way */}
                    <View style={style.login}>
                        <Text style={style.text}> Or log in the classic way</Text>
                        {}{authError ?(
                        <Card style={style.authErrorCard}>
                            <Text style={style.authErrorMsg}> <FontAwesomeIcon icon={faExclamationTriangle} color={ 'red' }/>  Wrong email or password. Please try again.</Text>
                        </Card>
                        ): null}
                        {/* Email inputView */}
                        <View style={style.inputView}>
                            <View style={style.icon} >
                                <FontAwesome name="envelope"/>
                            </View>
                            <TextInput
                                autoCorrect={false}
                                autoCapitalize={false}
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
                        {/* Password inputView */}
                        <View style={style.inputView}>
                            <View style={style.icon} >
                                <FontAwesome name="unlock-alt"/>
                            </View>
                            <TextInput
                                autoCorrect={false}
                                autoCapitalize={false}
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
                            <Text style={style.text} onPress={onLogin}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.loginBtn} onPress={onLogin}>
                            <Text >LOGIN</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", justifyContent: "center"}}>
                            <Text style={style.text}> Don't have account? </Text>
                            <TouchableOpacity>
                                <Text style={style.signUp} onPress={onRegistration}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                </View>    
            </View>
        )
    }
    
}

