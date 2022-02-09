import React, {useState, useEffect} from 'react'
import style from './style';
import { Icon, Button} from '@ui-kitten/components';
import { Image, StyleSheet, Text,TextInput, SafeAreaView, View, TouchableOpacity, ScrollView } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faComment, faUser} from '@fortawesome/free-solid-svg-icons'


export default function ProfileScreen({navigation}) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [kuId, setKUID] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [address, setAddress] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [sexualPref, setSexualPref] = useState('')
  const [gender, setGender] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [city, setCity] = useState('')
  const [USState, setUSState] = useState('')


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
          

        <ScrollView style={style.content}>
          <View style={style.Btn}>
            <Text style={{color:"#8898AA"}}> First Name</Text>
            <TextInput> {firstName}</TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Last Name</Text>
            <TextInput> {lastName} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> KU ID</Text>
            <TextInput> {kuId} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Email</Text>
            <TextInput> {email} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Birthday</Text>
            <TextInput> {birthday} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Address</Text>
            <TextInput> {address} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> City</Text>
            <TextInput> {city} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> State</Text>
            <TextInput> {USState} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Zip code</Text>
            <TextInput> {zipCode} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Gender</Text>
            <TextInput> {gender} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Sexual Preference</Text>
            <TextInput> both </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}>Preferred Age Range</Text>
            <TextInput> From {fromValue} to {toValue} </TextInput>
          </View>
        </ScrollView>   
            
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