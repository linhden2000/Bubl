// Style for dashboard goes here
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");
export default StyleSheet.create({
  mainView:{
    //backgroundColor: '#FFFFFF',
  },
  postQuestionBtn: {
    width: "80%",
    borderRadius: 10,
    height: width/10,
    alignItems: "center",
    alignSelf:"center",
    justifyContent: "center",
    marginTop: width/30,
    backgroundColor: '#5E72E4',
  },
  imageBG:{
    flex: 1,
    justifyContent:"center",
    position: "absolute",
    width:width,
    height:height
  },
  header: {
    padding: 10,
  },
  matchContainer: {
    borderRadius: 20,
  },
  matchCards:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 40,
  },
  questionHeaderContainer:{
  
  },
  categoryHeader:{
    marginVertical: 10,
  },
  divider:{
    marginVertical: 10,
  },
  questionCards:{
    borderRadius: 15,
    marginVertical: 5,
    height: height * 0.13,
  },
  profilePic:{
    width: width*0.25,
    height: width*0.25,
  },
  profileName:{
    fontSize: 20,
    alignContent: 'center',
    marginLeft: width *0.05,
    //marginLeft: width *0.15,
  },
  pointsLabel: {
    marginTop: height * 0.02,
    marginLeft: width *0.05,
  },
  profileDivider: {
    backgroundColor: '#7f7aff',
    width: width * 0.5,
  },
  chatBubbleIcon: {
    marginLeft: width *0.05,
    marginTop: height * 0.01,
    width: width * 0.08,
    height: width * 0.08,
  }
})