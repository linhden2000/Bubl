import React, {useState, useEffect} from 'react'
import style from './style';
import {USStatesProp, genderProp, sexualPrefProp} from '../../properties'
import { Image, Text, View, TouchableOpacity, ScrollView, Dimensions, ImageBackground, Alert } from 'react-native'
import { Input, Icon, Button, Select, IndexPath, SelectItem, Datepicker} from '@ui-kitten/components';
import RangeSlider from 'react-native-range-slider-expo';
import { auth, firestore } from '../../firebase/config';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faComment, faUser} from '@fortawesome/free-solid-svg-icons'
const { width, height } = Dimensions.get("screen");

const CalendarIcon = (props) => (
  <Icon {...props} name='calendar'/>
);

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
    const [date, setDate] = useState(new Date());
    const now = new Date();
    const minDatePicker = new Date(now.getFullYear() - 100, now.getMonth(), now.getDate()); //max age: 100 years old
    const maxDatePicker = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());  //min age: 18 years old

    const [editMode, setEditMode] = useState(''); //Editing or viewing


    // Current User
    const currentUser = -auth?.currentUser
    // "users" collection
    const usersRef = firestore.collection('users')

    //The following are inputted by dropdown
    //** States drop down **/
    const [selectedStateIndex, setSelectedStateIndex] = useState(new IndexPath(0));
    const displayStateValue = USStatesProp[selectedStateIndex.row];
    const renderStateOption = (label, key) => (
        <SelectItem key={key} title={label}/>
    );
    //** Gender drop down **/
    const [selectedGenderIndex, setSelectedGenderIndex] = useState(new IndexPath(0));
    const displayGenderValue = genderProp[selectedGenderIndex.row];
    const renderGenderOption = (label, key) => (
        <SelectItem key={key} title={label}/>
    );
    //** Gender Preference drop down (Multi Select)**/
    const [selectedSexualPrefIndex, setSelectedSexualPrefIndex] = useState([
        new IndexPath(0),
        new IndexPath(1),
    ]);

    const groupDisplayValues = selectedSexualPrefIndex.map(index => {
      return sexualPrefProp[index.row];
    });
    const renderSexualPrefOption = (label, key) => (
        <SelectItem key={key} title={label}/>
    );

    const onLogout = () => {
        navigation.navigate('Login')
    }
    const onProfile = () => {
      navigation.navigate('Profile')
  }

    const onMessage = () => {
      navigation.navigate('Message')
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
    const onSave = () => { 
      const uid = auth?.currentUser.uid
      const selectedGender = selectedGenderIndex.toString()
      // Convert Index Path to String
      const gender = selectedGenderIndex.toString() == "1"? "man" : "woman"
      let sexualPref = "both"
      if(selectedSexualPrefIndex == "1,2") {
          sexualPref = "both"
      }
      else if(selectedSexualPrefIndex == "1") {
          sexualPref = "male"
      }
      else {
          sexualPref = "female"
      }

      
      
      const userData = {
          id: uid,
          email: email,
          firstName: firstName,
          lastName: lastName,
          kuid: kuId,
          address: address,
          city: city,
          zipCode: zipCode,
          fromAge: fromValue,
          toAge: toValue,
          birthday: date,
          gender: gender,
          profilePic: profilePic,
          sexualPref: sexualPref,
          state: USStatesProp[parseInt(selectedStateIndex.toString()) - 1]
      }


      setEditMode(false);
      // Set users data, navigate to Dashboard if succeed
      usersRef
      .doc(uid)
      .update(userData)
      .then(() => submitAlert())
      .catch(err => console.log(err))
  }
  
  //function to alert user that they submitted their question successfully
  const submitAlert = () => 
  Alert.alert(
    "Your edit was saved!"
  );

    //** Fecth User Data when the screen is loaded **/
    useEffect(() => {
      let isMounted = true;
      fetchUserData()
      setEditMode(false);
      return () => { isMounted = false }; // cleanup toggles value, if unmounted 
    }, [])

    //** Render the information **/
    return (
      <View style={style.container}>
        {editMode ? (
        <View style={style.profile} >
          <Image style={style.imageBG} resizeMode="cover" source={require("../../../assets/gradientBackground.png")} />
          <View style={{flexDirection: "row", justifyContent: "space-between", width: width* 7/8, marginTop: height/25}}>
            <TouchableOpacity onPress={() => setEditMode(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <Text style={{alignSelf: "center", fontWeight: "bold", fontSize: width/17}}>Edit Profile</Text>
            <View>
              <TouchableOpacity onPress={onSave}>
            <Text>SAVE</Text>
          </TouchableOpacity>
          </View> 
          </View>

          <View>
            <Image style={{width: width/3, height: height/6, borderRadius: 100, marginTop: width/20}} source={profilePic ? {uri: profilePic} : undefined} />
            <Button style={style.editButton} accessoryLeft={editIcon} status="control" />  
          </View>
        </View> ) :
        (<View style={style.profile} >
        <Image style={style.imageBG} resizeMode="cover" source={require("../../../assets/gradientBackground.png")} />
        <View style={{flexDirection: "row", justifyContent: "space-between", width: width* 7/8, marginTop: height/25}}>
          <TouchableOpacity onPress={onLogout}>
            <Text>LOGOUT</Text>
          </TouchableOpacity>
          <Text style={{alignSelf: "center", fontWeight: "bold", fontSize: width/17}}>Edit Profile</Text>
          <View>
            <TouchableOpacity onPress={() => setEditMode(true)}>
              <Text>EDIT</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Image style={{width: width/3, height: height/6, borderRadius: 100, marginTop: width/20}} source={profilePic ? {uri: profilePic} : undefined} />
          <Button style={style.editButton} accessoryLeft={editIcon} status="control" />  
        </View>
      </View>) }


        {editMode ? 
        (<ScrollView style={style.content}>
          <View style={style.Btn}>
              <Input
                  label = 'First Name'
                  placeholder='Place your Text'
                  value={firstName}
                  onChangeText={nextValue => setFirstName(nextValue)}
              />    
          </View>
          <View style={style.Btn}>
              <Input
                  label = 'Last Name'
                  placeholder='Place your Text'
                  value={lastName}
                  onChangeText={nextValue => setLastName(nextValue)}
              />
          </View>
          <View style={style.Btn}>
              <Input
                  label = 'KU ID'
                  placeholder='Place your Text'
                  value={kuId}
                  onChangeText={nextValue => setKUID(nextValue)}
              />
          </View>
          <View style={style.Btn}>
              <Input
                  label = 'Email'
                  placeholder='Place your Text'
                  value={email}
                  onChangeText={nextValue => setKUID(nextValue)}
              />
          </View>
          <View style={style.Btn}>
              <Datepicker
                  label='Birthday'
                  placeholder='Pick Date'
                  min={minDatePicker}
                  max={maxDatePicker}
                  date={date}
                  onSelect={nextDate => setDate(nextDate)}
                  accessoryRight={CalendarIcon}
              />
          </View>
          <View style={style.Btn}>
              <Select
                  label="Gender"
                  style={style.select}
                  placeholder='Default'
                  value={displayGenderValue}
                  onSelect={index => setSelectedGenderIndex(index)}>
                  {genderProp.map(renderGenderOption)}
              </Select>
          </View>
          <View style={style.Btn}>
              <Select
                  label="Sexual Preference"
                  style={style.select}
                  placeholder='You may select multiple options'

                  multiSelect={true}
                  value={groupDisplayValues.join(', ')}
                  selectedIndex={selectedSexualPrefIndex}

                  onSelect={index => setSelectedSexualPrefIndex(index)}>
                  {sexualPrefProp.map(renderSexualPrefOption)}
              </Select>
          </View>
          <View style={style.slider}>
              <Text >Age Range: {fromValue} - {toValue}</Text>
              <RangeSlider min={18} max={100}
                   //inRangeBarColor={'#5e72e4'}
                   //fromKnobColor={'#5e72e4'}
                   //toKnobColor={'#5e72e4'}
                   //outOfRangeBarColor={'#C8C8C8'}
                   showRangeLabels={false}
                   fromValueOnChange={value => setFromValue(value)}
                   toValueOnChange={value => setToValue(value)}
                   initialFromValue={18}
                   initialToValue={30}
              />
        </View>
          <View style={style.Btn}>
              <Input
                  label = 'Address'
                  placeholder='Place your Text'
                  value={address}
                  onChangeText={nextValue => setAddress(nextValue)}
              />
          </View>
          <View style={style.Btn}>
              <Input
                  label = 'City'
                  placeholder='Place your Text'
                  value={city}
                  onChangeText={nextValue => setCity(nextValue)}
              />
          </View>
          <View style={style.Btn}>
              <Input
                  label = 'Zip Code'
                  placeholder='Place your Text'
                  value={zipCode}
                  onChangeText={nextValue => setZipCode(nextValue)}
              />
          </View>
          <View style={style.Btn}>
          <Select
              label="States"
              style={style.select}
              placeholder='Default'

              value={displayStateValue}
              onSelect={index => setSelectedStateIndex(index)}>
              {USStatesProp.map(renderStateOption)}
          </Select>
          </View>
        </ScrollView>) :
        (<ScrollView style={style.content}>
          <View style={style.Btn}>
            <Text style={{color:"#8898AA"}}> First Name</Text>
            <Text> {firstName}</Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Last Name</Text>
            <Text> {lastName} </Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> KU ID</Text>
            <Text> {kuId} </Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Email</Text>
            <Text> {email} </Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Birthday</Text>
            <Text> {birthday} </Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Address</Text>
            <Text> {address} </Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> City</Text>
            <Text> {city} </Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> State</Text>
            <Text> {USState} </Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Zip code</Text>
            <Text> {zipCode} </Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Gender</Text>
            <Text> {gender} </Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Sexual Preference</Text>
            <Text> both </Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}>Preferred Age Range</Text>
            <Text> From {fromValue} to {toValue} </Text>
          </View>
        </ScrollView>)}   
        
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
