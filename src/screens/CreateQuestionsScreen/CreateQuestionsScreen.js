import React, {useState} from 'react'
import style from './style';
import {questionTypesProp, categoryProp} from '../../properties'
import { StyleSheet,SafeAreaView, View,ScrollView} from 'react-native';
import { Button, Input, Text, Card, Icon, Select, SelectItem, IndexPath} from '@ui-kitten/components';
import {auth} from '../../firebase/config';

//Icons
const BackIcon = (props) => (
  <Icon {...props} name='arrow-back-outline'/>
);
const PlusIcon = (props) => (
  <Icon {...props} name='plus-outline'/>
);
export default function CreateQuestionsScreen({navigation}) {
  //Show/Hide components
  const [shouldShow, setShouldShow] = useState(false);

  //Variables
  const [question, setQuestion] = useState('');

  
  //Question type drop down
  const [selectedQuestionTypeIndex, setSelectedQuestionTypeIndex] = useState(new IndexPath(0));
  const displayQuestionType = questionTypesProp[selectedQuestionTypeIndex.row];
  const renderQuestionTypesOption = (label, key) => (
    <SelectItem key={key} title={label}/>
  );

  //Categories type drop down
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(new IndexPath(0));
  const displayCategory= categoryProp[selectedCategoryIndex.row];
  const renderCategoryOption = (label, key) => (
    <SelectItem key={key} title={label}/>
  );
  //Dynamic Answers for multiple choice
  const [answer, setAnswer] = useState('');

  const navigateToDashboard = () => {
    navigation.navigate('DashboardNavigation');
  }
  const displayAnswer = (questionType) => {
    setSelectedQuestionTypeIndex(questionType)
    if(questionTypesProp[questionType.row] == "Multiple Choice")
      setShouldShow(true)
    else
      setShouldShow(false)
  }
    return (
      <View style={{flex: 1}}>
        <Card style={style.headerCard}>
          <Text style={style.pageTitle} category='S1'>Question Creation</Text>
          <Button style={style.backBtn} onPress={navigateToDashboard} 
                accessoryLeft={BackIcon} appearance='ghost'/>
        </Card>
        <ScrollView>
        <Card style={style.card}>
          <Text style={style.label}>Select a question type</Text>
          <Select 
            style={style.select}

            value={displayQuestionType}
            onSelect={index => displayAnswer(index)}>
            {questionTypesProp.map(renderQuestionTypesOption)}
          </Select>

          <Text style={style.label}>Select a Category</Text>
          <Select 
            style={style.select}

            value={displayCategory}
            onSelect={index => setSelectedCategoryIndex(index)}>
            {categoryProp.map(renderCategoryOption)}
          </Select>

          <Card>
            <Text category='h5'>Question</Text>
            <Input
              multiline={true}
              textStyle={{ minHeight: 100}}
              placeholder='Type your question here'
              value={question}
              onChangeText={input => setQuestion(input)}
            />
            {
            }{shouldShow ? ( //If multiple choice
              <View>
                <Text style={style.answerTitle} category='h5'>Answers</Text>

                <Text style={style.answerLabel}>Answer 1</Text>
                <Input placeholder='Type an answer'></Input>

                <Button style={style.plusIcon} accessoryLeft={PlusIcon} appearance='ghost'/>

              </View>
            ): null}
            <Button style={style.submitBtn}>Post Question</Button>
            
          </Card>

          
        </Card>
        </ScrollView>
      </View>
    )
}