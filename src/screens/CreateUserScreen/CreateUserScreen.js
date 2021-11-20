import React, {useState} from 'react'
import style from './style';
import {USStatesProp, genderProp, sexualPrefProp} from '../../properties'
import { StyleSheet, Text,SafeAreaView, View, Button, TouchableOpacity, ScrollView} from 'react-native'
import { Input, Datepicker, Icon, Card, Avatar, Select, SelectItem, IndexPath } from '@ui-kitten/components';


const CalendarIcon = (props) => (
    <Icon {...props} name='calendar'/>
);
export default function CreateUserScreen({navigation}){
    //Navigation
    const onLogout = () => {
        navigation.navigate('Registration');
    }
    const onSubmit = () => {
        navigation.navigate('Dashboard');
    }

    //List of user input data
    // The following are inputted to input fields
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [KUID, setKUID] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    //The following code is for the user birthday (datepicker)
    const [date, setDate] = useState(new Date());
    const now = new Date();
    const minDatePicker = new Date(now.getFullYear() - 100, now.getMonth(), now.getDate()); //max age: 100 years old
    const maxDatePicker = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());  //min age: 18 years old
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
  
    // ******* Render input fields and drop downs ******///
    return (
        <View style={style.form}>
            <ScrollView>
            <View style={style.profilePicContainer}>
                <Avatar source={require("../../../assets/shrek.jpg")} 
                style={style.profilePic}/>
            </View>
            <Card style={style.card}>
            <View style={style.container}>
                <View style={style.inputView}>
                    <Input
                        label = 'First Name'
                        placeholder='Place your Text'
                        value={firstName}
                        onChangeText={nextValue => setFirstName(nextValue)}
                    />    
                </View>
                <View style={style.inputView}>
                    <Input
                        label = 'Last Name'
                        placeholder='Place your Text'
                        value={lastName}
                        onChangeText={nextValue => setLastName(nextValue)}
                    />
                </View>
                <View style={style.inputView}>
                    <Input
                        label = 'KU ID'
                        placeholder='Place your Text'
                        value={KUID}
                        onChangeText={nextValue => setKUID(nextValue)}
                    />
                </View>
                <View style={style.inputView}>
                    <Input
                        label = 'Email'
                        placeholder='Place your Text'
                        value={email}
                        onChangeText={nextValue => setEmail(nextValue)}
                    />
                </View>
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
                    <Input
                        label = 'Address'
                        placeholder='Place your Text'
                        value={address}
                        onChangeText={nextValue => setAddress(nextValue)}
                    />
                </View>
                <View style={style.inputView}>
                    <Input
                        label = 'City'
                        placeholder='Place your Text'
                        value={city}
                        onChangeText={nextValue => setCity(nextValue)}
                    />
                </View>
                <View style={style.inputView}>
                    <Input
                        label = 'Zip Code'
                        placeholder='Place your Text'
                        value={zipCode}
                        onChangeText={nextValue => setZipCode(nextValue)}
                    />
                </View>
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
Gender
Age
Location
Dating Preferences (Age, Age Range)
Top 5 matches and relevant matches afterwards
Personalized User questions/answers
*/
