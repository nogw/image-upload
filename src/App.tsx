import React from 'react';
import Upload from './components/Upload';
import GlobalStyle from './styles/GlobalStyles';
import * as dotenv from 'dotenv';
dotenv.config();

function App() {
  return (
    <>
      <Upload/>
      <GlobalStyle/>
    </>
  );
}

export default App;
