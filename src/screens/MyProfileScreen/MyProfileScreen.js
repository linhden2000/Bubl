import React from 'react'
import style from './style';
import { Image, Text, TextInput, View, TouchableOpacity, ScrollView, Dimensions, ImageBackground } from 'react-native'
import { Icon, Button} from '@ui-kitten/components';

const { width, height } = Dimensions.get("screen");

export default function ProfileScreen({navigation}) {
    const onLogout = () => {
        navigation.navigate('Login')
    }

    const editIcon = (props) => (
      <Icon {...props} name='edit-outline'/>
    );
    
    return (
      <View style={style.container}>
        <View style={style.profile} >
          <Image style={style.imageBG} resizeMode="cover" source={require("../../../assets/gradientBackground.png")} />
          <View style={{flexDirection: "row", justifyContent: "space-between", width: width* 7/8, marginTop: height/30}}>
            <TouchableOpacity onPress={onLogout}>
              <Text>LOGOUT</Text>
            </TouchableOpacity>
            <Text style={{alignSelf: "center", fontWeight: "bold", fontSize: width/17}}>Edit Profile</Text>
            <TouchableOpacity>
              <Text>SAVE</Text>
            </TouchableOpacity>
          </View>

          
          <View>
            <Image style={{width: width/3, height: height/6, borderRadius: 100, marginTop: width/20}} source={require("../../../assets/profile.png")} />
            <Button style={style.editButton} accessoryLeft={editIcon} status="control" />  
          </View>
          
          {/* <Text style={{marginTop: width/20}}> Change Profile Photo</Text> */}
        </View>

        <ScrollView style={style.content}>
          <View style={style.Btn}>
            <Text style={{color:"#8898AA"}}> First Name</Text>
            <TextInput> Sherk </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Last Name</Text>
            <TextInput> The Musical </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> KU ID</Text>
            <TextInput> 3000000 </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Email</Text>
            <TextInput> happyShrek@gmail.com </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Password</Text>
            <TextInput> ******** </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Birthday</Text>
            <TextInput> 01/01/2001 </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Gender</Text>
            <TextInput> Male </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Preference</Text>
            <TextInput> Male </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Age</Text>
            <TextInput> 100 </TextInput>
          </View>

          <View style={style.Btn}>
            <Text  style={{color:"#8898AA"}}> Address</Text>
            <TextInput> 1 Jayhawk Blvd, Lawrence, KS 66045 </TextInput>
          </View>

        </ScrollView>       
      </View>
    )
}
