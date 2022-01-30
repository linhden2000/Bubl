import React, {useState} from 'react'
import style from './style';
import { StyleSheet,ScrollView, View, TouchableOpacity } from 'react-native';
import {categoryProp} from '../../properties'
import { Button, Card, Text, Tab, TabBar, Divider, Avatar, Icon, Layout} from '@ui-kitten/components';
import {useFonts, PublicSans_600SemiBold} from '@expo-google-fonts/public-sans';
import AppLoading from 'expo-app-loading';
import {auth} from '../../firebase/config';

export default function DashboardScreen({navigation}) {
    //Load fonts
    //Source: https://github.com/expo/google-fonts
    let [fontsLoaded] = useFonts ({
      PublicSans_600SemiBold,
    });
    //Variables
    const [selectedQuestionTabIndex, setSelectedQuestionTabIndex] = useState(0);
    const shouldLoadComponent = (index) => index === selectedIndex;

    //Categories Tab
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const renderCategories = (label) => (
      <Tab>title={label}</Tab>
    );

    //Show/hide tabs
    //const [showMyQuestions, setShowMyQuestions] = useState(false); //Display the user's (you) questions
    //const [showAllQuestions, setShowAllQuestions] = useState(false); //Display questions from other users

    const createQuestion = () => {
      console.log("question button pushed")
      navigation.navigate('CreateQuestions');
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
              onSelect={index => setSelectedQuestionTabIndex(index)}>
                <Tab title='Questions'></Tab>
                <Tab title='Your Questions'>
                  <Layout>
                    <Button style={style.postQuestionBtn} onPress={createQuestion}>
                      <Text>Post a Question</Text>
                    </Button>
                  </Layout>
                </Tab>
            </TabBar>
            
            <Divider style={style.divider}/>
            <Text style={style.categoryHeader} category='s1'>Categories</Text>
            <ScrollView horizontal={true} 
            showsHorizontalScrollIndicator={false}>
            <TabBar 
              selectedIndex={selectedCategoryIndex}
              onSelect={index => setSelectedCategoryIndex(index)}>
                <Tab title='All  '></Tab>
                <Tab title='Movies  '></Tab>
                <Tab title='Sports  '></Tab>
                <Tab title='Food  '></Tab>
                <Tab title='Travel  '></Tab>
                <Tab title='Family  '></Tab>
                <Tab title='Career  '></Tab>
                <Tab title='Social  '></Tab>
                <Tab title='Music  '></Tab>
                <Tab title='Other  '></Tab>
            </TabBar>
            </ScrollView>
          </Card>
          <Card style={style.questionCards}>
            <Text>Question 1</Text>
          </Card>
          <Card style={style.questionCards}>
            <Text>Question 2</Text>
          </Card>
          <Card style={style.questionCards}>
            <Text>Question 3</Text>
          </Card>
          <Card style={style.questionCards}>
            <Text>Question 4</Text>
          </Card>
          <Card style={style.questionCards}>
            <Text>Question 5</Text>
          </Card>
          <Card style={style.questionCards}>
            <Text>Question 6</Text>
          </Card>
          <Card style={style.questionCards}>
            <Text>Question 7</Text>
          </Card>
          <Button style={style.postQuestionBtn} onPress={createQuestion}>
            <Text>Post a Question</Text>
          </Button>
        </ScrollView>
      </View>
    )
}


