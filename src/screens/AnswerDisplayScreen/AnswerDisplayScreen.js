import React, {useState} from 'react'
import style from './style';
import {View} from 'react-native';
import {Text, Button, Card, Icon, Divider} from '@ui-kitten/components';
import {useFonts, PublicSans_600SemiBold, PublicSans_500Medium, PublicSans_300Light, PublicSans_400Regular} from '@expo-google-fonts/public-sans';

//Icons
const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline'/>
);

export default function AnswerDisplayScreen({navigation}) {
    //Load fonts
    //Source: https://github.com/expo/google-fonts
    let [fontsLoaded] = useFonts ({
        PublicSans_600SemiBold,
        PublicSans_500Medium,
        PublicSans_400Regular,
        PublicSans_300Light,
    });

    const navigateToDashboard = () => {
        navigation.navigate('DashboardNavigation');
    }

    if (!fontsLoaded) {
    }

    return (
        <View style={style.mainView}>

            <View>
                <Card style={style.headerCard}>
                <Text style={style.pageTitle} category='S1'>Answers</Text>
                <Button style={style.backBtn} onPress={navigateToDashboard} 
                        accessoryLeft={BackIcon} appearance='ghost'/>
                </Card>
            </View>

            <View>
                <Card>
                    <View>
                        <Text style={style.question}>What is your favorite food?</Text>
                        <Divider/>
                    </View>
                    <View>
                        <Card style={style.answerCard}>
                            <Text>Bread</Text>
                        </Card>
                        <Card style={style.answerCard}>
                            <Text>Carrot</Text>
                        </Card>
                        <Card style={style.answerCard}>
                            <Text>Potato Chips</Text>
                        </Card>
                        <Card style={style.answerCard}>
                            <Text>Burger</Text>
                        </Card>
                        <Card style={style.answerCard}>
                            <Text>Soup</Text>
                        </Card>
                    </View>
                </Card>
            </View>

        </View>
    )
}