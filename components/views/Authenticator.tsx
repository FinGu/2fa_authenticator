import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableWithoutFeedback, Pressable } from 'react-native';

import Svg, { Circle } from 'react-native-svg';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from '../../Constants';

const SyncdCircle = ({time_remaining}: {
  time_remaining: number
}) => {
    const radius = 10;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - time_remaining / 30);

    return (<Svg height="20" width="20" viewBox="0 0 40 40">
          <Circle
            cx="20"
            cy="20"
            r={radius}
            stroke="#888"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90, 20, 20)`}
          />
        </Svg>
    ) 
}

const Item = ({edit_on_press, token_on_press, syncdcircle, name, token}: {
  edit_on_press: () => void,
  token_on_press: (token: string) => Promise<void>

  syncdcircle: JSX.Element,
  name: string, 
  token: string
}) => {
    return (
    <View style={styles.item}>
      <View style={styles.nameAndTimerRow}>
        <Text style={styles.name}>{name}</Text>
        {syncdcircle}
      </View>
   
      <View style={styles.codeAndIconRow}>

        <TouchableWithoutFeedback onPress={() => { token_on_press(token) }}>
          <View>
            <Text style={styles.code}>{token}</Text>
          </View>
        </TouchableWithoutFeedback>

        <Pressable onPress={edit_on_press}>
          <Icon name="square-edit-outline" size={20} style={styles.edit} />
        </Pressable>
      </View>
    </View>)
};

const Authenticator = ({ data, time_remaining, token_on_press, edit_item_on_press}: {
    data: any[],
    time_remaining: number,

    token_on_press: (token: string) => Promise<void>,
    edit_item_on_press: (name: string) => void 
}) => {
  const circle = (<SyncdCircle time_remaining={time_remaining}></SyncdCircle>)

  if(data.length === 0){
      return <View style={styles.initial_text_view}><Text>{Constants.Pages.Authenticator.Texts.InitText}</Text></View>
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll_container}>
      {data.map((item, i) => 
          <Item key={i} 
                name={item.name} token={item.token} 
                token_on_press={() => token_on_press(item.token)} 
                edit_on_press={() => edit_item_on_press(item.name)} 
                syncdcircle={circle}/>
      )}
      </ScrollView>
  )
};

const styles = StyleSheet.create({
  scroll_container: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: '#ffffff', // Change background color here
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 8, // Add border-radius
    borderWidth: 1, // Add border width
    borderColor: '#e0e0e0', // Add border color
  },
  name:{
    fontSize: 16,
    color: '#888', // Choose your desired text color
  },
  code: {
    flex: 1,
    fontSize: 32,
    marginRight: 120
  },
  edit: {
    marginTop: 2,
    justifyContent: 'flex-end',
  },
  nameAndTimerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4, // Adjust spacing between rows as needed
  },
  codeAndIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timer: {
    fontSize: 12,
    color: '#888',
    marginRight: 5,
    // Adjust styling as needed
  },
  initial_text_view:{
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'center', 
      marginBottom: 100
  }
});

export default Authenticator;
