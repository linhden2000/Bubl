import React, { useEffect, useState } from "react";
import style from "./style";
import { View, FlatList, Animated, SectionList } from "react-native";
import ListItem, { Separator } from "react-native-elements";
import { Text, Button, Card, Icon, Divider } from "@ui-kitten/components";
import * as Animatable from 'react-native-animatable';
import {
  useFonts,
  PublicSans_600SemiBold,
  PublicSans_500Medium,
  PublicSans_300Light,
  PublicSans_400Regular,
} from "@expo-google-fonts/public-sans";
import { styles } from "styled-system";
import { auth, firestore, firebase } from "../../firebase/config";
import { Swipeable } from "react-native-gesture-handler";
import { log } from "react-native-reanimated";
import { faIgloo } from "@fortawesome/free-solid-svg-icons";

//Icons
const BackIcon = (props) => <Icon {...props} name="arrow-back-outline" />;

export default function AnswerDisplayScreen({ navigation, route }) {
  //Load fonts
  //Source: https://github.com/expo/google-fonts
  let [fontsLoaded] = useFonts({
    PublicSans_600SemiBold,
    PublicSans_500Medium,
    PublicSans_400Regular,
    PublicSans_300Light,
  });
  // Firebase ArrayUnion and ArrayRemove
  const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
  const arrayRemove = firebase.firestore.FieldValue.arrayRemove;

  const [question, setQuestion] = useState("");
  const [answerList, setAnswerList] = useState([]);
  const [isUserInTopMatches, setUserInTopMatches] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [FullTopMatches, setFullTopMatches] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const uid = auth?.currentUser.uid;
  const qid = route.params.qid;

  const userDoc = firestore.collection("users").doc(uid);

  const fetchQuestion = async () => {
    const questionsCollection = firestore
      .collection("users")
      .doc(uid)
      .collection("questions");
    const questionRef = questionsCollection.doc(qid);
    questionRef.onSnapshot((snapshot) => {
      setQuestion(snapshot.data().question);
    });
  };
  const fetchAnswer = async () => {
    setAnswerList([]);
    const answersCollection = firestore
      .collection("users")
      .doc(uid)
      .collection("questions")
      .doc(qid)
      .collection("answers");
    const answerSnapShot = await answersCollection.get();
    answerSnapShot.forEach((ans) => {
      let answer = {
        id: ans.id,
        content: ans.data().content,
        postedTime: ans.data().postedTime,
        read: ans.data().read,
        replierId: ans.data().replierId,
      };
      setAnswerList((prevState) => [...prevState, answer]);
    });
  };

  useEffect(() => {
    if (navigation.isFocused()) {
      fetchQuestion();
      fetchAnswer();
    }
  }, []);
  const navigateToDashboard = () => {
    navigation.navigate("DashboardNavigation");
  };

  const LeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <View style={style.leftAction}>
        <Animated.Text style={[style.actionText, { transform: [{ scale }] }]}>
          Remove
        </Animated.Text>
      </View>
    );
  };

  const RightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <View style={style.rightAction}>
        <Animated.Text style={[style.actionText, { transform: [{ scale }] }]}>
          Add
        </Animated.Text>
      </View>
    );
  };

  const ListItem = ({ content, onSwipeFromLeft, onSwipeFromRight }) => (
    <Swipeable
      renderLeftActions={LeftActions}
      onSwipeableLeftOpen={onSwipeFromLeft}
      renderRightActions={RightActions}
      onSwipeableRightOpen={onSwipeFromRight}
    >
      <Card style={style.answerCard}>
        <Text>{content}</Text>
      </Card>
    </Swipeable>
  );

  const deleteItem = (index) => {
    const arr = [...answerList];
    arr.splice(index, 1);
    setAnswerList(arr);
  };

  //** Remove Answer from the firestore **//
  async function removeAnswer(index, answerId) {
    const answerDoc = userDoc
          .collection("questions")
          .doc(qid)
          .collection("answers")
          .doc(answerId);
        const deleteAnswerRes = await answerDoc.delete()
        deleteItem(index)
  }
  //** Handle swipe right action **//
  async function handleSwipeRight(index, answerId, replierId) {
    // Check if current user has more than 5 members in top matches
    const userSnapshot = await userDoc.get();
    const topMatchesArray = userSnapshot.data().topMatches;
    // If user doesnt have the topMatches field
    if (topMatchesArray == undefined) {
      const unionRes = await userDoc.update({
        topMatches: arrayUnion(replierId),
      });
      removeAnswer(index, answerId)
      return;
    }
    if (topMatchesArray.includes(replierId)) {
      console.log("This user is already in the top matches");
      setUserInTopMatches(true);
      setAddSuccess(false);
      return;
    } else {
      if (topMatchesArray.length <= 5) {
        //User are not in Top Matches
        setUserInTopMatches(false);
        setAddSuccess(true);
        // Add replierId to the TopMatchesId array in firestore
        const unionRes = await userDoc.update({
          topMatches: arrayUnion(replierId),
        });
        // Remove the liked answer from answerList
        removeAnswer(index, answerId)
      } else {
        setFullTopMatches(true);
      }
    }
  }

  //** Handle swipe left action **//
  async function handleSwipeLeft(index, answerId) {
    const answerDoc = userDoc
      .collection("questions")
      .doc(qid)
      .collection("answers")
      .doc(answerId);
    const deleteRes = await answerDoc.delete();
    deleteItem(index);
    setDeleteSuccess(true);
  }

  if (!fontsLoaded) {
  }

  return (
    <View style={style.mainView}>
      <View>
        <Card style={style.headerCard}>
          <Text style={style.pageTitle} category="S1">
            Answers
          </Text>
          <Button
            style={style.backBtn}
            onPress={navigateToDashboard}
            accessoryLeft={BackIcon}
            appearance="ghost"
          />
        </Card>
      </View>

      <View>
        <Card>
          <View>
            <Text style={style.question}>{question}</Text>
            <Divider />
          </View>
          <FlatList
            data={answerList}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <ListItem
                {...item}
                onSwipeFromLeft={() => handleSwipeLeft(index, item.id)}
                onSwipeFromRight={() =>
                  handleSwipeRight(index, item.id, item.replierId)
                }
              /> 
            )}
          />
          { isUserInTopMatches ?
              <Animatable.Text easing="ease-in-out-expo" style={style.errorMsg} duration={1000}>
                This user is already in the Top Matches
              </Animatable.Text>
                  : <></>
          }
          { FullTopMatches ?
              <Animatable.Text easing="ease-in-out-expo" style={style.errorMsg} duration={1000}>
                Your Top Matches are full. Please remove one to add this new member
              </Animatable.Text>
                  : <></>
          }
          {  addSuccess ?
              <Animatable.Text easing="ease-in-out-expo" style={style.submitMsg} duration={1000}>
                Successfully added
              </Animatable.Text>
                  : <></>
          }
          {  deleteSuccess ?
              <Animatable.Text easing="ease-in-out-expo" style={style.submitMsg} duration={1000}>
                Successfully deleted
              </Animatable.Text>
                  : <></>
          }

        </Card>
      </View>
    </View>
  );
}
