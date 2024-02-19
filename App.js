import { StyleSheet, Text, View, SectionList, Pressable, SafeAreaView,Image,TextInput,Animated,} from 'react-native';
import { useEffect,useState,useRef, } from 'react';
import * as data from "./data.json";
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
const slide = require('./Group.png')
const back =require('./Arrow.png')
const plus = require('./plus.png')
const DATA = data["time_of_the_day"];
const leftAction = ()=>{
  return(
    <View style={styles.leftAction}>
      <Text>Confirm</Text>
    </View>
  )
};
const rightAction = ()=>{
  changeRoutine();
  return(
    <View style={styles.rightAction}>
      <Text>delete</Text>
    </View>
  )
};


export default function App() {
const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
 
    let[screen,setScreen]=useState(0)
    
    if(screen==0){
       return(
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.content}>
        <Pressable onLongPress={()=>{setScreen(1)}}>
        <Text style={styles.header}>
        {data["time_of_the_day"][0]["name"]}
        </Text>
      </Pressable>
       </View>
       
       <Swipeable renderLeftActions={leftAction} renderRightActions={rightAction} >
        <View style={styles.content1}>
          
            
            
              <Text style={styles.swipe}>hihiha</Text>
              <Image source={slide}/>

        </View>
        </Swipeable>
    
    </GestureHandlerRootView>)
  
    }
    else if(screen==1){
      return(
        <View style={styles.container}>
          <Pressable onPress={()=>(setScreen(0))}><Image style={styles.back}source={back}/></Pressable>
          <Pressable onPress={fadeIn}><Image source={plus}/></Pressable>
          <Animated.View style={[styles.input,{width:fadeAnim,}]}><TextInput value=''></TextInput></Animated.View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#3D3E3C',
    
  },
  header:{
    fontSize:70,
    alignItems:'center',
    justifyContent: 'center',
     color:'#DBD9DB',
  },
  content:{
    height:Dimensions.get('window').height*0.3,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  content1:{
    
    height: Dimensions.get('window').height*0.7,
    
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: '#3D3E3C',
  },
  swipe:{
    fontSize:60,
    color:'#DBD9DB',
    paddingTop:150,
    marginBottom:100,
  },
  input:{
    backgroundColor:'green',
    width:Dimensions.get('window').width/2,
  },
  leftAction:{
    backgroundColor: '#639269',
    width:200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightAction:{
    backgroundColor: '#E04129',
    width:200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back:{
    width:50,
    height:50,
    marginTop:30,
    marginLeft:10,
  }
});