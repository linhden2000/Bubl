import React, { useEffect } from 'react'
import style from './style';
import { Text, View, Image, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import avatar from '../../../assets/shrek.jpg';
import user from '../../../assets/Fiona.png';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, firestore, firebase } from '../../firebase/config';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useState } from 'react';
import {
    // some icons
    faSmile, faImage, faPaperPlane
} from '@fortawesome/free-regular-svg-icons';
import {
    // some icons
    faMicrophone, faInfo, faComments
} from '@fortawesome/free-solid-svg-icons';


export default function ChatScreen({ navigation, route }) {
    // Variables
    const isMe = true;
    const { width, height } = Dimensions.get("screen");
    const [messagesList, setMessagesList] = useState([])
    const [message, setMessage] = useState('')
    const chatroomId = route.params.chatroomId
    const currentUserUID = auth?.currentUser.uid
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion

    // Functions
    const fetchMessages = async (chatroomId) => {
        const chatroomDoc = firestore.collection('chatrooms').doc(chatroomId)
        const messagesCollection = firestore.collection('messages')
        const chatroomSnapshot = await chatroomDoc.get()
        const messagesIds = chatroomSnapshot.data().messagesId
        //  Get all messages ids
        for (let mesId in messagesIds) {
            //  Query all messages
            const mesDoc = await messagesCollection.doc(mesId).get()
            const mesData = {
                mesId: mesDoc.id,
                sentAt: mesDoc.data().sentAt,
                sentBy: mesDoc.data().sentBy,
                content: mesDoc.data().content
            }
            setMessagesList(prevState => [...prevState, mesData])
        }
    }

    // Render Messages
    const renderedMessages = () => {
        return messagesList.map((mes) => {
            return (<View style={{ flexDirection: 'row' }}>
                <Image style={{ alignSelf: "center", marginLeft: 10, borderRadius: 100, width: height / 25, height: height / 25 }} source={user} />
                <LinearGradient
                    colors={['#6DA1FC', '#9795ef', '#FCBACB']}
                    style={[
                        style.container, isMe ? style.leftContainer : style.rightContainer]}>
                    <Text style={{ color: 'white' }}>Hello from the other side</Text>
                </LinearGradient>
            </View>)
        })
    }

    // Fetch chatrooms 
    useEffect(() => {
        fetchMessages(chatroomId)
    })
    const onMessage = () => {
        navigation.navigate('Message')
    }

    const onSend = async () => {
        // Store Message in firestore collection
        const messagesCollection = firestore.collection('messages')
        const storeMessRes = messagesCollection.add({
            chatroomId: chatroomId,
            content: message,
            sentAt: new Date(),
            sentBy: currentUserUID
        })
        firestore
            .collection('chatrooms')
            .doc(chatroomId)
            .update({
                messagesId: arrayUnion(storeMessRes.id)
            })
        setMessage('')
    }

    const handleChangeText = (text) => {
        setMessage(text)
    }

    return (
        <View style={style.page}>
            <View style={style.header}>
                <FontAwesomeIcon icon={faComments} size={20} style={style.icon} onPress={onMessage} />
                <Text style={{ fontSize: 20 }}>Fiona</Text>
                <FontAwesomeIcon icon={faInfo} size={20} style={style.icon} />

            </View>
            <View style={style.box}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ alignSelf: "center", marginLeft: 10, borderRadius: 100, width: height / 25, height: height / 25 }} source={user} />
                    <LinearGradient
                        colors={['#6DA1FC', '#9795ef', '#FCBACB']}
                        style={[
                            style.container, isMe ? style.leftContainer : style.rightContainer]}>
                        <Text style={{ color: 'white' }}>Hello from the other side</Text>
                    </LinearGradient>
                </View>
                {renderedMessages()}
                <View style={style.root}>
                    <View style={style.inputContainer}>
                        <FontAwesomeIcon icon={faSmile} size={25} style={style.icon} />
                        <TextInput style={style.input} onChangeText={(text) => handleChangeText(text)} placeholder="Type a message..." />
                        <FontAwesomeIcon icon={faImage} size={25} style={style.icon} />
                        <FontAwesomeIcon icon={faMicrophone} size={25} style={style.icon} />
                    </View>
                    <LinearGradient
                        colors={['#6DA1FC', '#9795ef', '#FCBACB']}
                        style={style.buttonContainer}>
                        <Text style={style.buttonText}>
                            <FontAwesomeIcon icon={faPaperPlane} size={20} style={style.icon, { color: "white" }} onPress={onMessage} />
                        </Text>
                    </LinearGradient>
                </View>
            </View>
        </View>

    )
}