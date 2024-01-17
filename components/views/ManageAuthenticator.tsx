import React, { useEffect, useState } from 'react';

import {Button, TextInput, View,StyleSheet} from 'react-native';
import Constants from '../../Constants';

import {authenticator_secret} from '../../models/authenticator';

const ManageAuthenticator = ({ edit_remove_old_data, on_press_add, on_press_edit_remove}: { 
  edit_remove_old_data?: authenticator_secret,
  on_press_add?: (data: authenticator_secret) => Promise<void>,
  on_press_edit_remove?: (new_data: authenticator_secret, is_delete: boolean) => Promise<void>,
}) => {
  const [nickname, onChangeNickName] = useState('')

  const [secret, onChangeSecret] = useState('')

  useEffect(() => {
      if(!edit_remove_old_data){
        return
      }

      onChangeNickName(edit_remove_old_data.name)
      onChangeSecret(edit_remove_old_data.secret)

  }, [edit_remove_old_data])
  
  return (
      <View>
          <TextInput style={styles.input} placeholder="Nickname" onChangeText={onChangeNickName} defaultValue={nickname}/>

          <TextInput style={styles.input} placeholder="Secret" onChangeText={onChangeSecret} defaultValue={secret}/>
          
          {edit_remove_old_data ? 
            <View style={styles.button} >

              <View style={styles.button}>
                <Button onPress={() => {
                    on_press_edit_remove!({
                        name: nickname,
                        secret: secret
                      }, false)
                    }} title={Constants.Pages.ManageAuthenticator.Texts.SaveButton} />
                </View>

              <Button onPress={() => {
                on_press_edit_remove!({} as authenticator_secret, true)
              }} title={Constants.Pages.ManageAuthenticator.Texts.RemoveButton} />

            </View>
            : 
            <View style={styles.button} >
              <Button onPress={() => {
                  on_press_add!({
                      name: nickname,
                      secret: secret
                  })
              }} title={Constants.Pages.AddAuthenticator.Texts.AddButton} />
            </View> 
        }
      </View>
  )
};

const styles = StyleSheet.create({
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },  
  button: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight: 15
  }
})

export default ManageAuthenticator;


