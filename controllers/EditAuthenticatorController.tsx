import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import ManageAuthenticator from '../components/views/ManageAuthenticator';

import {delete_secret, save_secret, authenticator_errors, authenticator_secret, fetch_single_secret} from '../models/authenticator';
import {raw_ignore_alert} from '../utils/Alert';

const onPressSaveRemove = async (navigation: any, orig_name: string, new_data: authenticator_secret, is_delete: boolean) => {
    if(is_delete){
        await delete_secret(orig_name)

        navigation.goBack()

        return
    }

    let response = await save_secret(orig_name, new_data) 

    if(response !== authenticator_errors.OK){
        raw_ignore_alert('Error', response)

        return
    }

    navigation.goBack()
}

const EditAuthenticatorController = ({route}: {
    route: any
}) => {
    const navigation = useNavigation()

    const orig_name  = route.params.orig_name

    const [oldData, setOldData] = useState<authenticator_secret>({name: '', secret: ''})

    useEffect(() => {
        fetch_single_secret(orig_name).then((data) => {
            setOldData(data!)
        })
    }, [orig_name])

    return <ManageAuthenticator 
        edit_remove_old_data={oldData}
        on_press_edit_remove={(new_data, is_delete) => onPressSaveRemove(navigation, orig_name, new_data, is_delete)} />
};

export default EditAuthenticatorController;


