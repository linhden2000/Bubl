import React, {useState, useEffect} from 'react'
import style from './style';
import { Image, Text, TextInput, View, TouchableOpacity, FlatList, ScrollView, Dimensions, ImageBackground } from 'react-native'
import { Select, SelectItem, IndexPath} from '@ui-kitten/components';
import { Icon, Button} from '@ui-kitten/components';
import { auth, firestore } from '../../firebase/config';
import moment from 'moment';
import {USStatesProp, genderProp, sexualPrefProp} from '../../properties'
import RangeSlider from 'react-native-range-slider-expo';


const { width, height } = Dimensions.get("screen");

export default function ProfileScreen({navigation}) {

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

    const currentUser = auth?.currentUser;
    const usersRef = firestore.collection('users');

    const onLogout = () => {
        navigation.navigate('Login')
    }
    const onProfile = () => {

      // console.log(firstName);
      // console.log(lastName);
      // console.log(kuId);
      // console.log(bio);

      const uid = currentUser.uid
      const userData = {
        id: uid,
        email: currentUser.email,
        firstName: firstName,
        lastName: lastName,
        bio: bio,
        kuid: kuId,
        address: address,
        city: city,
        zipCode: zipCode,
        fromAge: fromValue,
        toAge: toValue,
        birthday: birthday,
        gender: gender,
        profilePic: profilePic,
        sexualPref: sexualPref,
        state: USStatesProp[parseInt(selectedStateIndex.toString()) - 1]
    }

      usersRef
        .doc(uid)
        .set(userData)
        .then(() => {
            navigation.navigate('DashboardNavigation');
        })
        .catch(error => {
            alert(error)
        })

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
                    // setBirthday(userData.birthday)

                    if(userData.birthday) {
                      let epochMilliseconds = userData.birthday.seconds * 1000
                      let birthdayTimeStamp = new Date(epochMilliseconds)
                      let actualDate = birthdayTimeStamp.getDate()
                      let actualMonth = birthdayTimeStamp.getMonth()
                      let actualYear = birthdayTimeStamp.getFullYear()
                      let birthdayString = (actualMonth + 1) + '/' + actualDate + '/' + actualYear
                      setBirthday(birthdayString)
                    }

                    console.log("BIRTHDAY: ", birthday);
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
              <Text>LOG OUT</Text>
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
            <TextInput onChangeText={nextValue => setBio(nextValue)}> 
              {bio}
            </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> Email</Text>
            <Text  style={{color:"#8898AA"}}> {email}</Text>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> Birthday</Text>
            {/* <Text  style={{color:"#8898AA"}}> {birthday}</Text> */}
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> Address</Text>
            <TextInput onChangeText={nextValue => setAddress(nextValue)}> 
              {address}
            </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> City</Text>
            <TextInput onChangeText={nextValue => setCity(nextValue)}> 
              {city}
            </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> State</Text>
            <Select
              value={displayStateValue}
              onSelect={index => setSelectedStateIndex(index)}>
              {USStatesProp.map(renderStateOption)}</Select>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> Zip code</Text>
            <TextInput onChangeText={nextValue => setZipCode(nextValue)}> 
              {zipCode}
            </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> Gender</Text>
            {/* <TextInput> {gender} </TextInput> */}

            <Select
              value={displayGenderValue}
              onSelect={index => setSelectedGenderIndex(index)}>
              {genderProp.map(renderGenderOption)}</Select>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}> Sexual Preference</Text>
            {/* <TextInput> both </TextInput> */}
            <Select
              multiSelect={true}
              value={groupDisplayValues.join(', ')}
              selectedIndex={selectedSexualPrefIndex}

              onSelect={index => setSelectedSexualPrefIndex(index)}>
              {sexualPrefProp.map(renderSexualPrefOption)}
            </Select>
          </View>

          {/* Dark Purple: #570CBC
          Light Purple: #A971F4 */}

          <View style={style.Btn}>
            <Text  style={{color:"#570CBC"}}>Preferred Age Range</Text>
            <Text>Age Range: {fromValue} - {toValue}</Text>
              <RangeSlider min={18} max={100}
                  inRangeBarColor={'#5e72e4'}
                  fromKnobColor={'#5e72e4'}
                  toKnobColor={'#5e72e4'}
                  outOfRangeBarColor={'#C8C8C8'}
                  showRangeLabels={false}
                  fromValueOnChange={value => setFromValue(value)}
                  toValueOnChange={value => setToValue(value)}
                  initialFromValue={18}
                  initialToValue={30}
              />
          </View>
        </ScrollView>       
      </View>
    )
}
