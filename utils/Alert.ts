import {Alert} from "react-native"

type alert_type = 'OK' | 'Error'

const raw_ignore_alert = (alert_type: alert_type, msg: string) => {
    Alert.alert(alert_type, msg, [{
        text: 'Ok'
    }])
}

export {raw_ignore_alert}
