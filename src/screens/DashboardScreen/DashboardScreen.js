import React, {useState} from 'react'
import style from './style';
import { StyleSheet,ScrollView, View, TouchableOpacity } from 'react-native';
import {categoryProp} from '../../properties'
import { Button, Card, Text, Tab, TabBar, Divider} from '@ui-kitten/components';
import {auth} from '../../firebase/config';

export default function DashboardScreen({navigation}) {
    const createQuestion = () => {
      console.log("question button pushed")
      navigation.navigate('CreateQuestions');
    }

    const [selectedQuestionTabIndex, setSelectedQuestionTabIndex] = useState(0);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  
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
            <Text>Fairy Godmother</Text>
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
            <Divider/>
            <Text>Category</Text>
            <TabBar 
              selectedIndex={selectedCategoryIndex}
              onSelect={index => setSelectedCategoryIndex(index)}>
                <Tab title='Movies'></Tab>
                <Tab title='Sports'></Tab>
            </TabBar>
          </Card>
          <Card style={style.matchCards}>
            <Text>Puss in Boots</Text>
          </Card>
          <Card style={style.matchCards}>
            <Text>Puss in Boots</Text>
          </Card>
          <Card style={style.matchCards}>
            <Text>Puss in Boots</Text>
          </Card>
          <Card style={style.matchCards}>
            <Text>Puss in Boots</Text>
          </Card>
          <Card style={style.matchCards}>
            <Text>Puss in Boots</Text>
          </Card>
          <Card style={style.matchCards}>
            <Text>Puss in Boots</Text>
          </Card>
          <Card style={style.matchCards}>
            <Text>Puss in Boots</Text>
          </Card>
          <Button style={style.postQuestionBtn} onPress={createQuestion}>
            <Text>Post a Question</Text>
          </Button>
        </ScrollView>
      </View>
    )
}


