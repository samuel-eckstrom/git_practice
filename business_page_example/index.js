import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import Signup from './top/signup/signup.js';
import BusinessSignup from './top/businesssignup/businesssignup.js';
import Login from './top/login/login.js';
import Settings from './top/settings/settings.js'
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

const Root = () => (
    <Router>
        <Route exact path='/' component={App} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signup-business' component={BusinessSignup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/settings' component={Settings} />
    </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
