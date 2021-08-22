import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';
import Route from './routes';
import AppProvider from './hooks';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <GlobalStyles />
        <Route />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
