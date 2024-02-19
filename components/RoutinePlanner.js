import { useEffect, useState } from "react";
import { View, Text,StyleSheet, Button, SectionList, Image, TextInput, Pressable } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

const plus = require("../plus.png")

export default function RoutinePlanner(props) {
  let [editMode, setEditMode] = useState(false)
  function changeRoutine(i, y, name, time, color) {
    let tempData = props.data
    tempData[i]['data'][y] = {
      "routine_name": name,
      "estimated_time": time,
      "color": color
    }
    props.setData(tempData)
  }
  function render() {
    let view = [];
    let tempView = [];
    for(let i=0; i<props.data.length; i++) {
      for(let y=0; y<props.data[i]['data'].length; y++) {
        tempView.push(
        <Routine 
        item={props.data[i]['data'][y]} 
        key={i+""+y}
        i={i}
        y={y}
        changeRoutine={changeRoutine}/>)
      }
      view.push(
      <View>
        <Text>{props.data[i]['title']}</Text>
        {tempView}
        <Image source={plus} style={{width: 20, height: 20}}/>
      </View>)
      tempView = []
    }
    return view
  }

    return (
      <View style={styles.container}>
      {render()}
      
      <Button title="ekran" onPress={()=>{props.setScreen(1)}}/>
      <StatusBar style="dark"/>
    </View>
    )
}

function Routine(props) {
  let [routineName, setRoutineName] = useState(props.item['routine_name'])
  let [routineTime, setRoutineTime] = useState(props.item['estimated_time'])
  let [routineColor, setRoutineColor] = useState(props.item['color'])

  let [localEditMode, setLocalEditMode] = useState(false)

  function ConfirmEdit() {
    setLocalEditMode(false)
    props.changeRoutine(props.i, props.y, routineName, routineTime, routineColor)
  }
  if(!localEditMode) {
    return(
      <View style={[styles.item, {backgroundColor: routineColor}]}>
        <Pressable onLongPress={()=>{setLocalEditMode(true)}}>
          <Text style={styles.title}>
            {routineName}
            <Text>{routineTime}</Text>
          </Text>
        </Pressable>
      </View>
    )
  }
  
  else {
    return (
      <View>
        <TextInput 
        style={styles.input}
        value={routineName}
        onChangeText={setRoutineName}
        />
        <TextInput 
        style={styles.input}
        value={routineTime}
        onChangeText={setRoutineTime}
        />
        <TextInput 
        style={styles.input}
        value={routineColor}
        onChangeText={setRoutineColor}
        />
        <Button 
        title="potwierdz"
        onPress={ConfirmEdit}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      marginTop: Constants.statusBarHeight,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  
  
  /*
  <SectionList
      sections={props.data}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => (
        <View style={[styles.item, {backgroundColor: item['color']}]}>
          <Text style={styles.title}>{item['routine_name']}</Text>
        </View>
      )}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
      ListFooterComponent={(<View><Text>xd</Text></View>)}
      />
      <Image source={plus}/>
 
  */