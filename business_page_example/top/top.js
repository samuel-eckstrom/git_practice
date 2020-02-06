import React, { Component } from 'react';
import './top.css';
import { Link } from 'react-router-dom';

class Top extends Component {

    constructor(props) {
        super(props);
        this.state = {
            home: 'info-items-nohover-home',
            login: 'info-items-nohover-login',
            signup: 'info-items-nohover-signup',
            businessSignup: 'info-items-nohover-businesssignup'
        };

        this.changeStyleHome = this.changeStyleHome.bind(this);
        this.changeStyleLogin = this.changeStyleLogin.bind(this);
        this.changeStyleSignup = this.changeStyleSignup.bind(this);
        this.changeStyleBusinessSignup = this.changeStyleBusinessSignup.bind(this);
    }

    changeStyleHome(e) {
        if (this.state.home === 'info-items-nohover-home') {
            this.setState({
                home: 'info-items-hover-home'
            });
        } else {
            this.setState({
                home: 'info-items-nohover-home'
            });
        }
    }

    changeStyleLogin(e) {
        if (this.state.login === 'info-items-nohover-login') {
            this.setState({
                login: 'info-items-hover-login'
            });
        } else {
            this.setState({
                login: 'info-items-nohover-login'
            });
        }
    }

    changeStyleSignup(e) {
        if (this.state.signup === 'info-items-nohover-signup') {
            this.setState({
                signup: 'info-items-hover-signup'
            });
        } else {
            this.setState({
                signup: 'info-items-nohover-signup'
            });
        }
    }

    changeStyleBusinessSignup(e) {
        if (this.state.businessSignup === 'info-items-nohover-businesssignup') {
            this.setState({
                businessSignup: 'info-items-hover-businesssignup'
            });
        } else {
            this.setState({
                businessSignup: 'info-items-nohover-businesssignup'
            });
        }
    }
    
    render() {
        return (
            <div className="website-info">
                <div className="main-title">
                    <h1>dealscorn</h1>
                </div>
                <div className="sub-info">
                    <Link to="/"><h2 className={this.state.home} onMouseOver={this.changeStyleHome}
                        onMouseOut={this.changeStyleHome}>Home</h2></Link>
                    <h2 className={this.state.login} onMouseOver={this.changeStyleLogin}
                        onMouseOut={this.changeStyleLogin}><Link to="/login">Log in</Link></h2>
                    <h2 className={this.state.signup} onMouseOver={this.changeStyleSignup}
                        onMouseOut={this.changeStyleSignup}><Link to="/signup">Sign up</Link></h2>
                    <Link to="/signup-business"><h2 className={this.state.businessSignup} onMouseOver={this.changeStyleBusinessSignup}
                        onMouseOut={this.changeStyleBusinessSignup}>Business sign up</h2></Link>
                </div>
            </div>
        );
    }
}

export default Top;