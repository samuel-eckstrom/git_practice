import React, { Component } from 'react';
import './App.css';
import Top from './top/top.js';
import SearchArea from './body/searchArea.js';

class App extends Component {
  render() {
    return (
      <div>
        <Top />
        <SearchArea />
      </div>
    );
  }
}


export default App;