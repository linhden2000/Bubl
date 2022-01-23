// Style for dashboard goes here
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");
export default StyleSheet.create({

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
    //color: '#FFFFFF',
    padding: 10,
  },
  matchContainer: {
    borderRadius: 20,
  },
  matchCards:{
    marginVertical: 5,
    borderRadius: 35,
    height: height * 0.13,
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
  }
})