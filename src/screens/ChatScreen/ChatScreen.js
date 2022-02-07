import React from 'react'
import style from './style';
import { StyleSheet,Text,SafeAreaView, View, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome} from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    // some icons
    faSmile, faImage
    } from '@fortawesome/free-regular-svg-icons';
    import {
        // some icons
        faMicrophone, faInfo, faComments
        } from '@fortawesome/free-solid-svg-icons';

export default function ChatScreen({navigation}) {
    const onMessage = () => {
        navigation.navigate('Message')
    }
    const isMe = true;

    return (
        <View style={style.page}>
            <View style = {style.header}>
                <FontAwesomeIcon icon={faComments} size={20} style={style.icon} onPress={onMessage}/>
                <Text style={{fontSize: 20}}>Fiona</Text>
                <FontAwesomeIcon icon={faInfo} size={20} style={style.icon}/>

            </View>
            <View style={style.box}>
                <View style={[
                style.container, isMe ? style.leftContainer : style.rightContainer ]}>
                    <Text style={{color: 'white'}}>Hello from the other side</Text>   
                </View>

                <View style={[
                style.container, style.rightContainer ]}>
                    <Text>I must've called a thousand times</Text>   
                </View>

                <View style={[
                style.container, isMe ? style.leftContainer : style.rightContainer ]}>
                    <Text style={{color: 'white'}}>To tell you I'm sorry for everything that I've done</Text>   
                </View>

                <View style={[
                style.container, style.rightContainer ]}>
                    <Text>But when I call, you never seem to be home</Text>   
                </View>

                <View style={style.root}>
                    <View style={style.inputContainer}>
                        <FontAwesomeIcon icon={faSmile} size={25} style={style.icon}/>
                        
                        <TextInput style={style.input} placeholder="Signal message..."/>

                        <FontAwesomeIcon icon={faImage} size={25} style={style.icon}/>
                        <FontAwesomeIcon icon={faMicrophone} size={25} style={style.icon}/>
                    </View>
                    <View style={style.buttonContainer}>
                        <Text style={style.buttonText}>+</Text>
                    </View>
                </View>
            </View>
            
            

            

        </View>
        
    )
}