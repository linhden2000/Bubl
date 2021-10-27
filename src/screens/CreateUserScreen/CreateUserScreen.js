import React from 'react'
import style from './style';
import { StyleSheet, Text,SafeAreaView, View, Button, TouchableOpacity } from 'react-native'
import { Input, Datepicker, Icon, Layout } from '@ui-kitten/components';

const CalendarIcon = (props) => (
    <Icon {...props} name='calendar'/>
  );

export default function CreateUserScreen({navigation}) {
    const onLogout = () => {
        navigation.navigate('Registration')
    }
    const onSubmit = () => {
        navigation.navigate('Dashboard')
    }
    const [value, setValue] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    return (
        <View style={style.container}>
            <View style={style.inputView}>
                <Input
                    label = 'First Name'
                    placeholder='Place your Text'
                    value={value}
                    onChangeText={nextValue => setValue(nextValue)}
                />
            </View>
            <View style={style.inputView}>
                <Input
                    label = 'Last Name'
                    placeholder='Place your Text'
                    value={value}
                    onChangeText={nextValue => setValue(nextValue)}
                />
            </View>
            <Datepicker
                label='Birthday'
                placeholder='Pick Date'
                date={date}
                onSelect={nextDate => setDate(nextDate)}
                accessoryRight={CalendarIcon}
            />
            <View style={style.inputView}>
                <Input
                    label = 'Birthday'
                    placeholder='Place your Text'
                    value={value}
                    onChangeText={nextValue => setValue(nextValue)}
                />
            </View>
            <TouchableOpacity style={style.logoutBtn} onPress={onSubmit}>
                <Text>Submit</Text>
            </TouchableOpacity>   
        </View>
        
    )
}
/*
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
