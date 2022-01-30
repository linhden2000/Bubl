// style for Registration goes here
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
      flex: 1,
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
    marginTop: 15,
    marginBottom: 20,
  },

  interactiveBoxes: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F4F5F7",
    justifyContent:"space-evenly",
    width: width * 0.9, 
    height: height * 0.55,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  entryBoxes: {
    height: height * 0.25,
    justifyContent:"space-evenly",

  },

  buttonBoxes: {
    height: height * 0.2,
    justifyContent:"space-evenly",
  },

  imageBG: {
    flex: 1,
    justifyContent:"center",
    position: "absolute",
    width:width,
    height:height
  },

  whiteBox: {
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
    marginLeft: 20,
    fontSize: 15,
  },

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