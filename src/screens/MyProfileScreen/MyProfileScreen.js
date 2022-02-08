import React, {useState, useEffect} from 'react'
import style from './style';
import { Image, Text, TextInput, View, TouchableOpacity, ScrollView, Dimensions, ImageBackground } from 'react-native'
import { Icon, Button} from '@ui-kitten/components';
import { auth, firestore } from '../../firebase/config';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faComment, faUser} from '@fortawesome/free-solid-svg-icons'
const { width, height } = Dimensions.get("screen");

export default function ProfileScreen({navigation}) {
    //** Set intial states for user's information **//
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

    const editIcon = (props) => (
      <Icon {...props} name='edit-outline'/>
    );
    //** Get User Data from Firestore **//
    const fetchUserData = async() => {
      const currentUser = auth?.currentUser
      const uid = currentUser.uid
      const data = firestore
                   .collection('users')
                   .doc(uid)
                   .onSnapshot(documentSnapshot => {
                    const userData = documentSnapshot.data()
                    setFirstName(userData.firstName)
                    setLastName(userData.lastName)
                    setKUID(userData.kuid)
                    setEmail(userData.email)
                    setAddress(userData.address)
                    setCity(userData.city)
                    setZipCode(userData.zipCode)
                    setFromValue(userData.fromAge)
                    setToValue(userData.toAge)
                    setSexualPref(userData.sexualPref)
                    setGender(userData.gender)
                    if(userData.birthday) {
                      let epochMilliseconds = userData.birthday.seconds * 1000
                      let birthdayTimeStamp = new Date(epochMilliseconds)
                      let actualDate = birthdayTimeStamp.getDate()
                      let actualMonth = birthdayTimeStamp.getMonth()
                      let actualYear = birthdayTimeStamp.getFullYear()
                      let birthdayString = (actualMonth + 1) + '/' + actualDate + '/' + actualYear
                      setBirthday(birthdayString)
                    }
                    setProfilePic(userData.profilePic)
                    setUSState(userData.state)
                  });
    }
    //** Fecth User Data when the screen is loaded **/
    useEffect(() => {
      fetchUserData()
    }, [])

    //** Render the information **/
    return (
      <View style={style.container}>
        <View style={style.profile} >
          <Image style={style.imageBG} resizeMode="cover" source={require("../../../assets/gradientBackground.png")} />
          <View style={{flexDirection: "row", justifyContent: "space-between", width: width* 7/8, marginTop: height/30}}>
            <TouchableOpacity onPress={onLogout}>
              <Text>LOGOUT</Text>
            </TouchableOpacity>
            <Text style={{alignSelf: "center", fontWeight: "bold", fontSize: width/17}}>Edit Profile</Text>
            <TouchableOpacity>
              <Text>SAVE</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Image style={{width: width/3, height: height/6, borderRadius: 100, marginTop: width/20}} source={{uri: profilePic}} />
            <Button style={style.editButton} accessoryLeft={editIcon} status="control" />  
          </View>
        </View>

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
