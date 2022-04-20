import React, {useState, useEffect} from 'react'
import style from './style';
import { StyleSheet, Dimensions, Text, TextInput, SafeAreaView, View, Button, TouchableOpacity, Image, ImageBackground, Modal, Pressable } from 'react-native'
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
    const [bio, setBio] = useState('');

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
                    setBio(userData.bio)
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
    //Modal
    const [modalVisible, setModalVisible] = useState(false);
    return (
      <View style={style.container}>
                <ImageBackground style={style.imageBG} resizeMode="cover" source={require("../../../assets/gradientBackground.png")} />
                {/* White box container */}
                <View style={style.box}>
                    {/* 1. The avatar */}
                    {/*<View style={style.avatar}>*/}
                    <View style={style.biobox}>
                        <Image style= {{ alignSelf: "center", borderRadius: 100, marginTop: -width/10, width: width/3.5, height: height/8, position: "relative"}} source={avatar} />
                        <Text style={{marginTop: width/20, alignSelf: "center",color:"#8898AA", fontFamily: "OleoScript_400Regular", fontSize: width/20 }}>{firstName}, {age}</Text>
                        <Text style={{marginTop: width/50, alignSelf: "center",color:"#8898AA", fontFamily: "OleoScript_400Regular", fontSize: width/25 }}>{city}, {USState}</Text>
                        {/* <Text style={{marginTop: width/50, alignSelf: "center",color:"#8898AA", fontFamily: "OleoScript_400Regular", fontSize: width/25 }}>San Franciso, CA</Text>*/}
                          <Text style={{color:"#7e27ed", fontFamily: "OleoScript_400Regular", fontSize: width/30 }}>BIO</Text>
                          <Text style={{color:"#b584f4", fontSize: width/35 }}>{bio}</Text>
                          <Text></Text>
                        {/*</View>*/}
                    </View>
                    {/* 2. Setting Choices */}
                    <View style={style.choice}>
                      <TouchableOpacity style={style.inputView} onPress={onMyProfile}>
                          <Text style={style.TextInput}>My Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.inputView} onPress={() => setModalVisible(true)}>
                          <Text style={style.TextInput}>Customer Service</Text>
                        </TouchableOpacity>
                        <Modal transparent={true} visible={modalVisible}>
                          <View style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <View style={style.modal}>
                              <Text style={{ fontSize: 25, alignSelf: "center" }}>Customer Service</Text>
                              <Text style={{ fontSize: 15, alignSelf: "center" }}>Contact us if you have any questions or concerns</Text>
                              <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 40, marginRight: 40 }}>
                                <Text style={{ backgroundColor: "red" }}>Email</Text>
                                <Pressable
                                  onPress={() => setModalVisible(!modalVisible)}
                                  style={{ backgroundColor: "lightblue", alignSelf: "center" }}
                                >

                                  <Text>Close</Text>
                                </Pressable>

                              </View>

                            </View>
                          </View>

                        </Modal>
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