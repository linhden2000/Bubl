import React, {useState, useEffect} from 'react'
import style from './style';
import { StyleSheet, Dimensions, Text, TextInput, SafeAreaView, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import logo from '../../../assets/bublLogo.png';
import avatar from '../../../assets/shrek.jpg';
import moment from 'moment';
import AppLoading from 'expo-app-loading';
//import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import {
    useFonts,
    OleoScript_400Regular,
    OleoScript_700Bold,
  } from '@expo-google-fonts/oleo-script';

import { auth, firestore } from '../../firebase/config';
import * as Animatable from 'react-native-animatable';
import { textAlign } from 'styled-system';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';

export default function ProfileScreen({navigation}) {
    const [firstName, setFirstName] = useState('');
    const [city, setCity] = useState('');
    const [USState, setUSState] = useState('');
    const [fromValue, setFromValue] = useState(0);
    const [birthday, setBirthday] = useState('');
    const [age, setAge] = useState('');

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

    const fetchUserData = async() => {
      const currentUser = auth?.currentUser
      const uid = currentUser.uid
      const data = firestore
                   .collection('users')
                   .doc(uid)
                   .onSnapshot(documentSnapshot => {
                    const userData = documentSnapshot.data()
                    setFirstName(userData.firstName)
                    setCity(userData.city)
                    if(userData.birthday) {
                      let epochMilliseconds = userData.birthday.seconds * 1000
                      let birthdayTimeStamp = new Date(epochMilliseconds)
                      let actualDate = birthdayTimeStamp.getDate()
                      let actualMonth = birthdayTimeStamp.getMonth()
                      let actualYear = birthdayTimeStamp.getFullYear()
                      let birthdayString = (actualMonth + 1) + '/' + actualDate + '/' + actualYear
                      setBirthday(birthdayString)

                      //converting to age
                      let month_diff =  Date.now() - birthdayTimeStamp.getTime();
                      let age_dt = new Date(month_diff);
                      let year = age_dt.getUTCFullYear(); 
                      let age = Math.abs(year - 1970);  

                      setAge(age);
                    }
                    setUSState(userData.state)
                  });
    }
    useEffect(() => {
      let isMounted = true;
      fetchUserData()
      return () => { isMounted = false }; // cleanup toggles value, if unmounted 
    }, [])

    return (
      <View style={style.container}>
                <ImageBackground style={style.imageBG} resizeMode="cover" source={require("../../../assets/gradientBackground.png")} />
                {/* White box container */}
                <View style={style.box}>
                    {/* 1. The avatar */}
                    <View style={style.avatar}>
                        <Image style= {{ alignSelf: "center", borderRadius: 100, marginTop: -width/10, width: width/3.5, height: height/8, position: "relative"}} source={avatar} />
                        <Text style={{marginTop: width/20, alignSelf: "center",color:"#8898AA", fontFamily: "OleoScript_400Regular", fontSize: width/20 }}>{firstName}, {age}</Text>
                        <Text style={{marginTop: width/50, alignSelf: "center",color:"#8898AA", fontFamily: "OleoScript_400Regular", fontSize: width/25 }}>{city}, {USState}</Text>
                        {/* <Text style={{marginTop: width/50, alignSelf: "center",color:"#8898AA", fontFamily: "OleoScript_400Regular", fontSize: width/25 }}>San Franciso, CA</Text> */}
                        <View style={style.biobox}>
                          <Text style={{color:"#7e27ed", fontFamily: "OleoScript_400Regular", fontSize: width/30 }}>BIO</Text>
                          <Text style={{color:"#b584f4", fontSize: width/35 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                          <Text></Text>
                        </View>
                    </View>
                    {/* 2. Setting Choices */}
                    <View style={style.choice}>
                      <TouchableOpacity style={style.inputView} onPress={onMyProfile}>
                        <Text style={style.TextInput}>My Profile</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={style.inputView}>
                        <Text style={style.TextInput}>Customer Service</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={style.inputView}> 
                        <Text style={style.TextInput}>What Works</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={style.logoutBtn} onPress={onLogout}>
                        <Text style={{color:"white" }}>LOGOUT</Text>
                      </TouchableOpacity>
                      
                    </View>
                </View>    
            </View>
      
    )
}