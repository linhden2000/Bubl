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
        width: width,
        height: height * 0.8,
        marginTop: width * 0.4,
      },
      avatar:{
        flex: 1,
      },
      profilePic:{
        alignSelf: "center", 
        borderRadius: 100, 
        marginTop: -width/5.5, 
        width: width/2.5, 
        height: width/2.5, 
        position: "relative",
      },
    
      // Style of each choice
      choice:{
        alignSelf: "center", 
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
        marginTop: width/25,
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
        width: "80%",
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

      messageBtn:{
        //marginHorizontal: width/width,
        height: width/10,
        width: "32%",
        marginTop: width/20,
        backgroundColor: '#5E72E4',
        borderRadius: 10,
        height: width/10,
        alignItems: "center",
        justifyContent: "center",
      },
      interactionBtn:{
       //marginHorizontal: width/15,
        height: width/10,
        width: "32%",
        marginTop: width/20,
        backgroundColor: '#5E72E4',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      },
      moreBtn:{
        //marginHorizontal: width/15,
            height: width/10,
            width: "16%",
            marginTop: width/20,
            backgroundColor: '#5E72E4',
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
        },
      btnOptions: {
        flex: 1,
        flexDirection:"row",
        marginTop: -10,
      }
    
})