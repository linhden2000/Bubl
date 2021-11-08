import React from 'react'
import style from './style';
import { Image, StyleSheet, Text,SafeAreaView, View, Button, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faComment, faUser} from '@fortawesome/free-solid-svg-icons'


export default function ProfileScreen({navigation}) {
    const onLogout = () => {
        navigation.navigate('Login')
    }
    
    const onMessage = () => {
        navigation.navigate('Message')
    }

    const onProfile = () => {
        navigation.navigate('Profile')
    }

    const onDashBoard = () => {
        navigation.navigate('Dashboard')
    }

    const onMyProfile = () => {
        navigation.navigate('MyProfile')
    }

    const onPreference = () => {
      navigation.navigate('Preference')
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
          <TouchableOpacity style={style.Btn} onPress={onPreference}>
            <Text style={style.text}>Preference</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={style.Btn}>
            <Text style={style.text}>Account</Text>
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
            
        <View style={style.navbar}>
          <TouchableOpacity style={style.messageBtn} onPress={onMessage}>
            <FontAwesomeIcon icon={faComment} />
          </TouchableOpacity> 

          <TouchableOpacity style={style.homeBtn} onPress={onDashBoard}>
            <FontAwesomeIcon icon={faHome} />
          </TouchableOpacity> 

          <TouchableOpacity style={style.profileBtn} onPress={onProfile}>
              <FontAwesomeIcon icon={faUser} />
          </TouchableOpacity> 
        </View>        
      </View>
    )
}