import React, { Component } from 'react';

import './title.css';

let styleOne = {
    color: 'rgb(255,0,0)'
  };
  
  let styleTwo = {
    color: 'rgb(0,255,0)'
  };
  
  let styleThree = {
    color: 'rgb(0,0,255)'
  };

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDot: 1
    }
    this.changeColor = this.changeColor.bind(this);
  }
  
  newColor = setInterval(() => {
    this.changeColor()
  }, 500);
  
  changeColor() {
    if (this.state.currentDot === 1) {
      let red = Math.floor(Math.random() * 256);
      let green = Math.floor(Math.random() * 256);
      let blue = Math.floor(Math.random() * 256);
      this.setState({
        currentDot: 2 //Math.floor((Math.random() * 3) + 1)
      })
      let tempColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
      styleOne = {
        color: tempColor
      }
    } else if (this.state.currentDot === 2) {
      let red = Math.floor(Math.random() * 256);
      let green = Math.floor(Math.random() * 256);
      let blue = Math.floor(Math.random() * 256);
      this.setState({
        currentDot: 3 //Math.floor((Math.random() * 3) + 1)
      })
      let tempColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
      styleTwo = {
        color: tempColor
      }
    } else {
      let red = Math.floor(Math.random() * 256);
      let green = Math.floor(Math.random() * 256);
      let blue = Math.floor(Math.random() * 256);
      this.setState({
        currentDot: 1 //Math.floor((Math.random() * 3) + 1)
      })
      let tempColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
      styleThree = {
        color: tempColor
      }
    }
  }
  
  render() {
    return (
      <div className="title">
        <h1 className="welcome">Welcome</h1>
        <h1 className="dot-one" style={styleOne}>.</h1>
        <h1 className="dot-two" style={styleTwo}>.</h1>
        <h1 className="dot-three" style={styleThree}>.</h1>
      </div>
    );
  }
}
  
  export default Title;