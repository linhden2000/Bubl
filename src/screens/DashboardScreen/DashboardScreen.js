import React, {useEffect, useState} from 'react'
import style from './style';
import { StyleSheet,ScrollView, View, TouchableOpacity, FlatList, SnapshotViewIOS } from 'react-native';

import {dashboardCategoryProp} from '../../properties'
import { Button, Card, Text, Tab, TabBar, Divider, Avatar, Icon, Layout, 
        Select, SelectItem, IndexPath, Input, List, ListItem } from '@ui-kitten/components';
import {useFonts, PublicSans_600SemiBold, PublicSans_300Light, PublicSans_400Regular} from '@expo-google-fonts/public-sans';
import moment from 'moment'
import AppLoading from 'expo-app-loading';

import {auth, firestore} from '../../firebase/config';
import { log } from 'react-native-reanimated';
import { LogBox } from 'react-native';

export default function DashboardScreen({navigation}) {
    LogBox.ignoreLogs(['Setting a timer']);
    //Load fonts
    //Source: https://github.com/expo/google-fonts
    let [fontsLoaded] = useFonts ({
      PublicSans_600SemiBold,
      PublicSans_400Regular,
      PublicSans_300Light,
    });
    //Variables
    const [selectedQuestionTabIndex, setSelectedQuestionTabIndex] = useState(0);
    const [firstClickMyQuestion, setFirstClickMyQuestion] = useState(false);
    const [answer, setAnswer] = useState("");
    const [displayAnswerInputBox, setDisplayAnswerInputBox] = useState(false);
    const [date, setDate] = useState(new Date('01/4/2022'));
    const [questionsList, setQuestionsList] = useState([])
    const shouldLoadComponent = (index) => index === selectedIndex;
    const usersRef = firestore.collection('users')
    const currentUserUID = auth?.currentUser.uid
    let sexualPref = ''

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
    }
    //Dynamically render the list of MyQuesitons
    const renderMyQuestion = (obj) => {
      
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
      const unsubscribe = navigation.addListener('focus', () => {
        fetchMyQuestions()
      }) ;
      return unsubscribe;
    },[navigation]);
    

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
    // Fetch user data
    useEffect(() => {
      usersRef
        .doc(currentUserUID)
        .onSnapshot(snapshot =>{
          sexualPref = snapshot.data().sexualPref
        })
    })
    // Listen to the change in category choice
    useEffect(() => {
      let queryGender = ''
      // Query for single sexual preference
      if(sexualPref == 'male' || sexualPref == 'female') {
        if(sexualPref == 'male') {
          queryGender = 'man'
        }
        else{
          queryGender = 'woman'
        }
        usersRef
        .where('gender', '==', queryGender)
        .get()
        .then(snapshot => {
          if(snapshot.empty) {
            console.log("There's no matching profile");
          }
          else {
            snapshot.docs.forEach(doc => {
              const selectedCategory = dashboardCategoryProp[selectedCategoryIndex.row]
              if(selectedCategory == "All") {
                usersRef.doc(doc.data().id).collection('questions')
                        .get()
                        .then(quesList => {
                          quesList.docs.forEach(ques => {
                            let epochMilliseconds = ques.data().postedTime.seconds * 1000
                          let postedTimeStamp = new Date(epochMilliseconds)
                          let actualDate = postedTimeStamp.getDate()
                          let actualMonth = postedTimeStamp.getMonth()
                          let actualYear = postedTimeStamp.getFullYear()
                          let postedTimeString = (actualMonth + 1) + '/' + actualDate + '/' + actualYear
                          const data = {
                            question: ques.data().question,
                            postedTime: postedTimeString 
                          }
                            setQuestionsList(prevState => [...prevState, data])
                          })
                        })
              }
              else {
                usersRef.doc(doc.data().id).collection('questions')
                      .where('category', '==', selectedCategory)
                      .get()
                      .then(quesList => {
                        quesList.docs.forEach(ques => {
                          let epochMilliseconds = ques.data().postedTime.seconds * 1000
                          let postedTimeStamp = new Date(epochMilliseconds)
                          let actualDate = postedTimeStamp.getDate()
                          let actualMonth = postedTimeStamp.getMonth()
                          let actualYear = postedTimeStamp.getFullYear()
                          let postedTimeString = (actualMonth + 1) + '/' + actualDate + '/' + actualYear
                          const data = {
                            question: ques.data().question,
                            postedTime: postedTimeString 
                          }
                          setQuestionsList(prevState => [...prevState, data])
                        })
                      })
                      .catch(err => console.log(err))
              }
            })
          }
        })
        .catch(err => console.log(err))  
      }
      // Query for both sexual preferences
      else{
        usersRef
          .get()
          .then(snapshot => { 
            snapshot.docs.forEach(doc => {
              const selectedCategory = dashboardCategoryProp[selectedCategoryIndex.row]
              if(selectedCategory == "All") {
                usersRef.doc(doc.data().id).collection('questions')
                        .get()
                        .then(quesList => {
                          quesList.docs.forEach(ques => {
                            let epochMilliseconds = ques.data().postedTime.seconds * 1000
                          let postedTimeStamp = new Date(epochMilliseconds)
                          let actualDate = postedTimeStamp.getDate()
                          let actualMonth = postedTimeStamp.getMonth()
                          let actualYear = postedTimeStamp.getFullYear()
                          let postedTimeString = (actualMonth + 1) + '/' + actualDate + '/' + actualYear
                          const data = {
                            question: ques.data().question,
                            postedTime: postedTimeString 
                          }
                            setQuestionsList(prevState => [...prevState, data])
                          })
                        })
              }
              else {
                usersRef.doc(doc.data().id).collection('questions')
                      .where('category', '==', selectedCategory)
                      .get()
                      .then(quesList => {
                        quesList.docs.forEach(ques => {
                          let epochMilliseconds = ques.data().postedTime.seconds * 1000
                          let postedTimeStamp = new Date(epochMilliseconds)
                          let actualDate = postedTimeStamp.getDate()
                          let actualMonth = postedTimeStamp.getMonth()
                          let actualYear = postedTimeStamp.getFullYear()
                          let postedTimeString = (actualMonth + 1) + '/' + actualDate + '/' + actualYear
                          const data = {
                            question: ques.data().question,
                            postedTime: postedTimeString 
                          }
                          setQuestionsList(prevState => [...prevState, data])
                        })
                      })
                      .catch(err => console.log(err))
              }
            })
          })
      }
      const unsubscribe = () => {
        setQuestionsList(prevState => [])
      }
      return unsubscribe
    }, [selectedCategoryIndex])
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

    
    const renderedQuestions = () => {
      return questionsList.map((ques, index) => {
        return (
        <View key={index}>
          <View style={style.shadow}>
            <Card style={style.questionCards}>
            <TouchableOpacity onPress={() => answerQuestion()}>
              <View style={{flexDirection:"row"}}>
                <Icon style={style.questionUserIcon} fill='#7f7aff' name='person-outline'/>
                <Text style={style.questionUserName}>Anonymous</Text>
                <Text style={style.questionTimeStamp}>{ques.postedTime}</Text>
              </View>
              <Divider style={style.questionDivider}/>
              <Text style={style.questionContent}>{ques.question}</Text>
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
        </View>
        )
      })
    } 

    if (!fontsLoaded) {
      return <AppLoading />;
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
          {renderedQuestions()}
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
                
                <View style={style.shadow}>
                  <Card style={style.myQuestionCards}>
                  <TouchableOpacity onPress={() => displayAnswers()}>
                    <Text style={style.questionContent}>What is your favorite food?</Text>
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

            </View>
          </View>
          }
        </ScrollView>
      </View>
    )
}
