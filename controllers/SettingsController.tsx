import React, {useEffect, useState} from 'react'
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from 'expo-document-picker';

import Settings from '../components/views/Settings'

import Constants from "../Constants";

import { generate_settings } from '../models/settings';
import {add_secret, authenticator_secret, fetch_secrets} from '../models/authenticator';

import {settings_section, settings_type, settings_state} from '../details/settings';
import details from '../details/details';

import { as_state } from '../utils/Extract';

import {raw_ignore_alert} from '../utils/Alert';

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
    sname: string, value: boolean | string) => {
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

const handleExportButton = async () => {
    const secret_data = await fetch_secrets()

    const file_uri = FileSystem.documentDirectory + 'exported_data.json'

    await FileSystem.writeAsStringAsync(file_uri, JSON.stringify(secret_data), {
        encoding: FileSystem.EncodingType.UTF8,
    });

    await Sharing.shareAsync(file_uri, {UTI: 'public.text', mimeType: 'text/plain'})
}

const handleImportButton = async () => {
    let doc = await DocumentPicker.getDocumentAsync()

    if(doc.canceled){
        return
    }

    let file_data = doc.assets[0]

    if(file_data.mimeType !== 'application/json'){
        raw_ignore_alert('Error', Constants.Pages.Settings.Texts.BadImportType)
        return
    }

    let data = []
    
    try{
        data = JSON.parse(await FileSystem.readAsStringAsync(file_data.uri))
    }catch(err){
        raw_ignore_alert('Error', Constants.Pages.Settings.Texts.BadJSON)
        return
    }

    if(!Array.isArray(data)){
        raw_ignore_alert('Error', Constants.Pages.Settings.Texts.BadImportType)
        return
    }

    let scount = 0

    for(const el of data){
        if(el.name === undefined || el.secret === undefined){
            continue
        }

        if(typeof (await add_secret(el as authenticator_secret)) !== 'object'){
            continue 
        }

        scount++
    }

    raw_ignore_alert('OK', Constants.Pages.Settings.Texts.ImportedSuccess.replace('{}', String(scount)))
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

  return <Settings 
            data={sections} 
            on_change={handleChange} 
            on_press_export={handleExportButton}
            on_press_import={handleImportButton}
            />
};

export default SettingsController;
