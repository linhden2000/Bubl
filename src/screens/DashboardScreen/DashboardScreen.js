import React from 'react'
import style from './style';
import { StyleSheet,ScrollView, View, TouchableOpacity } from 'react-native';
import { Button, Card, Text } from '@ui-kitten/components';
import {auth} from '../../firebase/config';

export default function DashboardScreen({navigation}) {
    const createQuestion = () => {
      console.log("question button pushed")
      navigation.navigate('CreateQuestions');
    }
  
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
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

          <Button style={style.postQuestionBtn} onPress={createQuestion}>
            <Text>Post a Question</Text>
          </Button>
          {/* <Text>Hello {auth?.currentUser.email}</Text>  */}
          <ScrollView snapToAlignment={true}>
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
            <Card style={style.matchCards}>
              <Text>Puss in Boots</Text>
            </Card>
            </ScrollView>
        </ScrollView>
      </View>
    )
}


