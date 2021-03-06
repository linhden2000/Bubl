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

    //Log in with social account container
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
        width: width/1.25, 
    },

    // Traditional Login
    login:{
        backgroundColor: "#F4F5F7",
        alignContent:"flex-end",
        width: width * 0.9, 
        height: height * 0.5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    //Traditional Login inputView
    inputView: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        width: width * 0.8,
        height: width/10,
        marginTop: width/30,
        alignSelf:"center",
        flexDirection: "row",
      },
    icon:{
        textAlign: 'center', 
        alignItems:"center", 
        justifyContent: "center",
        fontSize: width/30, 
        width: width/10,
    },
    
    //Traditional Login textInput
    TextInput: {
        flex: 1,
        alignSelf:"center",
        fontSize: width/30,
    },

    text:{
        marginTop: width/30, 
        textAlignVertical: "center",
        textAlign: "center", 
        fontSize: width/30, 
        color:"#8898AA"
    },

    signUp:{
        marginTop: width/30, 
        textAlignVertical: "center",
        textAlign: "center", 
        fontSize: width/30, 
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
        fontSize: width/30,
        marginLeft: width/15,
        marginTop: width/80,
    },
    authErrorCard: {
        marginHorizontal: 15,
        marginVertical: 5,
    },
    authErrorMsg: {
        fontSize: 13,
        color: '#EC3134',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})