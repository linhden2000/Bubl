import React, {useState, useEffect} from 'react'
import style from './style';
import { StyleSheet,ScrollView, View, TouchableOpacity} from 'react-native';
import {dashboardCategoryProp} from '../../properties'
import { Button, Card, Text, Tab, TabBar, Divider, Avatar, Icon, Layout, 
        Select, SelectItem, IndexPath, Input, List, ListItem } from '@ui-kitten/components';
import {useFonts, PublicSans_600SemiBold, PublicSans_500Medium, PublicSans_300Light, PublicSans_400Regular} from '@expo-google-fonts/public-sans';
import moment from 'moment'
import AppLoading from 'expo-app-loading';
import { auth, firestore } from '../../firebase/config';


export default function DashboardScreen({navigation}) {
    //Load fonts
    //Source: https://github.com/expo/google-fonts
    let [fontsLoaded] = useFonts ({
      PublicSans_600SemiBold,
      PublicSans_500Medium,
      PublicSans_400Regular,
      PublicSans_300Light,
    });
    //Variables
    const [selectedQuestionTabIndex, setSelectedQuestionTabIndex] = useState(0);
    const [firstClickMyQuestion, setFirstClickMyQuestion] = useState(false);
    const [answer, setAnswer] = useState("");
    const [displayAnswerInputBox, setDisplayAnswerInputBox] = useState(false);
    const [date, setDate] = useState(new Date('01/4/2022'));
    const shouldLoadComponent = (index) => index === selectedIndex;

    //Store myQuestions
    const [myQuestions, setMyQuestions] = useState([]);
    //const myQuestions = [];
    //Grab 'My Questions'
    const fetchMyQuestions = async() => {
      const currentUser = auth?.currentUser
      const uid = currentUser.uid
      const questions = firestore.collection('users').doc(uid).collection('questions');
      const questionsSnapShot = await questions.get();
      questionsSnapShot.forEach(doc => {
        let question = {
          "category" : doc.data().category,
          "postedTime" : doc.data().postedTime,
          "question" : doc.data().question,
          "questionType" : doc.data().questionType,
        }
       // setMyQuestions(oldArray => [...oldArray, question]);
        myQuestions.push(question);
      })
      console.log("TEST BEGIN")
      console.log(myQuestions)
      console.log("TEST END")
    }
    //Dynamically render the list of MyQuesitons
    const renderMyQuestion = (obj) => {
      console.log("yeet")
      console.log(myQuestions)
      
      return(
          <View style={style.shadow}>
            <Card style={style.myQuestionCards}>
            <TouchableOpacity onPress={() => displayAnswers()}>
              <Text style={style.questionContent}>{obj.question}</Text>
              <Divider style={style.myQuestionDivider}/>
              <View style={{flexDirection:"row"}}>
                <Text style={style.myQuestionInfo}>Unread answers: </Text>
                <Text style={style.myQuestionInfo}>15</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={style.myQuestionInfo}>Read answers: </Text>
                <Text style={style.myQuestionInfo}>2</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={style.myQuestionInfo}>Total answers: </Text>
                <Text style={style.myQuestionInfo}>17</Text>
              </View>
              </TouchableOpacity>
            </Card>
          </View>
        );
    };

    useEffect(() => {
      fetchMyQuestions()
    }, [])


    /* 
    Messing around with date.
    var now = moment(date).format('MMMM D, YYYY'); 
    console.log(now)
    console.log(date)
    */

    //Categories Tab
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(new IndexPath(0));
    const displayCategory= dashboardCategoryProp[selectedCategoryIndex.row];
    const renderCategoryOption = (label, key) => (
      <SelectItem key={key} title={label}/>
    );

    //Show/hide tabs
    const [showMyQuestions, setShowMyQuestions] = useState(false); //Display the user's (you) questions
    const [showAllQuestions, setShowAllQuestions] = useState(true); //Display questions from other users
    const tabSelect = (input) => {
      console.log("question button pushed");
      if (input == 0){ //User selects 'Questions' tab
        setShowMyQuestions(false);
        setShowAllQuestions(true);
      }
      else if(input == 1){ //User selects 'My Questions' tab
        setShowMyQuestions(true);
        setShowAllQuestions(false);
        setFirstClickMyQuestion(true);
      }
      setSelectedQuestionTabIndex(input);
    }

    const createQuestion = () => {
      navigation.navigate('CreateQuestions');
    }
    const displayAnswers  = () => {
      navigation.navigate('AnswerDisplay')
    }
    

    const answerQuestion = () => {
      if(displayAnswerInputBox == false)
        setDisplayAnswerInputBox(true);
      else if(displayAnswerInputBox == true)
        setDisplayAnswerInputBox(false);
    }
    const submitAnswer = () => {
      console.log("yeet2")
    }

    if (!fontsLoaded) {
      // return <AppLoading />;
    }
    return (
      <View style={style.mainView}>
        <ScrollView showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[6]}>
          <Text style={style.header} category='h5'>Your Top Matches</Text>
          
          <View style={style.shadow}>
            <Card style={style.matchCards}>
              <View style={{flexDirection:"row"}}>
                  <Avatar style={style.profilePic} source={require('../../../assets/lordFarquad.png')}/>
                  <View >
                    <Text style={style.profileName}>Lord Farquad</Text> 
                    <View style={{flexDirection:"row"}}>
                      <Icon style={[style.chatBubbleIcon, style.matchIcons]} fill='#7f7aff' name='message-circle-outline'/>
                      <Icon style={[style.addPersonIcon, style.matchIcons]} fill='#7f7aff' name='person-add-outline'/>
                      <Icon style={[style.moreVerticalIcon, style.matchIcons]} fill='#7f7aff' name='more-vertical-outline'/>
                    </View>
                  </View>
              </View>
            </Card>
          </View>
          
          <View style={style.shadow}>
            <Card style={style.matchCards}>
              <View style={{flexDirection:"row"}}>
                <Avatar style={style.profilePic} source={require('../../../assets/princeCharming.jpg')}/>
                <View >
                  <Text style={style.profileName}>Prince Charming</Text>
                  <View style={{flexDirection:"row"}}>
                      <Icon style={[style.chatBubbleIcon, style.matchIcons]} fill='#7f7aff' name='message-circle-outline'/>
                      <Icon style={[style.addPersonIcon, style.matchIcons]} fill='#7f7aff' name='person-add-outline'/>
                      <Icon style={[style.moreVerticalIcon, style.matchIcons]} fill='#7f7aff' name='more-vertical-outline'/>
                    </View>
                </View>
              </View>
            </Card>
          </View>

          <View style={style.shadow}>
            <Card style={style.matchCards}>
              <View style={{flexDirection:"row"}}>
                <Avatar style={style.profilePic}source={require('../../../assets/gingerbreadMan.png')}/>
                <View>
                  <Text style={style.profileName}t>Gingerbread Man</Text>
                  <View style={{flexDirection:"row"}}>
                      <Icon style={[style.chatBubbleIcon, style.matchIcons]} fill='#7f7aff' name='message-circle-outline'/>
                      <Icon style={[style.addPersonIcon, style.matchIcons]} fill='#7f7aff' name='person-add-outline'/>
                      <Icon style={[style.moreVerticalIcon, style.matchIcons]} fill='#7f7aff' name='more-vertical-outline'/>
                    </View>
                </View>
              </View>
            </Card>
          </View>

          <View style={style.shadow}>
            <Card style={style.matchCards}>
              <View style={{flexDirection:"row"}}>
                <Avatar style={style.profilePic}source={require('../../../assets/fairyMother.png')}/>
                <View>
                  <Text style={style.profileName}>Fairy Godmother</Text>
                  <View style={{flexDirection:"row"}}>
                      <Icon style={[style.chatBubbleIcon, style.matchIcons]} fill='#7f7aff' name='message-circle-outline'/>
                      <Icon style={[style.addPersonIcon, style.matchIcons]} fill='#7f7aff' name='person-add-outline'/>
                      <Icon style={[style.moreVerticalIcon, style.matchIcons]} fill='#7f7aff' name='more-vertical-outline'/>
                    </View>
                </View>
              </View>
            </Card>
          </View>
            
          <View style={style.shadow}>
            <Card style={style.matchCards}>
              <View style={{flexDirection:"row"}}>
                <Avatar style={style.profilePic}source={require('../../../assets/pussInBoots.png')}/>
                <View >
                  <Text style={style.profileName}>Puss in Boots</Text>
                  <View style={{flexDirection:"row"}}>
                      <Icon style={[style.chatBubbleIcon, style.matchIcons]} fill='#7f7aff' name='message-circle-outline'/>
                      <Icon style={[style.addPersonIcon, style.matchIcons]} fill='#7f7aff' name='person-add-outline'/>
                      <Icon style={[style.moreVerticalIcon, style.matchIcons]} fill='#7f7aff' name='more-vertical-outline'/>
                    </View>
                </View>
              </View>
            </Card>
          </View>
      
          <Card style={style.questionHeaderContainer}>
            <TabBar 
              selectedIndex={selectedQuestionTabIndex}
              shouldLoadComponent={shouldLoadComponent}
              onSelect={index => tabSelect(index)}>
                <Tab title='Questions'></Tab>
                <Tab title='My Questions'></Tab>
            </TabBar>
            {showAllQuestions ? (
              <View>
                <Divider style={style.divider}/>
                <Text style={style.categoryHeader} category='s1'>Categories</Text>
                <Select 
                  style={style.select}
                  value={displayCategory}
                  onSelect={index => setSelectedCategoryIndex(index)}>
                  {dashboardCategoryProp.map(renderCategoryOption)}
                </Select>
              </View>
            ): null}
          </Card>
          {showAllQuestions ? ( //If multiple choice
            <View>
              
              <View style={style.shadow}>
                <Card style={style.questionCards}>
                <TouchableOpacity onPress={() => answerQuestion()}>
                  <View style={{flexDirection:"row"}}>
                    <Icon style={style.questionUserIcon} fill='#7f7aff' name='person-outline'/>
                    <Text style={style.questionUserName}>Anonymous</Text>
                    <Text style={style.questionTimeStamp}>January 4, 2022</Text>
                  </View>
                  <Divider style={style.questionDivider}/>
                  <Text style={style.questionContent}>Are you a dog or a cat person?</Text>
                  </TouchableOpacity>
                  { displayAnswerInputBox ? (
                  <View>
                    <Input
                      style={style.answerBox}
                      multiline={true}
                      textStyle={{ minHeight: 70}}
                      placeholder='Type your answer here...'
                      value={answer}
                      onChangeText={input => setAnswer(input)}
                    />
                    <Button style={style.submitBtn} onPress={() => submitAnswer()}>
                      <Text>Submit Answer</Text>
                    </Button>
                  </View>
                  ): null}
                </Card>
              </View>
              
              <View style={style.shadow}>
                <Card style={style.questionCards}>
                  <View style={{flexDirection:"row"}}>
                    <Icon style={style.questionUserIcon} fill='#7f7aff' name='person-outline'/>
                    <Text style={style.questionUserName}>Anonymous</Text>
                    <Text style={style.questionTimeStamp}>January 4, 2022</Text>
                  </View>
                  <Divider style={style.questionDivider}/>
                  <Text style={style.questionContent}>KU or K-State?</Text>
                </Card>
              </View>
              <View style={style.shadow}>
                <Card style={style.questionCards}>
                  <View style={{flexDirection:"row"}}>
                    <Icon style={style.questionUserIcon} fill='#7f7aff' name='person-outline'/>
                    <Text style={style.questionUserName}>Anonymous</Text>
                    <Text style={style.questionTimeStamp}>January 3, 2022</Text>
                  </View>
                  <Divider style={style.questionDivider}/>
                  <Text style={style.questionContent}>If you could travel anywhere, where would it be?</Text>
                </Card>
              </View>
              <View style={style.shadow}>
                <Card style={style.questionCards}>
                  <View style={{flexDirection:"row"}}>
                    <Icon style={style.questionUserIcon} fill='#7f7aff' name='person-outline'/>
                    <Text style={style.questionUserName}>Anonymous</Text>
                    <Text style={style.questionTimeStamp}>January 2, 2022</Text>
                  </View>
                  <Divider style={style.questionDivider}/>
                  <Text style={style.questionContent}>What is your favorite pizza flavor?</Text>
                </Card>
              </View>
              <View style={style.shadow}>
                <Card style={style.questionCards}>
                  <View style={{flexDirection:"row"}}>
                    <Icon style={style.questionUserIcon} fill='#7f7aff' name='person-outline'/>
                    <Text style={style.questionUserName}>Anonymous</Text>
                    <Text style={style.questionTimeStamp}>January 1, 2022</Text>
                  </View>
                  <Divider style={style.questionDivider}/>
                  <Text style={style.questionContent}>Do you play video games? If so, what is your favorite or currently playing right now?</Text>
                </Card>
              </View>
              <View style={style.shadow}>
                <Card style={style.questionCards}>
                  <View style={{flexDirection:"row"}}>
                    <Icon style={style.questionUserIcon} fill='#7f7aff' name='person-outline'/>
                    <Text style={style.questionUserName}>Anonymous</Text>
                    <Text style={style.questionTimeStamp}>January 1, 2022</Text>
                  </View>
                  <Divider style={style.questionDivider}/>
                  <Text style={style.questionContent}>Are you looking for a long-term relationship or are you only looking for a fling?</Text>
                </Card>
              </View>
              <View style={style.shadow}>
                <Card style={style.questionCards}>
                  <View style={{flexDirection:"row"}}>
                    <Icon style={style.questionUserIcon} fill='#7f7aff' name='person-outline'/>
                    <Text style={style.questionUserName}>Anonymous</Text>
                    <Text style={style.questionTimeStamp}>January 1, 2022</Text>
                  </View>
                  <Divider style={style.questionDivider}/>
                  <Text style={style.questionContent}>Marvel or DC? And who is your favorite characters?</Text>
                </Card>
              </View>
            </View>
          ): null}
          {showMyQuestions &&
          <View>
            <View>
              <Button style={style.postQuestionBtn} onPress={() => createQuestion()}>
                <Text>Post a Question</Text>
              </Button>
            </View>
            <View>
              <Text style={style.timeStamp}>Posted on January 28, 2022</Text>
              <Divider style={style.timeStampDivider}/>
                {myQuestions.map(renderMyQuestion)}
            </View>
          </View>
          }
        </ScrollView>
      </View>
    )
}
