// Style for dashboard goes here
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");
export default StyleSheet.create({
  mainView:{
    backgroundColor: '#FFFFFF',
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
    //color: "#5c5c5c",
    fontFamily: "PublicSans_600SemiBold",
  },
  matchContainer: {
    borderRadius: 20,
  },
  shadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
    backgroundColor: '#bababa',
    width: width * 0.5,
    marginLeft: width *0.05,
  },
  matchIcons:{
    width: width * 0.07,
    height: width * 0.07,
  },
  chatBubbleIcon: {
    marginLeft: width *0.05,
    marginTop: height * 0.01,
    
  },
  addPersonIcon: {
    marginLeft: width *0.13,
    marginTop: height * 0.01,
  },
  moreVerticalIcon: {
    marginLeft: width *0.13,
    marginTop: height * 0.01,
  },
  
})