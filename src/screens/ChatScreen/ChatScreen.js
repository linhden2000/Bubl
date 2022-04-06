import React from 'react'
import style from './style';
import { Text, View, Image, Dimensions} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import avatar from '../../../assets/shrek.jpg';
import user from '../../../assets/Fiona.png';
import { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome} from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    // some icons
    faSmile, faImage, faPaperPlane
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
    const { width, height } = Dimensions.get("screen");

    return (
        <View style={style.page}>
            <View style = {style.header}>
                <FontAwesomeIcon icon={faComments} size={20} style={style.icon} onPress={onMessage}/>
                <Text style={{fontSize: 20}}>Fiona</Text>
                <FontAwesomeIcon icon={faInfo} size={20} style={style.icon}/>

            </View>
            <View style={style.box}>
                <View style={{flexDirection: 'row'}}>
                    <Image style= {{alignSelf: "center", marginLeft: 10, borderRadius: 100, width: height/25, height: height/25}} source={user} />
                    <LinearGradient
                        colors={['#6DA1FC','#9795ef', '#FCBACB']} 
                        style={[
                            style.container, isMe ? style.leftContainer : style.rightContainer ]}>
                        <Text style={{color: 'white'}}>Hello from the other side</Text>  
                    </LinearGradient>

                </View>
                
                <View style={{flexDirection: 'row'}}>
                    <View style={[
                    style.container, style.rightContainer ]}>
                        <Text>At least I can say that I've tried</Text>   
                    </View>
                    <Image style= {{alignSelf: "center", marginRight: 10, borderRadius: 100, width: height/25, height: height/25}} source={avatar} />
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Image style= {{alignSelf: "center", marginLeft: 10, borderRadius: 100, width: height/25, height: height/25}} source={user} />
                    <LinearGradient
                        colors={['#6DA1FC','#9795ef', '#FCBACB']} 
                        style={[
                            style.container, isMe ? style.leftContainer : style.rightContainer ]}>
                        <Text style={{color: 'white'}}>To tell you I'm sorry for everything that I've done</Text>  
                    </LinearGradient>
        
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={[
                    style.container, style.rightContainer ]}>
                        <Text>But when I call, you never seem to be home</Text>   
                    </View>
                    <Image style= {{alignSelf: "center", marginRight: 10, borderRadius: 100, width: height/25, height: height/25}} source={avatar} />
                </View>

                <View style={style.root}>
                    <View style={style.inputContainer}>
                        <FontAwesomeIcon icon={faSmile} size={25} style={style.icon}/>
                        <TextInput style={style.input} placeholder="Type a message..."/>
                        <FontAwesomeIcon icon={faImage} size={25} style={style.icon}/>
                        <FontAwesomeIcon icon={faMicrophone} size={25} style={style.icon}/>
                    </View>
                    <LinearGradient
                        colors={['#6DA1FC','#9795ef', '#FCBACB']} 
                        style={style.buttonContainer}>
                        <Text style={style.buttonText}>
                            <FontAwesomeIcon icon={faPaperPlane} size={20} style={style.icon, {color: "white"}} onPress={onMessage}/>
                        </Text>
                    </LinearGradient>
                </View>
            </View>
            
            {/* background-color: #f9c5d1;
background-image: linear-gradient(315deg, #f9c5d1 0%, #9795ef 74%); */}

            

        </View>
        
    )
}