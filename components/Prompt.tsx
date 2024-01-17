import { View } from "react-native";

import Dialog from "react-native-dialog";

import React, { useState } from 'react';
import Constants from "../Constants";

const Prompt = ({title, value, visible, on_submit, on_close}: {
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
                <Dialog.Button label={Constants.Prompt.Submit} onPress={() => {
                    on_submit(input)
                }} />
                <Dialog.Button label={Constants.Prompt.Cancel} onPress={on_close}/>
            </Dialog.Container>
        </View>
    )
}

export default Prompt
