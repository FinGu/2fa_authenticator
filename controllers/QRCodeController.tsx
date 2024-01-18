import {useNavigation} from '@react-navigation/native';
import QRCode from '../components/views/QRCode';

import { URL } from 'react-native-url-polyfill';
import {raw_ignore_alert} from '../utils/Alert';
import Constants from '../Constants';

import { authenticator_secret } from '../models/authenticator';

const on_scanned = (navigation: any, data: string) => {
    let url

    try{
        url = new URL(data)
    } catch(err){
        raw_ignore_alert('Error', Constants.Pages.QRCode.Texts.BadCode) 
        return
    }

    if(url.protocol !== 'otpauth:'){
        raw_ignore_alert('Error', Constants.Pages.QRCode.Texts.BadCode)
        return
    }

    let secret = url.searchParams.get('secret')

    if(secret === null){
        raw_ignore_alert('Error', Constants.Pages.QRCode.Texts.InvalidSecret)
        return
    }

    navigation.navigate(Constants.Pages.AddAuthenticator.Name, { 
        qr_code_data: {
            name: decodeURI(url.pathname.substring(1)),
            secret: secret 
        } as authenticator_secret,
    })
}

const QRCodeController = () => {
    const navigation = useNavigation()

    return <QRCode on_scanned={(data) => on_scanned(navigation, data)}/> 
};

export default QRCodeController;

