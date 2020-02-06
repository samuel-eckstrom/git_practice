import React, { Component } from 'react';
import './signup.css';
import Top from '../top';
import { customers } from './customers.js';
import { Link } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerButtonClass: 'send-customer-nohover',
            businessButtonClass: 'send-business-nohover',
            customerFirstName: '',
            customerLastName: '',
            customerEmail: '',
            customerPassword: '',
            customerConfirmPassword: '',
        }

        this.hoverCustomerSendButton = this.hoverCustomerSendButton.bind(this);
        this.finalizeCustomerResponse = this.finalizeCustomerResponse.bind(this);
    }

    hoverCustomerSendButton(e) {
        if (this.state.customerButtonClass === 'send-customer-nohover') {
            this.setState({
                customerButtonClass: 'send-customer-hover'
            })
        } else {
            this.setState({
                customerButtonClass: 'send-customer-nohover'
            })
        }
    }

    async finalizeCustomerResponse(e) {
        let newCustomer = await fetch('/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: this.state.customerFirstName,
                lastName: this.state.customerLastName,
                email: this.state.customerEmail,
                password: this.state.customerPassword
            })
        })
    }

    render() {
        return (
            <div>
                <Top />
                <div className="signup">
                    <div className="customer-signup">
                        <h1>Customer sign up!</h1>
                        <input onChange={e => this.setState({ customerFirstName: e.target.value })} type="text" id="first" placeholder="First Name..."/>
                        <input onChange={e => this.setState({ customerLastName: e.target.value })} type="text" id="last" placeholder="Last Name..."/>
                        <input onChange={e => this.setState({ customerEmail: e.target.value })} type="email" id="email" placeholder="Email..."/>
                        <input onChange={e => this.setState({ customerPassword: e.target.value })} type="password" id="password" placeholder="Password..."/>
                        <input onChange={e => this.setState({ customerConfirmPassword: e.target.value })} type="password" id="confirm" placeholder="Confirm Password..."/>
                        <Link to="/"><button className={this.state.customerButtonClass} onMouseOver={this.hoverCustomerSendButton} 
                            onMouseOut={this.hoverCustomerSendButton} onClick={this.finalizeCustomerResponse}>Sign up</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;