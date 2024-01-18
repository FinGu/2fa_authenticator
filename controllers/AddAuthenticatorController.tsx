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

const AddAuthenticatorController = ({ route }: {
    route: any
}) => {
    const navigation = useNavigation()

    const qr_code_data = (route.params === undefined) ? undefined : route.params.qr_code_data

    return <ManageAuthenticator on_press_add={data => onPressAdd(navigation, data)} data_to_be_displayed={qr_code_data} />
};

export default AddAuthenticatorController;

