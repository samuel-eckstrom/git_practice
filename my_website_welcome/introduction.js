import React, { Component } from 'react';
import './introduction.css';

class Introduction extends Component {
  constructor(props) {
    super(props);
    this.checkServer = this.checkServer.bind(this);
  }

  async checkServer() {
    const data = await fetch('/api/world', {
      
    })
  }

  render() {
    return (
      <div className="introduction">
        <h2>What we are about...</h2>
        <button onClick={this.checkServer}>click me</button>
      </div>
    );
  }
}

export default Introduction;