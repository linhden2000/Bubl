import React, {useState, useCallback, useEffect} from 'react'
import style from './style';
import { StyleSheet, Dimensions, Text,SafeAreaView, View, TouchableOpacity, ScrollView, Platform, Image, ImageBackground} from 'react-native'
import { Input, Datepicker, Icon, Card, Avatar, Select, SelectItem, IndexPath, Button} from '@ui-kitten/components';
import avatar from '../../../assets/shrek.jpg';


export default function PublicProfileScreen({navigation}) {
    const { width, height } = Dimensions.get("screen");

    const backToDashboard = () => {
        navigation.navigate('DashboardNavigation');
    }

    return (
        <View style={style.container}>
                <ImageBackground style={style.imageBG} resizeMode="cover" source={require("../../../assets/gradientBackground.png")} />
                {/* White box container */}
                <View style={style.box}>
                    {/* 1. The avatar */}
                    <View style={style.avatar}>
                        <Image style= {style.profilePic} source={avatar} />
                        <Text style={{marginTop: width/20, alignSelf: "center",color:"#8898AA", fontFamily: "OleoScript_400Regular", fontSize: width/20 }}>Shrek The Almighty, 18</Text>
                        <Text style={{marginTop: width/50, alignSelf: "center",color:"#8898AA", fontFamily: "OleoScript_400Regular", fontSize: width/25 }}>San Franciso, CA</Text>
                    </View>
                    <View style={style.btnOptions}>
                        <Button style={style.messageBtn}>
                            <Text >Message</Text>
                        </Button>
                        <Button style={style.interactionBtn}>
                            <Text >Interactions</Text>
                        </Button>
                        <Button style={style.moreBtn}>
                            <Text >...</Text>
                        </Button>
                    </View>
                    {/* 2. Setting Choices */}
                    
                </View>    
            </View>
    )
}

/*
<View style={style.choice}>
                      <TouchableOpacity style={style.inputView}>
                        <Text style={style.TextInput}>My Profile</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={style.inputView}>
                        <Text style={style.TextInput}>Preference</Text>
                      </TouchableOpacity>
                      

                      <TouchableOpacity style={style.logoutBtn} onPress={backToDashboard}>
                        <Text >LOGOUT</Text>
                      </TouchableOpacity>
                      
                    </View>
*/