/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { Provider, MD3LightTheme } from 'react-native-paper';
import AuthContextProvider from './src/context/AuthContext';
import DrawerNavigation from './src/navigation/DrawerNavigation';
// import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#000000db',
    secondary: '#2D388A',
  },
};
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <>
    <AuthContextProvider>
      <Provider theme={theme}>
      {/* <Toast ref = {(ref) => Toast.setRef(ref)} /> */}
        <DrawerNavigation />
      </Provider>
    </AuthContextProvider>
  </>;
};

export default App;
