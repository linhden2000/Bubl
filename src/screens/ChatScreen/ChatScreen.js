import React, { useEffect } from "react";
import style from "./style";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import avatar from "../../../assets/shrek.jpg";
import user from "../../../assets/Fiona.png";
import { LinearGradient } from "expo-linear-gradient";
import { auth, firestore, firebase } from "../../firebase/config";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import {
  // some icons
  faSmile,
  faImage,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import {
  // some icons
  faMicrophone,
  faInfo,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "react-native-vector-icons"

export default function ChatScreen({ navigation, route }) {
  // Variables
  const isMe = true;
  const { width, height } = Dimensions.get("screen");
  const [messagesList, setMessagesList] = useState([]);
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [partnerInfo, setPartnerInfo] = useState({});
  const chatroomId = route.params.chatroomId;
  const currentUserUID = auth?.currentUser.uid;
  const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

  // Functions
  //** Get users **//
  const fetchUsers = async () => {
    const usersCollection = firestore.collection("users");
    const chatroomsCollection = firestore.collection("chatrooms");
    // Current user info
    const currentUserSnapshot = await usersCollection.doc(currentUserUID).get();
    const userData = {
      username: currentUserSnapshot.data().firstName,
      userProfilePic: currentUserSnapshot.data().profilePic,
    };
    setUserInfo(userData);

    // Partner Info
    const chatroomSnapshot = await chatroomsCollection.doc(chatroomId).get();
    const usersList = chatroomSnapshot.data().userslist;
    const filtered = usersList.filter(
      (partnerId) => partnerId != currentUserUID
    );

    let partnerData = {};
    if (!filtered.length) {
      partnerData = userData;
    } else {
      const partnerId = filtered[0];
      const partnerSnapshot = await usersCollection.doc(partnerId).get();
      partnerData = {
        username: partnerSnapshot.data().firstName,
        partnerProfilePic: partnerSnapshot.data().profilePic,
      };
    }
    setUserInfo(userData);
    setPartnerInfo(partnerData);
  };

  //** Get all the messages **//
  const fetchMessages = async () => {
    const messagesCollection = firestore.collection("messages");
    const chatroomDoc = firestore.collection("chatrooms").doc(chatroomId);
    const chatroomSnapshot = await chatroomDoc.get();
    const messagesList = chatroomSnapshot.data().messagesId;
    for (let mes of messagesList) {
      //Get every message
      const mesDoc = messagesCollection.doc(mes);
      const mesSnapshot = await mesDoc.get();
      const mesData = {
        mesId: mesSnapshot.id,
        content: mesSnapshot.data().content,
        sentAt: mesSnapshot.data().sentAt,
        sentBy: mesSnapshot.data().sentBy,
      };
      setMessagesList((prevState) => [...prevState, mesData]);
    }
  };

  // Render Messages
  const renderedMessages = () => {
    return messagesList.map((mes) => {
      return (
        <View key={mes.mesId} style={{ flexDirection: "row" }}>
          <Image
            style={{
              alignSelf: "center",
              marginLeft: 10,
              borderRadius: 100,
              width: height / 25,
              height: height / 25,
            }}
            source={{
              uri:
                mes.sentBy == currentUserUID
                  ? userInfo.userProfilePic
                  : partnerInfo.partnerProfilePic,
            }}
          />
          <View
            colors={["#6DA1FC", "#9795ef", "#FCBACB"]}
            style={[
              style.container,
              mes.sentBy == currentUserUID
                ? style.leftContainer
                : style.rightContainer,
            ]}
          >
            <Text style={{ color: "white" }}>{mes.content}</Text>
          </View>
        </View>
      );
    });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchUsers();
    }
    return () => {
      mounted = false;
    };
  }, []);
  // Fetch chatrooms
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchMessages(chatroomId);
    }
    return () => {
      mounted = false;
    };
  }, []);

  const onMessage = () => {
    navigation.navigate("Message");
  };

  // Send Messages
  const onSend = async () => {
    // Store Message in firestore collection
    const messagesCollection = firestore.collection("messages");
    const messageData = {
      chatroomId: chatroomId,
      content: message,
      sentAt: new Date(),
      sentBy: currentUserUID,
    };
    const storeMessRes = await messagesCollection.add(messageData);
    await firestore
      .collection("chatrooms")
      .doc(chatroomId)
      .update({
        messagesId: arrayUnion(storeMessRes.id),
        lastMessageId: storeMessRes.id,
      });

    setMessage("");
    setMessagesList((prevState) => [...prevState, messageData]);
  };

  const handleChangeText = (text) => {
    setMessage(text);
  };

  return (
    <View style={style.page}>
      <View style={style.header}>
        <FontAwesomeIcon
          icon={faComments}
          size={20}
          style={style.icon}
          onPress={onMessage}
        />
        <Text style={{ fontSize: 20 }}>{partnerInfo.username}</Text>
        <FontAwesomeIcon icon={faInfo} size={20} style={style.icon} />
      </View>
      <View style={style.box}>
        {renderedMessages()}
        <View style={style.root}>
          <View style={style.inputContainer}>
            <FontAwesomeIcon icon={faSmile} size={25} style={style.icon} />
            <TextInput
              style={style.input}
              onChangeText={(text) => handleChangeText(text)}
              placeholder="Type a message..."
            />
            <FontAwesomeIcon icon={faImage} size={25} style={style.icon} />
            <FontAwesomeIcon icon={faMicrophone} size={25} style={style.icon} />
          </View>

          <LinearGradient
            colors={["#6DA1FC", "#9795ef", "#FCBACB"]}
            style={style.buttonContainer}
          >
            <Text style={style.buttonText}>
              <FontAwesomeIcon
                icon={faPaperPlane}
                size={20}
                style={style.icon}
                onPress={() => onSend()}
              />
            </Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}
