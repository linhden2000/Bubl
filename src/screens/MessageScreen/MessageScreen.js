import React from 'react'
import style from './style';
import { StyleSheet, Text,SafeAreaView, View, TouchableOpacity, Image } from 'react-native'

export default function MessageScreen({navigation}) {
    const onLogout = () => {
        navigation.navigate('Login')
    }
    const onChat = () => {
        navigation.navigate('Chat')
    }
    return (
        <View style={style.page}> 
            <View style={style.container}>
                <Image style={style.avatar} source={require("../../../assets/MickyMouse.png")} />
                <View style={style.badgeContainer}>
                    <Text style={style.badgeText}>4</Text>
                </View>
                <View style={style.rightContainer}>
                    <View style = {style.row}>
                        <Text style={style.name}> Micky Mouse</Text>
                        <Text style={style.text}>11:11 PM</Text>
                    </View>
                    <Text numberOfLines={1} style={style.text}> Hello Shrek. I am missing you so much lalalalallalalalalalal</Text>
                </View>   
            </View>

            <View style={style.container}>
                <Image style={style.avatar} source={require("../../../assets/WillSmith.png")} />
                <View style={style.badgeContainer}>
                    <Text style={style.badgeText}>2</Text>
                </View>
                <View style={style.rightContainer}>
                    <View style = {style.row}>
                        <Text style={style.name}>Will Smith</Text>
                        <Text style={style.text}>Tue</Text>
                    </View>
                    <Text numberOfLines={1} style={style.text}> I am finishing with my work</Text>
                </View>   
            </View>



            <View style={style.container}>
                <Image style={style.avatar} source={require("../../../assets/Leonardo.png")} />
                <View style={style.badgeContainer}>
                    <Text style={style.badgeText}>4</Text>
                </View>
                <View style={style.rightContainer}>
                    <View style = {style.row}>
                        <Text style={style.name}> Leonardo Dicaprio</Text>
                        <Text style={style.text}>Mon</Text>
                    </View>
                    <Text numberOfLines={1} style={style.text}> Shrek, I can't believe</Text>
                </View>   
            </View>


            <View style={style.container}>
                <Image style={style.avatar} source={require("../../../assets/TomCruise.png")} />
                <View style={style.badgeContainer}>
                    <Text style={style.badgeText}>10</Text>
                </View>
                <View style={style.rightContainer}>
                    <View style = {style.row}>
                        <Text style={style.name}> Tom Cruise</Text>
                        <Text style={style.text}>Jan</Text>
                    </View>
                    <Text numberOfLines={1} style={style.text}> Answer my texts pls</Text>
                </View>   
            </View>


            <View style={style.container}>
                <Image style={style.avatar} source={require("../../../assets/Fiona.png")} />
                {/* <View style={style.badgeContainer}>
                    <Text style={style.badgeText}></Text>
                </View> */}
                <View style={style.rightContainer}>
                    <View style = {style.row}>
                        <Text style={style.name}> Fiona</Text>
                        <Text style={style.text}>Jan</Text>
                    </View>
                    <Text numberOfLines={1} style={style.text}> Good night</Text>
                </View>   
            </View>

            {/* <TouchableOpacity style={style.logoutBtn} onPress={onLogout}>
              <Text>LOGOUT</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={style.logoutBtn} onPress={onChat}>
              <Text>CHAT</Text>
            </TouchableOpacity>  */}
        </View>
        
    )
}
