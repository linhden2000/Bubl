// Style for message goes here
import { StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: "center",
        marginTop: width/25,
    },

    page:{
      backgroundColor:'white',
      flex : 1,
    },

    navbar:{
      flexDirection: 'row',
      backgroundColor: "#f2f2f2",
      height: 50,
      marginTop: 615,
      backgroundColor: "#F4BCD9"
    },

    logoutBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
    backgroundColor: "#FFFFFF"
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

  avatar: {
    width: width/4.5,
    height: height/10,
    borderRadius: 40,
    marginRight: width/20,
    marginLeft: width/20,
  },

  badgeContainer:{
    backgroundColor: "blue",
    width: width/15,
    height: height/30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor:'white',
    justifyContent: 'center',
    alignItems:'center',
    position:'absolute',
    left: width/4.75,
  },

  badgeText:{
    color:'white',
  },

  rightContainer: {
    flex: 1,
    marginTop: width/25,
    marginRight: width/25
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: width/20,
    marginBottom: width/25,
  },
  text:{
    color: 'grey',
    fontSize: width/25,
  },
})