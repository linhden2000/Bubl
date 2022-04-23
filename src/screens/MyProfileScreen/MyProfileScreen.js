import React, {useState, useEffect} from 'react'
import style from './style';
import { Image, Text, TextInput, View, TouchableOpacity, FlatList, ScrollView, Dimensions, ImageBackground } from 'react-native'
import { Icon, Button} from '@ui-kitten/components';
import { auth, firestore } from '../../firebase/config';
import moment from 'moment';
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
    const [bio, setBio] = useState('');


    const onLogout = () => {
        navigation.navigate('Login')
    }
    const onProfile = () => {
      navigation.navigate('Profile')
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
                    setBio(userData.bio)
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
          <View style={{flexDirection: "row", justifyContent: "space-between", width: width* 7/8, marginTop: height/25}}>
            <TouchableOpacity onPress={onLogout}>
              <Text>LOGOUT</Text>
            </TouchableOpacity>
            <Text style={{alignSelf: "center", fontWeight: "bold", fontSize: width/17}}>Edit Profile</Text>
            <TouchableOpacity onPress={onProfile}>
              <Text>SAVE</Text>
            </TouchableOpacity>
          </View>

          <View style={style.avatar}>
            <Image style={{width: height/6, height: height/6, borderRadius: 100, marginTop: width/20}} source={{uri: profilePic}} />
            <Button style={style.editButton} accessoryLeft={editIcon} status="control" />  
          </View>
          <Text style={style.customerServiceMsg}>Contact Customer Service for changes in your Name, KUID or Birthday</Text>
        </View>

        <ScrollView style={style.content}>
          <View style={style.Btn}>
            <Text style={{color:"#570CBC"}}> First Name</Text>
            <Text  style={{color:"#8898AA"}}> {firstName}</Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> Last Name</Text>
            <Text  style={{color:"#8898AA"}}> {lastName}</Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> KU ID</Text>
            <Text  style={{color:"#8898AA"}}> {kuId}</Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> Biography </Text>
            <TextInput> 
              {bio}
              {/* onChangeText={newBio => setBio(newBio)} */}
            </TextInput>
          </View>

          {/* <Input
              placeholder = {bio}
              onChangeText={newBio => setBio(newBio)}
            /> */}

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> Email</Text>
            <TextInput> {email} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> Birthday</Text>
            <Text  style={{color:"#8898AA"}}> {birthday}</Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> Address</Text>
            <TextInput> {address} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> City</Text>
            <TextInput> {city} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> State</Text>
            <TextInput> {USState} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> Zip code</Text>
            <TextInput> {zipCode} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> Gender</Text>
            <TextInput> {gender} </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> Sexual Preference</Text>
            <TextInput> both </TextInput>
          </View>

          {/* Dark Purple: #570CBC
          Light Purple: #A971F4 */}

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}>Preferred Age Range</Text>
            <TextInput> From {fromValue} to {toValue} </TextInput>
          </View>
        </ScrollView>       
      </View>
    )
}
