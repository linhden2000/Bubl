import React from 'react'
import style from './style';
import {USStatesProp} from '../../properties'
import { StyleSheet, Text,SafeAreaView, View, Button, TouchableOpacity, ScrollView} from 'react-native'
import { Input, Datepicker, Icon, Card, Avatar, Select, SelectItem, IndexPath } from '@ui-kitten/components';

const CalendarIcon = (props) => (
    <Icon {...props} name='calendar'/>
);
const states= [
    'Kansas',
    'Missouri',
    'Colorado',
];
const statesProp=()=> {
    var tempArr =  USStatesProp.split(',');
    var USStates = []
    tempArr.forEach(element => {
        USStates.push(element.split('-'))
    });
    return USStates;
};

export default function CreateUserScreen({navigation}) {
    //List of variables
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [KUID, setKUID] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [date, setDate] = React.useState(new Date());
    const [gender, setGender] = React.useState('')
    const [genderPreference, setGenderPreference] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [city, setCity] = React.useState('')
    const [zipCode, setZipCode] = React.useState('')

    const [value, setValue] = React.useState('')
    const onLogout = () => {
        navigation.navigate('Registration')
    }
    const onSubmit = () => {
        navigation.navigate('Dashboard')
    }
    
    
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const displayStateValue = states[selectedIndex.row];
    const renderOption = (title) => (
        <SelectItem key="{title}" title={title}/>
    );
    console.log("TESTTZ")
    console.log(statesProp())
    console.log(value)
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
                        date={date}
                        onSelect={nextDate => setDate(nextDate)}
                        accessoryRight={CalendarIcon}
                    />
                </View>
                <View style={style.inputView}>
                    <Input
                        label = 'Gender'
                        placeholder='Place your Text'
                        value={gender}
                        onChangeText={nextValue => setGender(nextValue)}
                    />
                </View>
                <View style={style.inputView}>
                    <Input
                        label = 'Gender Preference'
                        placeholder='Place your Text'
                        value={genderPreference}
                        onChangeText={nextValue => setGenderPreference(nextValue)}
                    />
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
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}>
                    {states.map(renderOption)}
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
