import {createDrawerNavigator} from '@react-navigation/drawer'
import {Pressable, StyleSheet} from 'react-native'
import Constants from '../Constants'

import AddAuthenticatorController from '../controllers/AddAuthenticatorController'
import AuthenticatorController from '../controllers/AuthenticatorController'
import EditAuthenticatorController from '../controllers/EditAuthenticatorController'
import QRCodeController from '../controllers/QRCodeController'

import SettingsController from '../controllers/SettingsController'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const drawer = createDrawerNavigator()

const DrawerNavigator = ({ add_authenticator_on_press, qr_code_on_press}: {
    add_authenticator_on_press: () => void,
    qr_code_on_press: () => void
}) => {
  return (
    <drawer.Navigator>
      <drawer.Screen name={Constants.Pages.Home.Name} component={AuthenticatorController} options={{
          headerRight: () => {
            return (
              <Pressable style={styles.pressable} onPress={add_authenticator_on_press}>
                <Icon name="plus" size={35}></Icon>
              </Pressable>
            )
          }
      }}/>
      <drawer.Screen name={Constants.Pages.Settings.Name} component={SettingsController} />
      <drawer.Screen name={Constants.Pages.AddAuthenticator.Name} component={AddAuthenticatorController} options={{
          headerRight: () => {
            return (
              <Pressable style={styles.pressable} onPress={qr_code_on_press}>
                <Icon name="qrcode-scan" size={28}></Icon>
              </Pressable>
            )
          },
          drawerItemStyle: { height: 0 },
      }}/>
      <drawer.Screen name={Constants.Pages.ManageAuthenticator.Name} component={EditAuthenticatorController} options={{
          drawerItemStyle: { height: 0 }
      }}/>
      <drawer.Screen name={Constants.Pages.QRCode.Name} component={QRCodeController} options={{
          drawerItemStyle: { height: 0 }
      }}/>

    </drawer.Navigator>
  )
}

const styles = StyleSheet.create({
    pressable:{
      marginRight: 15
    }
})

export default DrawerNavigator; 

