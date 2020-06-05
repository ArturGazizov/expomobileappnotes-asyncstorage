import * as React from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, ScrollView ,StyleSheet,  Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  { Component, useState, useEffect  } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import AwesomeAlert from 'react-native-awesome-alerts';

const Note = (props) => {
  return (
    <View>
      <Text>{props.text}</Text>
    </View>
  );
}


const createAlert = () =>
    {return (<AwesomeAlert message="alerting"/>)};




const createThreeButtonAlert = () =>
    Alert.alert(
      "Same note",
      "Same note already exists",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );




class NoteList extends React.Component {
constructor(props) {
    super(props)}
    
render()
  {return (
    <View>
      <ScrollView >
 {this.props.notes.map((anote,id) =><Note key={id} text={anote} />)}
     </ScrollView>
      <Button title="To Adding" onPress={() => this.props.navigation.navigate('Adding')} />

    </View>
  );
}
}

const MenuScreen = () => {
  return (
    <View>
      <Text>Menu Screen</Text>
    </View>
  );
}

class AddingScreen extends React.Component {
  constructor(props) {
    super(props)}
  render(){
  return (
    <View>
    <TextInput
      placeholder="write a note"
      onChangeText={text => {this.props.onChangeText(text);}}
      value={this.props.value}
    />

<Button title="Send a note" onPress={() => {Alert.alert('note adding');if (this.props.notes.find(it=>it==this.props.value)) {createThreeButtonAlert()} else {this.props.onChangeNotes([...this.props.notes,this.props.value]);this.props.onChangeText("");this.props.setting([...this.props.notes,this.props.value])}    }} />


<Button title="To List" onPress={() => this.props.navigation.navigate('notes')} />

    </View>
  );}
}

const Stack = createStackNavigator();




let alreadyfetched=false


export default function App() {



 const storeData = async (storedvalue) => {
  try {
    await AsyncStorage.setItem('notess', storedvalue)
  } catch (e) {
    // saving error
  }
}


 const getData = async () => {
  try {
    const valuee = await AsyncStorage.getItem('notess')
    if(valuee !== null) {
      return valuee
    }
    else
      {return []}
  } catch(e) {
    // error reading value
  }
}
    const [value, onChangeText] = React.useState('');    
    const [notes, onChangeNotes] = React.useState([
    "The note0","The note1","The note1","The note1","The note1","The note1","The note1","The note1"]);
//getData().then(it=>{if(notes!==it) {onChangeNotes(it);alert(it)};alert("it")})


useEffect(() => {
    getData().then(data => {if (typeof data=="string"){data=data.split(",")}; onChangeNotes(data);}   )},[])

{
  return (

<NavigationContainer  >
      <Stack.Navigator initialRouteName="" >
        <Stack.Screen name="notes" >
        {props => <NoteList {...props} notes={notes} />}</Stack.Screen>
        <Stack.Screen name="Menus" component={MenuScreen} />
        <Stack.Screen name="Adding"  >
        {props => <AddingScreen {...props} notes={notes} value={value} onChangeText={onChangeText} onChangeNotes={onChangeNotes} setting={storeData}/>}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


{
//return (<View><ActivityIndicator animating={true} /></View>)
}


}

const styles = StyleSheet.create({
  container: {flex: 0.1, flexDirection: 'column'},
  container2: {flex: 0.1, flexDirection: 'column'},
  white:{color:'white',flex:0}

});
//




/*

     <ActivityIndicator animating={true} />

        <ScrollView >
        {notes.map((anote,id) =><Note  key={id} text={anote} />)}
</ScrollView>

 <TextInput
      placeholder="write a note"
      onChangeText={text => {onChangeText(text);}}
      value={value}
    />
<Button  title="Send a note" onPress={() => {if (notes.find(it=>it==value)) {createThreeButtonAlert()} else {onChangeNotes([...notes,value]);onChangeText("")}    }} />
<Button  title="alert from react native" onPress={()=>Alert.alert('foo')}/>
<Button  title="alert component from react native" onPress={createThreeButtonAlert}/>
<Button  title="awesome alert from react native" onPress={createAlert}/>




*/