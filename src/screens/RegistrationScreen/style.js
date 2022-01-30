// style for Registration goes here
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#9678b6",
      alignItems: "center",
      justifyContent: "center",
  },

  logo: {
    flex: 1,
    width: width * 0.9,
    height: height * 0.2,
  },


  textLogo: {
    marginTop: -width/5,
    alignSelf: "center",
    color:"#8898AA",
    fontFamily: "OleoScript_400Regular",
    fontSize: width/10,
  },

  textDescription: {
    alignSelf: "center",
    color:"#8898AA",
    fontFamily: "OleoScript_400Regular",
    fontSize: width/20,
    marginTop: 20,
  },

  interactiveBoxes: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F4F5F7",
    justifyContent:"space-evenly",
    width: width * 0.9, 
    height: height * 0.6,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  entryBoxes: {
    marginTop: width/30,
  },

  buttonBoxes: {

  },

  imageBG: {
    flex: 1,
    justifyContent:"center",
    position: "absolute",
    width:width,
    height:height
  },

  whiteBox: {
    // flex: 1,
    display: "flex",
    alignContent:"center",
    justifyContent: "space-between",
    position: "absolute",
    backgroundColor:"#FFFFFF",
    justifyContent:"flex-end",
    justifyContent:"space-evenly",
    width: width * 0.9, 
    height: height * 0.8,
    borderRadius: 20,
  },
    
  logo:{
    alignItems: "center",
  },

  inputView:{
    width: "80%",
    borderRadius: 10,
    height: width/10,
    alignItems: "center",
    alignSelf:"center",
    justifyContent: "center",
    marginTop: width/30,
    backgroundColor: "#FFC0CB",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    //marginTop: width/30,
    marginLeft: 20,
    //backgroundColor: "red"
  },

  // forgot_button: {
    // height: 30,
    // marginBottom: 30,
  // },

  signUpBtn: {
    width: "80%",
    borderRadius: 10,
    height: width/10,
    alignItems: "center",
    alignSelf:"center",
    justifyContent: "center",
    marginTop: width/30,
    backgroundColor: '#5E72E4',
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
})