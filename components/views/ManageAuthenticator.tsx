import React, { useEffect, useState } from 'react';

import {Button, TextInput, View,StyleSheet} from 'react-native';
import Constants from '../../Constants';

import {authenticator_secret} from '../../models/authenticator';

const ManageAuthenticator = ({ data_to_be_displayed, on_press_add, on_press_edit_remove}: { 
  data_to_be_displayed?: authenticator_secret,
  on_press_add?: (data: authenticator_secret) => Promise<void>,
  on_press_edit_remove?: (new_data: authenticator_secret, is_delete: boolean) => Promise<void>,
}) => {
  const [nickname, onChangeNickName] = useState('')

  const [secret, onChangeSecret] = useState('')

  const clear_data = () => {
      onChangeNickName('')
      onChangeSecret('')
  }

  useEffect(() => {
      if(!data_to_be_displayed){
        return
      }

      onChangeNickName(data_to_be_displayed.name)
      onChangeSecret(data_to_be_displayed.secret)

  }, [data_to_be_displayed])
  
  return (
      <View>
          <TextInput style={styles.input} placeholder="Nickname" onChangeText={onChangeNickName} defaultValue={nickname}/>

          <TextInput style={styles.input} placeholder="Secret" onChangeText={onChangeSecret} defaultValue={secret}/>
          
          {on_press_edit_remove ? 
            <View style={styles.button} >

              <View style={styles.button}>
                <Button onPress={() => {
                    on_press_edit_remove!({
                        name: nickname,
                        secret: secret
                      }, false)
                      clear_data()
                    }} title={Constants.Pages.ManageAuthenticator.Texts.SaveButton} />
                </View>

              <Button onPress={() => {
                on_press_edit_remove!({} as authenticator_secret, true)
                clear_data()
              }} title={Constants.Pages.ManageAuthenticator.Texts.RemoveButton} />

            </View>
            : 
            <View style={styles.button} >
              <Button onPress={() => {
                  on_press_add!({
                      name: nickname,
                      secret: secret
                  })
                  clear_data()
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


