import {useNavigation} from '@react-navigation/native';
import DrawerNavigator from '../components/DrawerNavigator';
import Constants from '../Constants';

const DrawerController = () => {
    const navigation = useNavigation()

    return <DrawerNavigator 
      add_authenticator_on_press={() => {
          //@ts-ignore
          navigation.navigate(Constants.Pages.AddAuthenticator.Name)
      }}
      qr_code_on_press={() => {
          //@ts-ignore
          navigation.navigate(Constants.Pages.QRCode.Name) 
      }
    }/>
};

export default DrawerController;


