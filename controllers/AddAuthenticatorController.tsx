import {useNavigation} from '@react-navigation/native';
import ManageAuthenticator from '../components/views/ManageAuthenticator';

import {add_secret, authenticator_errors, authenticator_secret} from '../models/authenticator';
import {raw_ignore_alert} from '../utils/Alert';

const onPressAdd = async (navigation: any, secret_obj: authenticator_secret) => {
    let secrets = await add_secret(secret_obj) 

    if(typeof secrets === 'string'){
        raw_ignore_alert('Error', secrets)

        return
    }

    if(!secrets.includes(secret_obj)){
        raw_ignore_alert('Error', authenticator_errors.UNKNOWN)

        return
    }

    navigation.goBack()
}

const AddAuthenticatorController = () => {
    const navigation = useNavigation()

    return <ManageAuthenticator on_press_add={data => onPressAdd(navigation, data)} />
};

export default AddAuthenticatorController;

