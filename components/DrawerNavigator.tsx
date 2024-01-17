import {createDrawerNavigator} from '@react-navigation/drawer'
import {useNavigation} from '@react-navigation/native'
import {Pressable, Image, StyleSheet} from 'react-native'
import Constants from '../Constants'

import AddAuthenticatorController from '../controllers/AddAuthenticatorController'
import AuthenticatorController from '../controllers/AuthenticatorController'
import EditAuthenticatorController from '../controllers/EditAuthenticatorController'

import SettingsController from '../controllers/SettingsController'

const drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  const navigation = useNavigation()

  return (
    <drawer.Navigator>
      <drawer.Screen name={Constants.Pages.Home.Name} component={AuthenticatorController} options={{
          headerRight: () => {
            return (
              <Pressable style={styles.pressable} onPress={() => { 
                //@ts-ignore
                navigation.navigate(Constants.Pages.AddAuthenticator.Name)

              }}>
                <Image source={require('../assets/plus.png')} />
              </Pressable>
            )
          }
      }}/>
      <drawer.Screen name={Constants.Pages.Settings.Name} component={SettingsController} />
      <drawer.Screen name={Constants.Pages.AddAuthenticator.Name} component={AddAuthenticatorController} options={{
          drawerItemStyle: { height: 0 }
      }}/>
      <drawer.Screen name={Constants.Pages.ManageAuthenticator.Name} component={EditAuthenticatorController} options={{
          drawerItemStyle: { height: 0 }
      }}/>
    </drawer.Navigator>
  )
}

const styles = StyleSheet.create({
    pressable:{
      marginRight: 10
    }
})

export default DrawerNavigator; 

