import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FormDataProvider } from './src/context/FormDataContext';
import { HomeScreen } from './src/screens';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <FormDataProvider>
          <HomeScreen />
        </FormDataProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
