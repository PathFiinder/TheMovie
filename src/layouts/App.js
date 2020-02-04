import React, {Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import Header from './Header.js'
import Page from './Page.js'
import Footer from './Footer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      movieList: [],
      tvList: []
    }
  }
  
  render() { 
    return (  
      <BrowserRouter>
        <div className="app">
          <header className="header">
            {<Header />}
          </header>
          <main className="main">
            {<Page />}
          </main>
          <footer className="footer">
            {<Footer />}
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}
 
export default App;