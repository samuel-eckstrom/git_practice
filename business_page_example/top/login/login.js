import React, { Component } from 'react';
import Top from '../top';
import './login.css';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
        }

        this.goodCredentials = this.goodCredentials.bind(this);
    }

    async goodCredentials() {
        let customers = await fetch('/customers/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        });
        customers = await customers.json();
        customers = await JSON.stringify(customers);
        alert(customers);
    }

    render() {
        return (
            <div>
                <Top />
                <div className='login'>
                    <input onChange={e => this.setState({ email: e.target.value })} type='email' placeholder='email' />
                    <input onChange={e => this.setState({ password: e.target.value })} type='password' placeholder='password' />
                    <button onClick={this.goodCredentials}>Submit</button>
                </div>
            </div>
        )
    }
}

export default Login;