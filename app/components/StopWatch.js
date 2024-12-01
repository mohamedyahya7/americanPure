// @ts-ignore
import {Stopwatch} from 'react-native-stopwatch-timer';
import React, {useState,useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import  colors  from '../config/colors';

export default function     StopWatch({setTime}) {
    
    const [stopwatchStart, setStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    useEffect(()=>{
     setStopwatchStart(true)
    },[])
    const options = {
      container: {
        backgroundColor: colors.primary,
        // backgroundColor: '#566573',
        padding: 5,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
      },
      text: {
        fontSize: 25,
        color: '#fff',
        marginLeft: 7,
      },
    };
    return (
          
            <View style={styles.sectionStyle}>
              <Stopwatch
              laps
              msecs={false}
       
                start={stopwatchStart}
                
                reset={resetStopwatch}
               
                options={options}
                
              
                getTime={(time) => {
                  setTime(time);
                }}
              />
              <View style={{flexDirection:'row',justifyContent:'space-around',margin:10,width:'100%'}}>
      <TouchableHighlight
            onPress={() => {
              setStopwatchStart(!stopwatchStart);
              
              setResetStopwatch(false);
            }}>
            <Text style={styles.buttonText}>
              {!stopwatchStart ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setStopwatchStart(false);
              setResetStopwatch(true);
            }}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableHighlight>
        </View>
        </View>
      
      
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red',
    borderWidth:2,
    borderColor:'#00f',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: { 
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});
