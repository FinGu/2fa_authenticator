import { NavigationContainer } from '@react-navigation/native';
import DrawerController from '../../controllers/DrawerController';

const Main = () => {
  return (
    <NavigationContainer>
        <DrawerController />
    </NavigationContainer>
  );
}

export default Main;
