import React from 'react'
import style from './style';
import { Image, StyleSheet, Text,SafeAreaView, View, Button, TouchableOpacity } from 'react-native'


export default function ProfileScreen({navigation}) {
    const onLogout = () => {
        navigation.navigate('Login')
    }

    const onMyProfile = () => {
      navigation.navigate('MyProfile')
    }

    return (
      <View style={style.container}>
        {/* Logo Img here
          <Image style={styles.image} source={require("../assets/logo.png")} />*/} 
        <Image style={style.image} source={require("../../../assets/sky.png")} />
        <Image style={style.profile} source={require("../../../assets/profile.png")} /> 
        <Text style={{fontSize: 20, fontWeight: "bold"}}>Sherk</Text>
        <Text style={{left: 45, fontSize: 15}}>Looking for my Fiona</Text>
          
        <View style={style.content}>
          <TouchableOpacity style={style.Btn} onPress={onMyProfile}>
            <Text style={style.text}>My Profile</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={style.Btn}>
            <Text style={style.text}>Preference</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={style.Btn}>
            <Text style={style.text}>Account Settings</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={style.Btn}>
            <Text style={style.text}>Customer Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.Btn}>
            <Text style={style.text}>What Works</Text>
          </TouchableOpacity> 

          <TouchableOpacity onPress={onLogout}>
            <Text>LOGOUT</Text>
          </TouchableOpacity>
        </View>     
      </View>
    )
}