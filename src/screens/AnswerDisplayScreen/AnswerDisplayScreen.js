import React, { useEffect, useState } from 'react'
import style from './style';
import { View, FlatList, Animated, SectionList } from 'react-native';
import ListItem, { Separator } from "react-native-elements";
import { Text, Button, Card, Icon, Divider } from '@ui-kitten/components';
import { useFonts, PublicSans_600SemiBold, PublicSans_500Medium, PublicSans_300Light, PublicSans_400Regular } from '@expo-google-fonts/public-sans';
import { styles } from 'styled-system';
import { auth, firestore } from '../../firebase/config';
import { Swipeable } from 'react-native-gesture-handler';

//Icons
const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
);
const answers = [
    { id: "0", text: "Bread" },
    { id: "1", text: "Carrot" },
    { id: "2", text: "Potato Chips" },
    { id: "3", text: "Burger" },
    { id: "4", text: "Soup" },

]

export default function AnswerDisplayScreen({ navigation, route}) {
    const [answerList, setAnswerList] = useState(answers);

    useEffect(() => {
        console.log(route.params.usersId)
    })

    const fetchAnswer = async () => {
        const answersCollection = firestore
            .collection('users')
            .doc(uid)
            .collection('questions')
            .doc(qid)
            .collection('answers')
        const answerSnapShot = await answersCollection.get();
        answerSnapShot.forEach(ans => {
            let answer = {
                "content" : ans.data().content,
                "postedTime": ans.data().postedTime,
                "read": ans.data().read,
                "replierId": ans.data().replierId,
            }
            let updatedAnswerList = [...answerList, answer]
            setAnswerList (updatedAnswerList)
        })
    }

    //Load fonts
    //Source: https://github.com/expo/google-fonts
    let [fontsLoaded] = useFonts({
        PublicSans_600SemiBold,
        PublicSans_500Medium,
        PublicSans_400Regular,
        PublicSans_300Light,
    });

    const navigateToDashboard = () => {
        navigation.navigate('DashboardNavigation');
    }

    const LeftActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        })
        return (
            <View style={style.leftAction}>
                <Animated.Text style={[style.actionText, { transform: [{ scale }] }]}>Remove</Animated.Text>
            </View>
        )
    }

    const RightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        })
        return (
            <View style={style.rightAction}>
                <Animated.Text style={[style.actionText, { transform: [{ scale }] }]}>Add</Animated.Text>
            </View>
        )
    }

    const ListItem = ({ text, onSwipeFromLeft, onSwipeFromRight }) => (
        <Swipeable
            renderLeftActions={LeftActions}
            onSwipeableLeftOpen={onSwipeFromLeft}
            renderRightActions={RightActions}
            onSwipeableRightOpen={onSwipeFromRight}
        >
            <Card style={style.answerCard}>
                <Text>{text}</Text>
            </Card>
        </Swipeable>
    );

    const deleteItem = index => {
        console.log("yeet")
        const arr = [...answerList];
        arr.splice(index, 1);
        setAnswerList(arr);

    }

    if (!fontsLoaded) {
    }

    return (
        <View style={style.mainView}>
            <View>
                <Card style={style.headerCard}>
                    <Text style={style.pageTitle} category='S1'>Answers</Text>
                    <Button style={style.backBtn} onPress={navigateToDashboard}
                        accessoryLeft={BackIcon} appearance='ghost' />
                </Card>
            </View>

            <View>
                <Card>
                    <View>
                        <Text style={style.question}>What is your favorite food?</Text>
                        <Divider />
                    </View>
                    <FlatList
                        data={answerList}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                            <ListItem
                                {...item}
                                onSwipeFromLeft={() => deleteItem(index)}
                                onSwipeFromRight={() => alert("swiped from right!")}
                            />
                        )}
                    />
                </Card>
            </View>

        </View>
    )
}



/*
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
*/