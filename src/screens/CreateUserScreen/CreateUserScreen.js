import React, {useState, useCallback, useEffect} from 'react'
import style from './style';
import {USStatesProp, genderProp, sexualPrefProp} from '../../properties'
import { StyleSheet, Text,SafeAreaView, View, TouchableOpacity, ScrollView, Platform, Image, ImageBackground} from 'react-native'
import { Input, Datepicker, Icon, Card, Avatar, Select, SelectItem, IndexPath, Button} from '@ui-kitten/components';
import RangeSlider from 'react-native-range-slider-expo';
import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable'; //validation animation


const CalendarIcon = (props) => (
    <Icon {...props} name='calendar'/>
);
const editIcon = (props) => (
    <Icon {...props} name='edit-outline'/>
);
export default function CreateUserScreen({navigation}){
    //List of user input data
    // The following are inputted to input fields
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [KUID, setKUID] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);
    const [value, setValue] = useState(0);
    //The following code is for the user birthday (datepicker)
    const [date, setDate] = useState(new Date());
    const now = new Date();
    const minDatePicker = new Date(now.getFullYear() - 100, now.getMonth(), now.getDate()); //max age: 100 years old
    const maxDatePicker = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());  //min age: 18 years old
    //Validation
    const [isValidFirstName, setValidFirstName] = useState(true)
    const [isValidLastName, setValidLastName] = useState(true)
    const [isValidKUID, setValidKUID] = useState(true)
    const [isValidEmail, setValidEmail] = useState(true)
    const [isValidAddress, setValidAddress] = useState(true)
    const [isValidCity, setValidCity] = useState(true)
    const [isValidZipCode, setValidZipCode] = useState(true)
    //Navigation
    const onLogout = () => {
        navigation.navigate('Registration');
    }
    // Submit User Information
    const onSubmit = () => {
        navigation.navigate('DashboardNavigation');
        console.log(firstName)
        console.log(lastName);
        console.log(KUID);
        console.log(email);
        console.log(address);
        console.log(city);
        console.log(zipCode);
        console.log(fromValue);
        console.log(toValue);
        console.log(date);
    }
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
    //** Image Picker - Allows users to upload image from their device as their profile pic**/
    //Source: https://docs.expo.dev/versions/latest/sdk/imagepicker/
    const [profilePic, setImage] = useState("../../../assets/shrek.jpg");
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if(status !== 'granted'){
                    alert('Sorry, this app requires your permission to access cameral roll.');
                }
            }
        })();
    }, []);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, //allow image uploads only
            allowEditing: false,
            aspect: [4,3],
            quality: 1,
        })
        console.log(result);
        if(!result.cancelled) {
            setImage(result.uri);
        }
    };
    //Validation
    //When the user clicks out of the text box it will warn the user that the text input is required
    const handleFirstNameChange = (val) => {
        if( val.trim().length > 0 ) {
            setValidFirstName(true)
        } else {
            setValidFirstName(false)
        }
    }    
    const handleLastNameChange= (val) => {
        if( val.trim().length > 0 ) {
            setValidLastName(true)
        } else {
            setValidLastName(false)
        }
    }
    const handleKUIDChange = (val) => {
        if( val.trim().length > 0 ) {
            setValidKUID(true)
        } else {
            setValidKUID(false)
        }
    }
    const handleEmailChange = (val) => {
        if( val.trim().length > 0 ) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
    }
    const handleAdressChange = (val) => {
        if( val.trim().length > 0 ) {
            setValidAddress(true)
        } else {
            setValidAddress(false)
        }
    }
    const handleCityChange = (val) => {
        if( val.trim().length > 0 ) {
            setValidCity(true)
        } else {
            setValidCity(false)
        }
    }
    const handleZipCodeChange = (val) => {
        if( val.trim().length > 0 ) {
            setValidZipCode(true)
        } else {
            setValidZipCode(false)
        }
    }
    // ******* Render input fields and drop downs ******///
    return (
        <View style={style.form}>
            <ImageBackground style={style.imageBG} resizeMode="cover" source={require("../../../assets/gradientBackground.png")} />
            <ScrollView>
            <View style={style.profilePicContainer}>
                <Avatar source={{ uri: profilePic }} style={{ width: 200, height: 200 }} 
                style={style.profilePic}/>
                <Button style={style.editButton} status="control" accessoryLeft={editIcon}
                onPress={pickImage}/> 
            </View>
            <Card style={style.card}>
            <View style={style.container}>
                <View style={style.inputView}>
                    <Input
                        label = 'First Name'
                        placeholder='Place your Text'
                        value={firstName}
                        onChangeText={nextValue => setFirstName(nextValue)}
                        onEndEditing={text=>handleFirstNameChange(text.nativeEvent.text)}
                    />    
                </View>
                { isValidFirstName ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={style.errorMsg}>First Name is required .</Text>
                        </Animatable.View>
                }
                <View style={style.inputView}>
                    <Input
                        label = 'Last Name'
                        placeholder='Place your Text'
                        value={lastName}
                        onChangeText={nextValue => setLastName(nextValue)}
                        onEndEditing={text=>handleLastNameChange(text.nativeEvent.text)}
                    />
                </View>
                { isValidLastName ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={style.errorMsg}>Last Name is required .</Text>
                        </Animatable.View>
                }
                <View style={style.inputView}>
                    <Input
                        label = 'KU ID'
                        placeholder='Place your Text'
                        value={KUID}
                        onChangeText={nextValue => setKUID(nextValue)}
                        onEndEditing={text=>handleKUIDChange(text.nativeEvent.text)}
                    />
                </View>
                { isValidKUID ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={style.errorMsg}>KU ID is required .</Text>
                        </Animatable.View>
                }
                <View style={style.inputView}>
                    <Input
                        label = 'Email'
                        placeholder='Place your Text'
                        value={email}
                        onChangeText={nextValue => setEmail(nextValue)}
                        onEndEditing={text=>handleEmailChange(text.nativeEvent.text)}
                    />
                </View>
                { isValidEmail ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={style.errorMsg}>Email is required .</Text>
                        </Animatable.View>
                }
                <View style={style.inputView}>
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
                <View style={style.inputView}>
                    <Select
                        label="Gender"
                        style={style.select}
                        placeholder='Default'

                        value={displayGenderValue}
                        onSelect={index => setSelectedGenderIndex(index)}>
                        {genderProp.map(renderGenderOption)}
                    </Select>
                </View>
                <View style={style.inputView}>
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
                <View style={style.inputView}>
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
                <View style={style.inputView}>
                    <Input
                        label = 'Address'
                        placeholder='Place your Text'
                        value={address}
                        onChangeText={nextValue => setAddress(nextValue)}
                        onEndEditing={text=>handleAdressChange(text.nativeEvent.text)}
                    />
                </View>
                { isValidAddress ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={style.errorMsg}>Adress is required .</Text>
                        </Animatable.View>
                }
                <View style={style.inputView}>
                    <Input
                        label = 'City'
                        placeholder='Place your Text'
                        value={city}
                        onChangeText={nextValue => setCity(nextValue)}
                        onEndEditing={text=>handleCityChange(text.nativeEvent.text)}
                    />
                </View>
                { isValidCity ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={style.errorMsg}>City is required .</Text>
                        </Animatable.View>
                }
                <View style={style.inputView}>
                    <Input
                        label = 'Zip Code'
                        placeholder='Place your Text'
                        value={zipCode}
                        onChangeText={nextValue => setZipCode(nextValue)}
                        onEndEditing={text=>handleZipCodeChange(text.nativeEvent.text)}

                    />
                </View>
                { isValidZipCode ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={style.errorMsg}>Zip Code is required .</Text>
                        </Animatable.View>
                }
                <View style={style.inputView}>
                <Select
                    label="States"
                    style={style.select}
                    placeholder='Default'

                    value={displayStateValue}
                    onSelect={index => setSelectedStateIndex(index)}>
                    {USStatesProp.map(renderStateOption)}
                </Select>
                </View>
                <TouchableOpacity style={style.submitBtn} onPress={onSubmit}>
                    <Text>Submit</Text>
                </TouchableOpacity>   
            </View>
            </Card>
            </ScrollView>
        </View>
        
    )
}
/*
User Image
First Name
Last Name
Email
KU ID
Sexual Orientation
Age Range Preference
Gender
Age
Location
Dating Preferences (Age, Age Range)
Top 5 matches and relevant matches afterwards
Personalized User questions/answers
*/
