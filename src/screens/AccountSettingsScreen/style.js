// Style for message goes here
import { StyleSheet } from 'react-native';
export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F4BCD9"
    },

    navbar:{
      flexDirection: 'row',
      backgroundColor: "#F4BCD9",
      height: 50,
      marginTop: 50,
    },

    content: {
      marginTop: 20,
      flex: 1,
      //alignItems: "center",
      justifyContent: "center",

    },

  topic:{
    left: -40,
    fontSize: 20
  },

  text:{
    fontSize: 30,
    alignItems: "center",
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