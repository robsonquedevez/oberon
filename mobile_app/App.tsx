import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_300Light, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Saira_600SemiBold, Saira_400Regular } from '@expo-google-fonts/saira';
import Routes from './src/routes';
import AppProvider from './src/hook';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_300Light,
    Roboto_700Bold,
    Saira_600SemiBold,
    Saira_400Regular
  });

  if(!fontsLoaded){
    return null;
  }

  return (
    <AppProvider>
      <Routes />  
    </AppProvider>
  );
}
