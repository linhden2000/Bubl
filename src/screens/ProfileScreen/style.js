// Style for message goes here
import { StyleSheet } from 'react-native';
export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    navbar:{
      flexDirection: 'row',
      backgroundColor: "#f2f2f2",
      height: 50,
      marginTop: 600,
    },

    logoutBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
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