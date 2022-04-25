import React, { useState, useEffect, useRef } from "react";
import style from "./style";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated
} from "react-native";
import { dashboardCategoryProp } from "../../properties";
import {
  Button,
  Card,
  Text,
  Tab,
  TabBar,
  Divider,
  Avatar,
  Icon,
  Select,
  SelectItem,
  IndexPath,
  Input,
} from "@ui-kitten/components";
import {
  useFonts,
  PublicSans_600SemiBold,
  PublicSans_500Medium,
  PublicSans_300Light,
  PublicSans_400Regular,
} from "@expo-google-fonts/public-sans";
import moment from "moment";
import * as Animatable from "react-native-animatable";
import AppLoading from "expo-app-loading";
import { auth, firestore, firebase } from "../../firebase/config";
import { cos, log } from "react-native-reanimated";
import { LogBox } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { top } from "styled-system";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

export default function DashboardScreen({ navigation }) {
  LogBox.ignoreLogs(["Setting a timer"]);
  //Load fonts
  //Source: https://github.com/expo/google-fonts
  let [fontsLoaded] = useFonts({
    PublicSans_600SemiBold,
    PublicSans_500Medium,
    PublicSans_400Regular,
    PublicSans_300Light,
  });
  //Variables
  const [selectedQuestionTabIndex, setSelectedQuestionTabIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [questionsList, setQuestionsList] = useState([]);
  const [topMatches, setTopMatches] = useState([]);
  const [date, setDate] = useState(new Date("01/4/2022"));

  //Notification system
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isValidInput, setValidInput] = useState(false);
  const [determineQuestionState, setQuestionState] = useState(false);

  const [isDeleteTop, setDeleteTop] = useState(false);

  //Store myQuestions
  const [myQuestions, setMyQuestions] = useState([]);
  const [firstClickMyQuestion, setFirstClickMyQuestion] = useState(false);
  const shouldLoadComponent = (index) => index === selectedIndex;
  const usersRef = firestore.collection("users");
  const currentUserUID = auth?.currentUser.uid;
  const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
  let sexualPref = "";
  const arrayRemove = firebase.firestore.FieldValue.arrayRemove;

  /* 
    Messing around with date.
    var now = moment(date).format('MMMM D, YYYY'); 
    console.log(now)
    console.log(date)
    */

  //Categories Tab
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(
    new IndexPath(0)
  );
  const displayCategory = dashboardCategoryProp[selectedCategoryIndex.row];
  const renderCategoryOption = (label, key) => (
    <SelectItem key={key} title={label} />
  );

  //** Fetch 'Top Matches' **//
  const fetchTopMatches = async () => {
    const usersCollection = firestore.collection("users");
    const userDoc = usersCollection.doc(currentUserUID);
    userDoc.onSnapshot(async (snapshot) => {
      const topMatches = snapshot.data().topMatches;
      // Get other users data in top matches array
      let currentTopMatches = [];
      for (const match of topMatches) {
        const matchSnapshot = await usersCollection.doc(match).get();
        const matchData = {
          matchId: matchSnapshot.id,
          matchName: matchSnapshot.data().firstName,
          matchImg: matchSnapshot.data().profilePic,
        };
        currentTopMatches.push(matchData);
      }
      setTopMatches(currentTopMatches);
    });
  };
  //** Delete user from Top Matches**/
  const deleteTopMatches = async (matchId) => {
    const usersCollection = firestore.collection("users");
    const userDoc = usersCollection.doc(currentUserUID);
    await userDoc.update({
      topMatches: arrayRemove(matchId),
    });
    const updatedTopMatches = topMatches.filter(
      (match) => match.matchId !== matchId
    );
    setTopMatches(updatedTopMatches);
    setDeleteTop(true);
    fadeIn();
    setTimeout(fadeOut, 2000);
  };

  //** Fetch 'My Questions' **//
  const fetchMyQuestions = async () => {
    const currentUser = auth?.currentUser;
    const uid = currentUser.uid;
    const questions = firestore
      .collection("users")
      .doc(uid)
      .collection("questions");
    const currentQuestions = [];
    const questionsSnapShot = await questions.get();
    questionsSnapShot.forEach((doc) => {
      let question = {
        questionId: doc.id,
        category: doc.data().category,
        postedTime: doc.data().postedTime,
        question: doc.data().question,
        questionType: doc.data().questionType,
      };
      currentQuestions.push(question);
    });
    setMyQuestions(currentQuestions);
  };

  //Dynamically render the list of MyQuesitons
  const renderMyQuestion = (obj, index) => {
    return (
      <View style={style.shadow} key={obj.questionId}>
        <Card style={style.myQuestionCards}>
          <TouchableOpacity onPress={() => displayAnswers(obj.questionId)}>
            <Text style={style.questionContent}>{obj.question}</Text>
            <Divider style={style.myQuestionDivider} />
            <View style={{ flexDirection: "row" }}>
              <Text style={style.myQuestionInfo}>Unread answers: </Text>
              <Text style={style.myQuestionInfo}>15</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={style.myQuestionInfo}>Read answers: </Text>
              <Text style={style.myQuestionInfo}>2</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={style.myQuestionInfo}>Total answers: </Text>
              <Text style={style.myQuestionInfo}>17</Text>
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchTopMatches();
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchMyQuestions();
    }
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch user data
  useEffect(() => {
    usersRef.doc(currentUserUID).onSnapshot((snapshot) => {
      sexualPref = snapshot.data().sexualPref;
    });
  });
  // Listen to the change in category choice
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let queryGender = "";
      // Query for single sexual preference
      if (sexualPref == "male" || sexualPref == "female") {
        if (sexualPref == "male") {
          queryGender = "man";
        } else {
          queryGender = "woman";
        }
        usersRef
          .where("gender", "==", queryGender)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              console.log("There's no matching profile");
            } else {
              snapshot.docs.forEach((doc) => {
                const selectedCategory =
                  dashboardCategoryProp[selectedCategoryIndex.row];
                if (selectedCategory == "All") {
                  usersRef
                    .doc(doc.data().id)
                    .collection("questions")
                    .get()
                    .then((quesList) => {
                      quesList.docs.forEach((ques) => {
                        let epochMilliseconds =
                          ques.data().postedTime.seconds * 1000;
                        let postedTimeStamp = new Date(epochMilliseconds);
                        let actualDate = postedTimeStamp.getDate();
                        let actualMonth = postedTimeStamp.getMonth();
                        let actualYear = postedTimeStamp.getFullYear();
                        let postedTimeString =
                          actualMonth + 1 + "/" + actualDate + "/" + actualYear;
                        const data = {
                          questionId: ques.id,
                          question: ques.data().question,
                          postedTime: postedTimeString,
                          displayAnswerInputBox: false,
                          postedBy: doc.data().id,
                        };
                        setQuestionsList((prevState) => [...prevState, data]);
                      });
                    });
                } else {
                  usersRef
                    .doc(doc.data().id)
                    .collection("questions")
                    .where("category", "==", selectedCategory)
                    .get()
                    .then((quesList) => {
                      quesList.docs.forEach((ques) => {
                        let epochMilliseconds =
                          ques.data().postedTime.seconds * 1000;
                        let postedTimeStamp = new Date(epochMilliseconds);
                        let actualDate = postedTimeStamp.getDate();
                        let actualMonth = postedTimeStamp.getMonth();
                        let actualYear = postedTimeStamp.getFullYear();
                        let postedTimeString =
                          actualMonth + 1 + "/" + actualDate + "/" + actualYear;
                        const data = {
                          questionId: ques.id,
                          question: ques.data().question,
                          postedTime: postedTimeString,
                          displayAnswerInputBox: false,
                          postedBy: doc.data().id,
                        };
                        setQuestionsList((prevState) => [...prevState, data]);
                      });
                    })
                    .catch((err) => console.log(err));
                }
              });
            }
          })
          .catch((err) => console.log(err));
      }
      // Query for both sexual preferences
      else {
        usersRef.get().then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const selectedCategory =
              dashboardCategoryProp[selectedCategoryIndex.row];
            if (selectedCategory == "All") {
              usersRef
                .doc(doc.data().id)
                .collection("questions")
                .get()
                .then((quesList) => {
                  quesList.docs.forEach((ques) => {
                    let epochMilliseconds =
                      ques.data().postedTime.seconds * 1000;
                    let postedTimeStamp = new Date(epochMilliseconds);
                    let actualDate = postedTimeStamp.getDate();
                    let actualMonth = postedTimeStamp.getMonth();
                    let actualYear = postedTimeStamp.getFullYear();
                    let postedTimeString =
                      actualMonth + 1 + "/" + actualDate + "/" + actualYear;
                    const data = {
                      questionId: ques.id,
                      question: ques.data().question,
                      postedTime: postedTimeString,
                      displayAnswerInputBox: false,
                      postedBy: doc.data().id,
                    };
                    setQuestionsList((prevState) => [...prevState, data]);
                  });
                });
            } else {
              usersRef
                .doc(doc.data().id)
                .collection("questions")
                .where("category", "==", selectedCategory)
                .get()
                .then((quesList) => {
                  quesList.docs.forEach((ques) => {
                    let epochMilliseconds =
                      ques.data().postedTime.seconds * 1000;
                    let postedTimeStamp = new Date(epochMilliseconds);
                    let actualDate = postedTimeStamp.getDate();
                    let actualMonth = postedTimeStamp.getMonth();
                    let actualYear = postedTimeStamp.getFullYear();
                    let postedTimeString =
                      actualMonth + 1 + "/" + actualDate + "/" + actualYear;
                    const data = {
                      questionId: ques.id,
                      question: ques.data().question,
                      postedTime: postedTimeString,
                      displayAnswerInputBox: false,
                      postedBy: doc.data().id,
                    };
                    setQuestionsList((prevState) => [...prevState, data]);
                  });
                })
                .catch((err) => console.log(err));
            }
          });
        });
      }
    }

    return () => {
      mounted = false;
    };
  }, [selectedCategoryIndex]);
  //Show/hide tabs
  const [showMyQuestions, setShowMyQuestions] = useState(false); //Display the user's (you) questions
  const [showAllQuestions, setShowAllQuestions] = useState(true); //Display questions from other users
  const tabSelect = (input) => {
    if (input == 0) {
      //User selects 'Questions' tab
      setShowMyQuestions(false);
      setShowAllQuestions(true);
    } else if (input == 1) {
      //User selects 'My Questions' tab
      setShowMyQuestions(true);
      setShowAllQuestions(false);
      setFirstClickMyQuestion(true);
    }
    setSelectedQuestionTabIndex(input);
  };

  const createQuestion = () => {
    navigation.navigate("CreateQuestions");
  };

  const displayAnswers = (qid) => {
    navigation.navigate("AnswerDisplay", { qid });
  };

  //** Toggle the submit answer form  **//
  const answerQuestion = (index) => {
    const updatedQuesionList = questionsList.map((ques, mapIndex) => {
      return mapIndex == index
        ? { ...ques, displayAnswerInputBox: !ques.displayAnswerInputBox }
        : { ...ques };
    });
    setQuestionsList(updatedQuesionList);
  };

  //** Submit answer to database **//
  const submitAnswer = (index) => {
    const postedById = questionsList[index].postedBy;
    const questionId = questionsList[index].questionId;
    const questionDoc = usersRef
      .doc(postedById)
      .collection("questions")
      .doc(questionId);
    questionDoc.collection("answers").add({
      replierId: currentUserUID,
      content: answer,
      postedTime: new Date(),
      read: false,
    });
    //User cannot submit a blank answer
    if(answer == ""){
      setValidInput(false);
      setQuestionState(true);
    }
    //User successful submit question
    else {
      setSubmitSuccess(true);
      setValidInput(true);
      setQuestionState(false);
    }
    fadeIn();
    setTimeout(fadeOut, 2000);
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn=()=>{
    Animated.timing(fadeAnim, {
        toValue:1,
        duration:2000,
        useNativeDriver: true,
    }).start();
}
const fadeOut = () => {
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 4000,
    useNativeDriver: true,
  }).start();
};


  //** render suggested Questions **//
  const renderedQuestions = () => {
    return questionsList.map((ques, index) => {
      return (
        <View key={ques.questionId}>
          <View style={style.shadow}>
            <Card style={style.questionCards}>
              <TouchableOpacity onPress={() => answerQuestion(index)}>
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    style={style.questionUserIcon}
                    fill="#7f7aff"
                    name="person-outline"
                  />
                  <Text style={style.questionUserName}>Anonymous</Text>
                  <Text style={style.questionTimeStamp}>{ques.postedTime}</Text>
                </View>
                <Divider style={style.questionDivider} />
                <Text style={style.questionContent}>{ques.question}</Text>
              </TouchableOpacity>
              {ques.displayAnswerInputBox ? (
                <View>
                  <Input
                    style={style.answerBox}
                    multiline={true}
                    textStyle={{ minHeight: 70 }}
                    placeholder="Type your answer here..."
                    value={answer}
                    onChangeText={(input) => setAnswer(input)}
                  />
                  <Button
                    style={style.submitBtn}
                    onPress={() => submitAnswer(index)}
                  >
                    <Text>Submit Answer</Text>
                  </Button>
                    { !isValidInput && determineQuestionState ?
                      <Animatable.View easing="ease-in-out-expo" style={{opacity:fadeAnim}} duration={50}>
                        
                        <Text style={style.errorMsg}>Submit Answer unsuccessfully
                          </Text>
                      </Animatable.View>
                      : <></>
                    }
                    { isValidInput && !determineQuestionState ?
                    <Animatable.View easing="ease-in-out-expo" style={{opacity:fadeAnim}} duration={50}>
                        
                      <Text style={style.submitMsg}>Submit Answer successfully
                        </Text>
                    </Animatable.View>
                      
                      : <></>
                      
                    }
                </View>
              ) : null}
            </Card>
          </View>
        </View>
      );
    });
  };
  //** Navigate to the chat screen **//
  const onChat = async (partnerId) => {
    // Query for chatroom that has the partner
    const chatroomsCollection = firestore.collection("chatrooms");
    const chatroomSnapshot = await chatroomsCollection.get();
    // First create chatroom
    if (!chatroomSnapshot.size) {
      const newChatroom = await chatroomsCollection.add({
        userslist: [currentUserUID, partnerId],
        lastMessageId: null,
        messagesId: [],
        emptyChat: true,
      });
      navigation.navigate("Chat", { chatroomId: newChatroom.id });
      return;
    }

    const chatroomRef = await chatroomsCollection
      .where("userslist", "array-contains", currentUserUID)
      .get();
    // If user does not have a chatroom
    if (chatroomRef.empty) {
      // Create chatroom
      const newChatroom = await chatroomsCollection.add({
        userslist: [currentUserUID, partnerId],
        lastMessageId: null,
        messagesId: [],
        emptyChat: true,
      });
      console.log(currentUserUID + " does not have a chatroom");
      navigation.navigate("Chat", { chatroomId: newChatroom.id });
      return;
    } else {
      // If user has multiple chatrooms
      let chatroomExists = false;
      chatroomRef.forEach((doc) => {
        // If the chatroom between the two users does exist
        const usersList = doc.data().userslist;
        if (usersList.includes(partnerId)) {
          console.log(doc.id);
          console.log("Chatroom exists");
          navigation.navigate("Chat", { chatroomId: doc.id });
          chatroomExists = true;
          return;
        }
      });
      // If not create a new chatroom for 2 users
      if (!chatroomExists) {
        console.log("Creat chatroom for 2 users");
        const newChatroom = await chatroomsCollection.add({
          userslist: [currentUserUID, partnerId],
          lastMessageId: null,
          messagesId: [],
          emptyChat: true,
        });
        navigation.navigate("Chat", { chatroomId: newChatroom.id });
        return;
      }
    }
  };
  
  //Modal
  const [modalVisible, setModalVisible] = useState(false);
  //** render Top Matches **//
  const renderedTopMatches = () => {
    return topMatches.length == 0 ? 
    
    <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, alignSelf: "center" }}>No one iteresting?</Text> 
    </View>
    : topMatches.map(match => {
      return (
      <View key={match.id} style={style.shadow}>
        <Card style={style.matchCards}>
          <View style={{ flexDirection: "row" }}>
            <Avatar
              style={style.profilePic}
              source={{ uri: match.matchImg }}
            />
          <View>
            <Text style={style.profileName}>{match.matchName}</Text>
            <View style={{ flexDirection: "row", marginTop: -30 }}>
              <Icon
                style={[style.chatBubbleIcon, style.matchIcons]}
                fill="#7f7aff"
                name="message-circle-outline"
                onPress={() => onChat(match.matchId)}
              />
              <Icon
                style={[style.deletePersonIcon, style.matchIcons]}
                fill="#7f7aff"
                name="person-delete-outline"
                onPress={() => deleteTopMatches(match.matchId)}
              />
              <Icon
                style={[style.moreVerticalIcon, style.matchIcons]}
                fill="#7f7aff"
                name="more-vertical-outline"
                onPress={() => setModalVisible(true)}
              />
                    <Modal transparent={true} visible={modalVisible}>
                      <View
                        style={{
                          backgroundColor: "#000000aa",
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View style={style.modal}>
                          <Text style={{ fontSize: 30, alignSelf: "center" }}>
                            Report
                          </Text>
                          <Text style={{ fontSize: 15, alignSelf: "center" }}>
                            I'm concerning about this user
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ backgroundColor: "red" }}>
                              Report
                            </Text>
                            <Pressable
                              onPress={() => setModalVisible(!modalVisible)}
                              style={{
                                backgroundColor: "lightblue",
                                alignSelf: "center",
                              }}
                            >
                              <Text>Close</Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </Modal>
                    
                  </View>
                </View>
              </View>
            </Card>
        </View>
        );
      })
  };

  if (!fontsLoaded) {
    // return <AppLoading />
  }
  return (
    <ScrollView style={style.mainView}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[6]}
      >
        <Text style={style.header} category="h5">
          Your Top Matches
        </Text>

        {renderedTopMatches()}
        { isDeleteTop ?
            <Animatable.View easing="ease-in-out-expo" style={{opacity:fadeAnim}}  duration={1000}>
              <Text style={style.submitMsg}>Top Match is deleted successfully</Text>
              
            </Animatable.View>
            : <></>
          }

        <Card style={style.questionHeaderContainer}>
          <TabBar
            selectedIndex={selectedQuestionTabIndex}
            shouldLoadComponent={shouldLoadComponent}
            onSelect={(index) => tabSelect(index)}
          >
            <Tab title="Questions"></Tab>
            <Tab title="My Questions"></Tab>
          </TabBar>
          {showAllQuestions ? (
            <View>
              <Divider style={style.divider} />
              <Text style={style.categoryHeader} category="s1">
                Categories
              </Text>
              <Select
                style={style.select}
                value={displayCategory}
                onSelect={(index) => setSelectedCategoryIndex(index)}
              >
                {dashboardCategoryProp.map(renderCategoryOption)}
              </Select>
              {renderedQuestions()}
            </View>
          ) : null}
        </Card>
        {showMyQuestions && (
          <View>
            <View>
              <Button
                style={style.postQuestionBtn}
                onPress={() => createQuestion()}
              >
                <Text>Post a Question</Text>
              </Button>
            </View>
            <View>
              <Text style={style.timeStamp}>Posted on January 28, 2022</Text>
              <Divider style={style.timeStampDivider} />
              {myQuestions.map((ques, index) => renderMyQuestion(ques, index))}
            </View>
          </View>
        )}
      </ScrollView>
    </ScrollView>
  );
}
