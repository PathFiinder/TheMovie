import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Header from './Header.js'
import Page from './Page.js'
import "../sass/app.sass"

const App= () => {
  const apiKey = '6aa21fe13ab8b6d9757477e794498a2c'

  return (  
    <BrowserRouter>
        <div className="app">
          <header className="header">
            {<Header/>}
          </header>
          <main className="main">
            {<Page apiKey={apiKey}/>}
          </main>
        </div>
      </BrowserRouter>
  );
}
 
export default App;
