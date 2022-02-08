import React from 'react'
import style from './style';
import { StyleSheet, Dimensions, Text, TextInput, SafeAreaView, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import logo from '../../../assets/bublLogo.png';
import avatar from '../../../assets/shrek.jpg';

import AppLoading from 'expo-app-loading';
//import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import {
    useFonts,
    OleoScript_400Regular,
    OleoScript_700Bold,
  } from '@expo-google-fonts/oleo-script';

import { auth } from '../../firebase/config';
import * as Animatable from 'react-native-animatable';
import { textAlign } from 'styled-system';

export default function ProfileScreen({navigation}) {
    const onLogout = () => {
      auth
      .signOut()
      .then(() => {
        navigation.replace('Login')
      })
      .catch(error => {
        alert(error.message)
      })
        
    }

    const { width, height } = Dimensions.get("screen");

    const onMyProfile = () => {
      navigation.navigate('MyProfile')
    }

    const onAccountSettings = () => {
      navigation.navigate('AccountSettings')
    }

    const onPrefence = () => {
      navigation.navigate('Preference')
    }

    return (
      <View style={style.container}>
                <ImageBackground style={style.imageBG} resizeMode="cover" source={require("../../../assets/gradientBackground.png")} />
                {/* White box container */}
                <View style={style.box}>
                    {/* 1. The avatar */}
                    <View style={style.avatar}>
                        <Image style= {{ alignSelf: "center", borderRadius: 100, marginTop: -width/10, width: width/3.5, height: height/8, position: "relative"}} source={avatar} />
                        <Text style={{marginTop: width/20, alignSelf: "center",color:"#8898AA", fontFamily: "OleoScript_400Regular", fontSize: width/20 }}>Shrek The Almighty, 18</Text>
                        <Text style={{marginTop: width/50, alignSelf: "center",color:"#8898AA", fontFamily: "OleoScript_400Regular", fontSize: width/25 }}>San Franciso, CA</Text>
                    </View>
                    {/* 2. Setting Choices */}
                    <View style={style.choice}>
                      <TouchableOpacity style={style.inputView} onPress={onMyProfile}>
                        <Text style={style.TextInput}>My Profile</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={style.inputView} onPress={onPrefence}>
                        <Text style={style.TextInput}>Preference</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={style.inputView} onPress={onAccountSettings}>
                        <Text style={style.TextInput}>Account Settings</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={style.inputView}>
                        <Text style={style.TextInput}>Customer Service</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={style.inputView}> 
                        <Text style={style.TextInput}>What Works</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={style.logoutBtn} onPress={onLogout}>
                        <Text >LOGOUT</Text>
                      </TouchableOpacity>
                      
                    </View>
                </View>    
          </View>
    )
}