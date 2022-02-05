import React, {useState} from 'react'
import style from './style';
import { StyleSheet,ScrollView, View, TouchableOpacity } from 'react-native';
import {dashboardCategoryProp} from '../../properties'
import { Button, Card, Text, Tab, TabBar, Divider, Avatar, Icon, Layout, 
        Select, SelectItem, IndexPath, List, ListItem } from '@ui-kitten/components';
import {useFonts, PublicSans_600SemiBold, PublicSans_500Medium, PublicSans_300Light, PublicSans_400Regular} from '@expo-google-fonts/public-sans';
import AppLoading from 'expo-app-loading';
import {auth} from '../../firebase/config';


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
    const shouldLoadComponent = (index) => index === selectedIndex;

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
      //Bug: automatically firing if user clicks on 'My Questions' tab.
      navigation.navigate('CreateQuestions');
    }
    const answerQuestion = () => {
      console.log("yeet")
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
            <Card style={style.matchCards} onPress={() => answerQuestion()}>
              <View style={{flexDirection:"row"}}>
                  <Avatar style={style.profilePic} source={require('../../../assets/lordFarquad.png')}/>
                  <View style={{flexDirection:"col"}}>
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
                <View style={{flexDirection:"col"}}>
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
                <View style={{flexDirection:"col"}}>
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
                <View style={{flexDirection:"col"}}>
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
                <View style={{flexDirection:"col"}}>
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
          {/* <Text>Hello {auth?.currentUser.email}</Text>  */}
          <Card style={style.questionHeaderContainer}>
            <TabBar 
              selectedIndex={selectedQuestionTabIndex}
              shouldLoadComponent={shouldLoadComponent}
              onSelect={index => tabSelect(index)}>
                <Tab title='Questions'></Tab>
                <Tab title='My Questions'></Tab>
            </TabBar>

            {
            }{showAllQuestions ? (
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
          
          {
            }{showAllQuestions ? ( //If multiple choice
            <View>
              <View style={style.shadow}>
                <Card style={style.questionCards}>
                  <View style={{flexDirection:"row"}}>
                    <Icon style={style.questionUserIcon} fill='#7f7aff' name='person-outline'/>
                    <Text style={style.questionUserName}>Anonymous</Text>
                  </View>
                  <Divider style={style.questionDivider}/>
                  <Text style={style.questionContent}>Are you a dog or a cat person?</Text>
                </Card>
              </View>
              <View style={style.shadow}>
                <Card style={style.questionCards}>
                  <View style={{flexDirection:"row"}}>
                    <Icon style={style.questionUserIcon} fill='#7f7aff' name='person-outline'/>
                    <Text style={style.questionUserName}>Anonymous</Text>
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
                  </View>
                  <Divider style={style.questionDivider}/>
                  <Text style={style.questionContent}>Marvel or DC? And who is your favorite characters?</Text>
                </Card>
              </View>
            </View>
          ): null}

          {
            }{showMyQuestions ? (
          <View>
            <View>
              <Button style={style.postQuestionBtn} onPress={createQuestion()}>
                <Text>Post a Question</Text>
              </Button>
            </View>
            <View>
              <Text style={style.timeStamp}>Posted on January 28, 2022</Text>
              <Divider style={style.timeStampDivider}/>
              <View style={style.shadow}>
                <Card style={style.myQuestionCards}>
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
                </Card>
              </View>
              <View style={style.shadow}>
                <Card style={style.myQuestionCards}>
                  <Text style={style.questionContent}>What is your all time favorite horror movie?</Text>
                  <Divider style={style.myQuestionDivider}/>
                  <View style={{flexDirection:"row"}}>
                    <Text style={style.myQuestionInfo}>Unread answers: </Text>
                    <Text style={style.myQuestionInfo}>3</Text>
                  </View>
                  <View style={{flexDirection:"row"}}>
                    <Text style={style.myQuestionInfo}>Read answers: </Text>
                    <Text style={style.myQuestionInfo}>2</Text>
                  </View>
                  <View style={{flexDirection:"row"}}>
                    <Text style={style.myQuestionInfo}>Total answers: </Text>
                    <Text style={style.myQuestionInfo}>5</Text>
                  </View>
                </Card>
              </View>
            </View>
          </View>
          ): null}
        </ScrollView>
      </View>
    )
}



