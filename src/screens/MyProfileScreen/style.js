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

    profile:{
      flex: 0.5,
      width: width,
      height: height/3,
      //marginTop: height/20,
      // borderRadius: 100,
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

    editButton: {
      position: "absolute",
      marginTop: width/3,
      marginLeft: 90,
      borderRadius: 20,
      borderColor: "#bdbdbd",
      width: 5,
      height: 5,
      // backgroundColor: "red",
    },

    content: {
      flex: 2,
      // alignItems: "center",
      // justifyContent: "center",
      //marginTop: height/20,
    },

    Btn: {
      marginTop: 10,
      width: width*7/8,
      height: height/15,
      textAlign: "left",
      justifyContent: "center",
      // backgroundColor: "#FFFFFF",
      borderBottomColor: 'black',
      borderBottomWidth: 1,
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
})