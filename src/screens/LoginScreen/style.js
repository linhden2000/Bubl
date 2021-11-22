// style for Login goes here
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    imageBG:{
        flex: 1,
        justifyContent:"center",
        position: "absolute",
        width:width,
        height:height
    },
    box:{
        flex: 1,
        alignContent:"center",
        justifyContent: "space-between",
        position: "absolute",
        backgroundColor:"#FFFFFF",
        width: width * 0.9,
        height: height * 0.8,
        borderRadius: 20,
    },
    logo:{
        flex: 1,
        width: width * 0.9,
        height: height * 0.2,
    },
    social:{
        flex: 2,
        alignSelf:"center",
        justifyContent: "center",
        borderColor: "#8898AA",
        width: width * 0.9, 
        height: height* 0.5,
        borderRadius: 20,
    },
    socialElement:{
        marginTop: width/30,
        alignSelf:"center",
        justifyContent: "center",
        width: width / 1.25, 
    },

    login:{
        backgroundColor: "#F4F5F7",
        //alignSelf:"center",
        alignContent:"flex-end",
        //justifyContent: "flex-end",
        width: width * 0.9, 
        height: height * 0.5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    inputView: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        width: "80%",
        height: width/10,
        marginTop: width/30,
        alignSelf:"center",
        flexDirection: "row",
      },

    TextInput: {
        height: 50,
        flex: 1,
        alignSelf:"center",
        //padding: 10,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 10,
        height: width/10,
        alignItems: "center",
        alignSelf:"center",
        justifyContent: "center",
        marginTop: width/30,
        backgroundColor: '#5E72E4',
  },
  
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},
})