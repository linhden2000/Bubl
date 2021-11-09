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
    
    return (
      <View style={style.container}>
        {/* Logo Img here
          <Image style={styles.image} source={require("../assets/logo.png")} />*/} 
          
        <View style={style.content}>
            <Text style={style.topic}>Sexual Orientation</Text>
            <Text style={style.text}>Male</Text>
            
            <Text style={style.topic}>Location</Text>
            <Text style={style.text}>Lawrence, Kansas</Text>
           
            <Text style={style.topic}>Age Range</Text>
            <Text style={style.text}>20-30</Text>
          
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