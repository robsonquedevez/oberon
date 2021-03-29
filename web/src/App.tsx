import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';

import Route from './routes';

function App() {
  return (
    <BrowserRouter>
      <Route />
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
