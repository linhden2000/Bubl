// Style for message goes here
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
  // White box container
  box:{
    flex: 1,
    backgroundColor:"#FFFFFF",
    width: width * 0.9,
    height: height * 0.8,
    marginTop: width * 0.25,
    borderRadius: 20,
  },
  avatar:{
    flex: 1,
    //marginTop: -width/10,
    width: width * 0.9,
    height: height * 0.3,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  // Style of each choice
  choice:{
    backgroundColor: "#F4F5F7",
    alignContent:"flex-end",
    width: width * 0.9, 
    height: height * 0.51,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  //Choice inputView
  inputView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: width * 0.8,
    height: width/10,
    marginTop: width/22,
    alignSelf:"center",
    flexDirection: "row",
  },

  //Choice textInput
  TextInput: {
    flex: 1,
    alignSelf:"center",
    fontSize: width/30,
    textAlignVertical: "center",
    textAlign: "center",
    color:"#7e27ed",
  },

  text:{
    marginTop: width/30, 
    alignSelf:"center",
    textAlignVertical: "center",
    textAlign: "center",
    justifyContent: "center", 
    fontSize: width/30, 
    color:"#8898AA"
  },

  logoutBtn: {
    width: width/2,
    borderRadius: 10,
    height: width/10,
    alignItems: "center",
    alignSelf:"center",
    justifyContent: "center",
    marginTop: width/20,
    backgroundColor: '#5E72E4',
  },

  errorMsg: {
    color: '#FF0000',
    fontSize: width/30,
  },

  biobox: {
    borderColor: '#FCBACB',
    //borderTopWidth: 1,
    //borderBottomWidth: 1,
    alignItems:'center',
    width: width/1.5,
    position: 'relative',
    alignSelf: "center",
  },
<<<<<<< HEAD
  
=======
>>>>>>> Linh
  //Modal
  modal:{
    backgroundColor: "#ffffff", 
    borderRadius: 10, 
    width:width,
    height: height*0.5,
    padding: height*0.1,
    margin: height*0.1,
    flex: 0.3, 
    justifyContent: "space-evenly",
  },
})