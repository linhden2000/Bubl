// Style for message goes here
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff", 
        alignItems: "center",
        justifyContent: "space-between",
    },

    navbar:{
      flexDirection: 'row',
      backgroundColor: "#F4BCD9",
      height: 50,
      marginTop: 50,
    },

    profile:{
      flex: 0.5,
      width: width,
      height: height/3,
      alignItems:"center",
      //backgroundColor: "red",
    },

    imageBG:{
      flex: 1,
      justifyContent:"center",
      position: "absolute",
      width:width,
      height:height/3.3
    },

    avatar: {
      justifyContent: "flex-end",
    },

    editButton: {
      position: "absolute",
      alignSelf: "flex-end",
      borderRadius: 20,
      borderColor: "#bdbdbd",
      width: width/20,
      height: width/20,
    },

    content: {
      flex: 2,
    },

    customerServiceMsg: {
      marginTop: 10,
      width: width*7/8,
      height: height/15,
      textAlign: "left",
      justifyContent: "center",
      fontSize: 11,
      color:"#570CBC",
    },

    Btn: {
      marginTop: 10,
      width: width*7/8,
      height: height/15,
      textAlign: "left",
      justifyContent: "center",
      // backgroundColor: "#FFFFFF",
      //borderBottomColor: 'black',
      //borderBottomWidth: 1,
  },

  text:{
    left: 30, fontSize: 20
  },

  messageBtn: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },

  homeBtn: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },

  profileBtn: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },

  slider: {
    paddingTop: 10,
    paddingBottom: 1,
    width: width*7/8,
    textAlign: "left",
    justifyContent: "center",
    color:'#8898AA',
    
  }
})