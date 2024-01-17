import React, {useEffect, useState} from 'react'

import Settings from '../components/views/Settings'

import Constants from "../Constants";

import { generate_settings } from '../models/settings';
import {settings_section, settings_type, settings_state} from '../details/settings';
import details from '../details/details';

import { as_state } from '../utils/Extract';

const map_sections = async () => {
    let out: settings_section[] = []

    let as_entries = Object.entries(Constants.Sections)

    for(const [, section] of as_entries){
        let raw_settings = Object.entries(section.Settings)

        let settings: [string, settings_type][] = raw_settings.map(([,svalue]) => {
            return svalue as [string, settings_type]
        }) 

        let data = await generate_settings(settings) 

        out.push({
            title: section.Title,
            data: data
        })
    }
    
    return out
}

const handleChange = (
    [,setSettings]: as_state<settings_state>, 
    sname: string, 
    value: boolean | string
) => {
    if(typeof value === 'boolean'){
        details.save(sname, value ? 'true' : 'false')
    } else{
        details.save(sname, value)
    }

    setSettings((prevSettings) => ({
        ...prevSettings,
        [sname]: value,
    }))
}


const SettingsController = () => {
  const [sections, setSections] = useState<settings_section[]>([{
      title: 'Bogus',
      data: [{
        name: 'Bogus key',
        type: 'boolean'
      }]
  }])

  useEffect(() => {
      map_sections().then((section_array) => {
          setSections(section_array)
      })
  }, [])

  return <Settings data={sections} on_change={handleChange}/>
};

export default SettingsController;
