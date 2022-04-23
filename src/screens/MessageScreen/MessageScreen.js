import React from "react";
import style from "./style";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { auth, firestore } from "../../firebase/config";
import { useState, useEffect } from "react";

export default function MessageScreen({ navigation }) {
  const currentUserUID = auth?.currentUser.uid;
  const [chatroomsList, setChatroomsList] = useState([]);
  
  const fetchChatrooms = async () => {
    const chatroomsCollection = firestore.collection("chatrooms");
    const messagesCollection = firestore.collection("messages");
    const usersCollection = firestore.collection("users");
    const charoomsSnapshot = await chatroomsCollection
      .where("userslist", "array-contains", currentUserUID)
      .get();
    let currentChatrooms = []
    // Get users' top matches
    const userRef = await usersCollection.doc(currentUserUID).get()
    const userTopMatches = userRef.data().topMatches
    for (let chatroom of charoomsSnapshot.docs) {
      // Get last message information
      
      if (chatroom.data().lastMessageId != null) {
        const lastMessageSnapshot = await messagesCollection
          .doc(chatroom.data().lastMessageId)
          .get();
        const lastMessageContent = lastMessageSnapshot.data().content;
        const lastMessageSentAt = lastMessageSnapshot.data().sentAt.toDate().toLocaleDateString("en-US")
                                + " " 
                                + lastMessageSnapshot.data().sentAt.toDate().toLocaleTimeString("en-US");
        // Get partner data
        let partnerId = "";
        const usersList = chatroom.data().userslist;
        const filteredList = usersList.filter((uid) => uid != currentUserUID);
        // If this is a chatroom with the same uid
        if (!filteredList.length) {
          partnerId = currentUserUID;
        } else {
          partnerId = filteredList[0];
        }
        let active = true
        if(!userTopMatches.includes(partnerId)) {
          active = false
        }
        const partnerRef = await usersCollection.doc(partnerId).get();
        const partner = {
          partnerId,
          partnerProfilePic: partnerRef.data().profilePic,
          partnerName: partnerRef.data().firstName,
        };
        // chatroom displayed data
        let chatroomData = {
          chatroomId: chatroom.id,
          lastMessageContent,
          lastMessageSentAt,
          partner,
          active
        };
        currentChatrooms.push(chatroomData)
      }
    }
    setChatroomsList(currentChatrooms)
    console.log(currentChatrooms);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchChatrooms();
      console.log(chatroomsList);
    }
    return () => {
      mounted = false;
    };
  }, []);
  const onChat = (chatroomId, active) => {
    console.log(active);
    if(active) {
      navigation.navigate("Chat", { chatroomId });
    }
    else {
      console.log("The current user is not in your top matches, please add them to top matches to start conversation");
    }
  }
  const renderedChatrooms = () => {
      return chatroomsList.map(chatroom => {
          return <TouchableOpacity key={chatroom.chatroomId} style={style.container} onPress={() => onChat(chatroom.chatroomId, chatroom.active)}>
          <Image
            style={style.avatar}
            source={{uri: chatroom.partner.partnerProfilePic}}
          />
          <View style={style.badgeContainer}>
            <Text style={style.badgeText}>4</Text>
          </View>
          <View style={style.rightContainer}>
            <View style={style.row}>
              <Text style={style.name}> {chatroom.partner.partnerName}</Text>
              <Text style={style.text}>{chatroom.lastMessageSentAt}</Text>
            </View>
            <Text numberOfLines={1} style={style.text}>
              {" "}
              {chatroom.lastMessageContent}
            </Text>
          </View>
        </TouchableOpacity>
      })
  }
  return (
    <View style={style.page}>
      {renderedChatrooms()}
    </View>
  );
}
