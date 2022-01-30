import React, {useState} from 'react'
import style from './style';
import { StyleSheet,ScrollView, View, TouchableOpacity } from 'react-native';
import {categoryProp} from '../../properties'
import { Button, Card, Text, Tab, TabBar, Divider, Avatar, Icon, Layout, 
        Select, SelectItem, IndexPath } from '@ui-kitten/components';
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
    const shouldLoadComponent = (index) => index === selectedIndex;

    //Categories Tab
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(new IndexPath(0));
    const displayCategory= categoryProp[selectedCategoryIndex.row];
    const renderCategoryOption = (label, key) => (
      <SelectItem key={key} title={label}/>
    );

    //Show/hide tabs
    const [showMyQuestions, setShowMyQuestions] = useState(false); //Display the user's (you) questions
    const [showAllQuestions, setShowAllQuestions] = useState(false); //Display questions from other users
    const createQuestion = (input) => {
      console.log("question button pushed");
      if (input == 0){ //User selects 'Questions' tab
        setShowMyQuestions(false);
        setShowAllQuestions(true);
      }
      else if(input == 1){ //User selects 'My Questions' tab
        setShowMyQuestions(true);
        setShowAllQuestions(false);
      }
      setSelectedQuestionTabIndex(input);
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
                  <View style={{flexDirection:"col"}}>
                    <Text style={style.profileName}>Lord Farquad</Text> 
                    <Divider style={style.profileDivider}/>
                    <Text style={style.pointsLabel}>Points: 100</Text>
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
                  <Divider style={style.profileDivider}/>
                  <Text style={style.pointsLabel}>Points: 80</Text>
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
                  <Divider style={style.profileDivider}/>
                  <Text style={style.pointsLabel}>Points: 60</Text>
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
                  <Divider style={style.profileDivider}/>
                  <Text style={style.pointsLabel}>Points: 50</Text>
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
                  <Divider style={style.profileDivider}/>
                  <Text style={style.pointsLabel}>Points: 49</Text>
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
              onSelect={index => createQuestion(index)}>
                <Tab title='Questions'></Tab>
                <Tab title='My Questions'></Tab>
            </TabBar>
            
            <Divider style={style.divider}/>
            <Text style={style.categoryHeader} category='s1'>Categories</Text>
            <Select 
            style={style.select}

            value={displayCategory}
            onSelect={index => setSelectedCategoryIndex(index)}>
            {categoryProp.map(renderCategoryOption)}
          </Select>
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
          <Button style={style.postQuestionBtn}>
            <Text>Post a Question</Text>
          </Button>
          ): null}
        </ScrollView>
      </View>
    )
}


