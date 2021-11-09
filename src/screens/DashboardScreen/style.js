// Style for dashboard goes here
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
    backgroundColor: "#f2f2f2",
    height: 50,
    marginTop: 600,
    backgroundColor: "#F4BCD9"
  },

  logoutBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FFFFFF",
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