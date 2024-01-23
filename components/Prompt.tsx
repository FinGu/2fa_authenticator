import { View, StyleSheet } from "react-native";

import Dialog from "react-native-dialog";

import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

import React, { useState } from 'react';
import Constants from "../Constants";

const StringPrompt = ({title, value, visible, on_submit, on_close}: {
    title: string,
    value?: string,
    visible: boolean,
    on_submit: (input: string) => void,
    on_close: () => void
}) => {
    if(!visible){
        return <></>
    }

    const [input, setInput] = useState<string>(value!)

    return (
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Input value={input} onChangeText={setInput}></Dialog.Input>
                <Dialog.Button label={Constants.Prompt.Submit} onPress={() => on_submit(input) } />
                <Dialog.Button label={Constants.Prompt.Cancel} onPress={on_close}/>
            </Dialog.Container>
        </View>
    )
}

const RadioPrompt = ({title, labels, visible, on_submit, on_close}: {
    title: string,
    visible: boolean,
    labels: string[]
    on_submit: (index: number) => void,
    on_close: () => void
}) => {
  if(!visible){
      return <></>
  }

  const [selectedOption, setSelectedOption] = useState<string>('0');

  const buttons = labels.map((label, index) => {
      let data = {
        id: String(index), 
        label: label, 
        value: index, 
        containerStyle: styles.radio_container
      } as unknown as RadioButtonProps

      return data
  })

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>{title}</Dialog.Title>
      <RadioGroup  
          radioButtons={buttons}
          onPress={(str) => setSelectedOption(str)}
          selectedId={selectedOption}
      />
      <Dialog.Button label={Constants.Prompt.Submit} onPress={() => on_submit(Number(selectedOption))} />
      <Dialog.Button label={Constants.Prompt.Cancel} onPress={on_close} />
    </Dialog.Container>
  );
}

const styles = StyleSheet.create({
  radio_container: {
    marginRight:165
  } 
})

export {StringPrompt, RadioPrompt}
