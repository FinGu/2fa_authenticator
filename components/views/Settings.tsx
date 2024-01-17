import React, { useState } from 'react'

import SettingsList from 'react-native-settings-list';
import Prompt from '../Prompt';

import {as_state} from '../../utils/Extract';

import { settings_state, settings_element, settings_section } from '../../details/settings';

type on_change_type = ([,setSettings]: as_state<settings_state>, sname: string, value: boolean | string) => void

type ISettings = {
    data: settings_section[],
    on_change: on_change_type
}

type prompt_state = {
    title?: string,
    value?: string
}

const displaySetting = (
    on_change: on_change_type,
    settings_state: as_state<settings_state>,
    [, setPrompt]: as_state<prompt_state>,
    setting: settings_element
) => {
    const [settings] = settings_state 

    if (setting.type === 'boolean') {
        if(!(setting.name in settings)){
            settings[setting.name] = Boolean(setting.value)
        }

        // @ts-ignore
        return (
            <SettingsList.Item key={setting.name} title={setting.name} 
                hasSwitch={true} hasNavArrow={false}
                switchOnValueChange={(new_val: any) => on_change(settings_state, setting.name, new_val)}
                switchState={settings[setting.name]}
            />)
    }

    if(!(setting.name in settings)){
        settings[setting.name] = setting.value
    }

    return <SettingsList.Item key={setting.name} title={setting.name} onPress={() => {
        setPrompt({
            title: setting.name,
            value: settings[setting.name]
        })
    }}/>
}

const displaySection = (
    on_change: on_change_type,
    settings_state: as_state<settings_state>,
    prompt_state: as_state<prompt_state>,
    section: settings_section
) => {
    const sectionSettings = section.data.map((setting) => {
        return displaySetting(on_change, settings_state, prompt_state, setting);
    });

    return [<SettingsList.Header key={section.title} headerText={section.title} />, ...sectionSettings];
}

const Settings = ({data, on_change}: ISettings) => {
    const settings_state = useState<settings_state>({})

    const [settings] = settings_state

    const prompt_state = useState<prompt_state>({})

    const [prompt, setPrompt] = prompt_state 

    let prompt_title: string = prompt.title ?? ''

    return (
        <>
            <SettingsList>
                {data.map((section) => {
                    return displaySection(on_change, settings_state, prompt_state, section)
                })}
            </SettingsList>
            <Prompt 
                title={prompt_title} 
                value={settings[prompt_title]} 
                visible={prompt_title !== ''}
                on_submit={(input: string) => {
                    on_change(settings_state, prompt_title, input)
                    setPrompt({});
                }} 
                on_close={() => setPrompt({})}
            />
        </>
    )
};

export default Settings;
