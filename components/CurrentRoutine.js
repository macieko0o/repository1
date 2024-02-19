import { useEffect, useState } from "react";
import { View, Text,StyleSheet, Button } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

export default function CurrentRoutine(props) {
    return (
        <View style={styles.container}>
          {props.currentTime==props.data.length ? 
            <View></View>
          :
            <View>
              {props.isTimeActive ? 
                <View>
                  {props.routineIndex==props.data[props.currentTime]['data'].length ?  
                  <View></View>
                  :
                  <View>
                    <Text>{props.data[props.currentTime]['data'][props.routineIndex].routine_name}</Text>
                    <Button title="zrobione" onPress={()=>{props.setRoutineIndex(props.routineIndex+1)}}/>
                  </View>
                }
                </View>
              :
                <View>
                  <Text>gotowy na {props.data[props.currentTime].title}?</Text>
                  <Button title="tak" onPress={()=>{props.setIsTimeActive(1)}}/>
                </View>
              }
            </View>
          }
          
          <Button title="ekran" onPress={()=>{props.setScreen(0)}}/>
          
          <StatusBar style="dark"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: Constants.statusBarHeight,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});