// Style for dashboard goes here
import { StyleSheet, Dimensions } from 'react-native';
import { flex } from 'styled-system';
const { width, height } = Dimensions.get("screen");
export default StyleSheet.create({
  mainView:{
    backgroundColor: '#FFFFFF',
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
    // fontFamily: "PublicSans_600SemiBold",
  },
  matchContainer: {
    borderRadius: 20,
  },
  shadow:{
    backgroundColor: '#FFFFFF',
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
    // fontFamily: "PublicSans_600SemiBold",
    marginVertical: 2,
  },
  divider:{
    marginVertical: 10,
  },
  profilePic:{
    width: width*0.25,
    height: width*0.25,
  },
  profileName:{
    fontSize: width*.07,
    alignContent: 'center',
    marginLeft: width *0.05,
    marginTop: width *0.04,
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
    marginTop: height * 0.06,
  },
  chatBubbleIcon: {
    marginLeft: width *0.05,
    marginTop: height * 0.01,
    
  },
  deletePersonIcon: {
    marginLeft: width *0.13,
    marginTop: height * 0.01,
  },
  moreVerticalIcon: {
    marginLeft: width *0.13,
    marginTop: height * 0.01,
  },
  //Modal
  modal:{
    backgroundColor: "#ffffff", 
    borderRadius: 10, 
    width:width*0.75,
    height: height*0.5,
    padding: height*0.1,
    margin: height*0.1,
    flex: 0.3, 
    justifyContent: "space-evenly",
  },
  //Question Cards
  questionTimeStamp: {
    color: "#878787",
    // fontFamily: "PublicSans_300Light",
    marginTop: height*0.005,
    marginBottom: height*0.01,
    marginLeft: width*0.3,
    fontSize: 12,
  },
  questionCards:{
    //borderRadius: 15,
    marginVertical: 5,
  },
  questionContent:{
    // fontFamily: "PublicSans_500Medium",
    fontSize: height * 0.025,
    marginTop: height * 0.009,
  },
  questionUserIcon:{
    width: width * 0.07,
    height: width * 0.07,
  },
  questionUserName:{
    color: "#878787",
    // fontFamily: "PublicSans_300Light",
    marginTop: height*0.005,
    marginBottom: height*0.01,
    marginLeft: width*0.02,
  },
  questionDivider:{
    backgroundColor: '#d6d6d6',
    width: width * 0.85,
    marginVertical: height*0.005,
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
  
  //My Questions
  timeStamp:{
    alignSelf:"center",
    marginTop: 20,
    // fontFamily: "PublicSans_300Light",
  },
  timeStampDivider: {
    width: width*0.9,
    alignSelf: "center",
    backgroundColor: "#c4c4c4",
    marginVertical: 10,
  },
  myQuestionCards:{
    alignSelf: "center",
    marginVertical: 5,
    width: width * 0.9,
  },
  myQuestionDivider:{
    marginVertical: 8,
  },
  myQuestionInfo: {
    // fontFamily: "PublicSans_300Light",
  },

  //Answering questions
  answerBox: {
    marginVertical: 15,
  },
  submitBtn:{
      width: "80%",
      borderRadius: 10,
      height: width/10,
      alignItems: "center",
      alignSelf:"center",
      justifyContent: "center",
      marginTop: width/30,
      backgroundColor: '#55c242',
      borderColor: 'transparent',
  },
  
})