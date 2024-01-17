import React, { useEffect, useState } from 'react';
import * as Clipboard from 'expo-clipboard';

import {generated_token, generate_tokens, get_time_remaining} from '../models/authenticator';

import Authenticator from '../components/views/Authenticator';
import {raw_ignore_alert} from '../utils/Alert';
import Constants from '../Constants';
import {useNavigation} from '@react-navigation/native';

const token_on_press = async (token: string) => {
    await Clipboard.setStringAsync(token)
    raw_ignore_alert('OK', Constants.Pages.Authenticator.Texts.CopiedToClipboard)
}

const edit_item_on_press = (navigation: any, name: string) => {
    navigation.navigate(Constants.Pages.ManageAuthenticator.Name, { 
        orig_name: name 
    })
}

const AuthenticatorController = () => {
  let navigation = useNavigation()
  let [timeLeft, setTimeLeft] = useState(get_time_remaining())
  let [tokens, setTokens] = useState<generated_token[]>([])

  const update_tokens = () => {
      generate_tokens().then(toks => {
          setTokens(toks)
      })
  }

  useEffect(() => {
    const timing = setInterval(() => {
      setTimeLeft(get_time_remaining());
    }, 1000);

    return () => {
      clearInterval(timing);
    };
  }, []);

  useEffect(() => {
    if(timeLeft !== 30){
        return
    }

    update_tokens()

  }, [timeLeft])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        update_tokens()
    })

    return () => unsubscribe();
  }, [navigation]);

  return <Authenticator data={tokens} time_remaining={timeLeft} 
    token_on_press={token_on_press} 
    edit_item_on_press={(name) => {
      edit_item_on_press(navigation, name)
    }}/>
};

export default AuthenticatorController;
