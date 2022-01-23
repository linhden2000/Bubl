import React, {useState} from 'react'
import style from './style';
import { StyleSheet,ScrollView, View, TouchableOpacity } from 'react-native';
import {categoryProp} from '../../properties'
import { Button, Card, Text, Tab, TabBar, Divider, IndexPath} from '@ui-kitten/components';
import {auth} from '../../firebase/config';

export default function DashboardScreen({navigation}) {
    //Variables
    const [selectedQuestionTabIndex, setSelectedQuestionTabIndex] = useState(0);

    //Categories Tab
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const renderCategories = (label) => (
      <Tab>title={label}</Tab>
    );
    console.log(categoryProp.map(renderCategories)[1])



    const createQuestion = () => {
      console.log("question button pushed")
      navigation.navigate('CreateQuestions');
    }
  
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[6]}>
          <Text style={style.header} category='h5'>Your Top 5 Matches</Text>
          <Card style={style.matchCards}>
            <Text>Lord Farquad</Text>
          </Card>

          <Card style={style.matchCards}>
            <Text>Prince Charming</Text>
          </Card>

          <Card style={style.matchCards}>
            <Text>Gingerbread Man</Text>
          </Card>

          <Card style={style.matchCards}>
            <Text>Fairy Godmother</Text>
          </Card>
            
          <Card style={style.matchCards}>
            <Text>Puss in Boots</Text>
          </Card>
          {/* <Text>Hello {auth?.currentUser.email}</Text>  */}
          <Card style={style.questionHeaderContainer}>
            <TabBar 
              selectedIndex={selectedQuestionTabIndex}
              onSelect={index => setSelectedQuestionTabIndex(index)}>
                <Tab title='Questions'></Tab>
                <Tab title='Your Questions'></Tab>
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


