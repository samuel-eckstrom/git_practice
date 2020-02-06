import React, { Component } from 'react';
import Top from '../top';
import './businesssignup.css';
import { citiesInIowa, 
    citiesInMinnesota, citiesInNorthDakota, citiesInWisconsin } from '../../body/cityOptions.js';
import IndividualBusiness from '../../body/individualBusiness';

class BusinessSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
                businessButtonClass: 'business-signup-button-nohover',

                name: '',
                email: '',
                password: '',
                specialOne: '',
                specialTwo: '',
                specialThree: '',
                specialFour: '',
                specialFive: '',
                eventOne: '',
                eventTwo: '',
                eventThree: '',
                briefDescription: '',
                hours: '',
                location: '',
                phoneNumber: '',
                website: '',

                currentState: 'IA',
                currentCity: 'Ames',
                currentCityMenu: citiesInIowa
        };

        this.changeToIowa = this.changeToIowa.bind(this);
        this.changeToMinnesota = this.changeToMinnesota.bind(this);
        this.changeToNorthDakota = this.changeToNorthDakota.bind(this);
        this.changeToWisconsin = this.changeToWisconsin.bind(this);
        this.changeButtonClass = this.changeButtonClass.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    changeToIowa(e) {
        this.setState({
            currentState: 'IA',
            currentCity: 'Ames',
            currentCityMenu: citiesInIowa
        })
    }
    
    changeToMinnesota(e) {
        this.setState({
            currentState: 'MN',
            currentCity: 'Apple Valley',
            currentCityMenu: citiesInMinnesota
        })
    }

    changeToNorthDakota(e) {
        this.setState({
            currentState: 'ND',
            currentCity: 'Bismarck',
            currentCityMenu: citiesInNorthDakota
        })
    }

    changeToWisconsin(e) {
        this.setState({
            currentState: 'WI',
            currentCity: 'Appleton',
            currentCityMenu: citiesInWisconsin
        })
    }

    changeButtonClass(e) {
        if (this.state.businessButtonClass === 'business-signup-button-nohover') {
            this.setState({
                businessButtonClass: 'business-signup-button-hover'
            });
        } else {
            this.setState({
                businessButtonClass: 'business-signup-button-nohover'
            });
        }
    }

    async handleSignup(e) {
        let newBusiness = await fetch('/businesses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                specialOne: this.state.specialOne, 
                specialTwo: this.state.specialTwo, 
                specialThree: this.state.specialThree,
                specialFour: this.state.specialFour, 
                specialFive: this.state.specialFive,
                eventOne: this.state.eventOne, 
                eventTwo: this.state.eventTwo, 
                eventThree: this.state.eventThree,
                briefDescription: this.state.briefDescription,
                hours: this.state.hours,
                location: this.state.location,
                state: this.state.currentState,
                city: this.state.currentCity,
                phone: this.state.phoneNumber,
                website: this.state.website
            })
        })
    }

    render() {
        return (
            <div className="body">
                <Top />
                <div className="business-signup-info">
                    <input onChange={e => this.setState({ name: e.target.value })} type="text" placeholder="Name of business..."/>
                    <input onChange={e => this.setState({ email: e.target.value })} type="email" placeholder="Email..." />
                    <input onChange={e => this.setState({ password: e.target.value })} type="password" placeholder="Password..." />
                    <input  type="password" placeholder="Confirm password..." />
                </div>
                <div className="info">
                    <div className="specials">
                        <div className="specials-title">
                            <h2>Specials</h2>
                        </div>
                        <div className="specials-input">
                            <textarea rows="7" onChange={e => this.setState({ specialOne: e.target.value })} type="text" placeholder="Special..."/>
                            <textarea rows="7" onChange={e => this.setState({ specialTwo: e.target.value })} type="text" placeholder="Special..."/>
                            <textarea rows="7"  onChange={e => this.setState({ specialThree: e.target.value })} type="text" placeholder="Special..."/>
                            <textarea rows="7"  onChange={e => this.setState({ specialFour: e.target.value })} type="text" placeholder="Special..."/>
                            <textarea rows="7"  onChange={e => this.setState({ specialFive: e.target.value })} type="text" placeholder="Special..."/>
                        </div>
                    </div>
                    <div className="events">
                        <div className="events-title">
                            <h2>Events</h2>
                        </div>
                        <div className="events-input">
                            <textarea rows="3" onChange={e => this.setState({ eventOne: e.target.value })} type="text" placeholder="Event..."/>
                            <textarea rows="3" onChange={e => this.setState({ eventTwo: e.target.value })} type="text" placeholder="Event..."/>
                            <textarea rows="3" onChange={e => this.setState({ eventThree: e.target.value })} type="text" placeholder="Event..."/>
                        </div>
                    </div>
                    <div className="details">
                        <div className="details-title">
                            <h2>Restaurant details</h2>
                        </div>
                        <div className="details-description">
                            <textarea rows="5" cols="100" onChange={e => this.setState({ briefDescription: e.target.value })} type="text" placeholder="Brief description..."/>
                        </div>
                        <div className="details-hours">
                            <input onChange={e => this.setState({ hours: e.target.value })} type="text" placeholder="Store hours..."/>
                        </div>
                        <div>
                            <input  className="location-address" onChange={e => this.setState({ location: e.target.value })} type="text" placeholder="Address..."/>
                        </div>
                        <div className="location-state">
                            <select className="state-menu">
                                <option onClick={this.changeToIowa} value='IA'>Iowa</option>
                                <option onClick={this.changeToMinnesota} value='MN'>Minnesota</option>
                                <option onClick={this.changeToNorthDakota} value='ND'>North Dakota</option>
                                <option onClick={this.changeToWisconsin} value='WI'>Wisconsin</option>
                            </select>
                        </div>
                        <div className="location-city" onChange={e => this.setState({ currentCity: e.target.value })}>
                            {this.state.currentCityMenu}
                        </div>
                        <div className="contact">
                            <input onChange={e => this.setState({ phoneNumber: e.target.value })} type="text" placeholder="Phone number..."/>
                            <input onChange={e => this.setState({ website: e.target.value })} type="text" placeholder="Website..."/>
                        </div>
                    </div>
                </div>
                <h1 className="intro">This is how your business will appear on the dealscorn feed!</h1>
                <IndividualBusiness currentBusiness={{
                                name: this.state.name,
                                email: this.state.email,
                                password: this.state.password,
                                specials: [this.state.specialOne, this.state.specialTwo, this.state.specialThree,
                                    this.state.specialFour, this.state.specialFive],
                                events: [this.state.eventOne, this.state.eventTwo, this.state.eventThree],
                                briefDescription: this.state.briefDescription,
                                hours: this.state.hours,
                                location: this.state.location,
                                state: this.state.currentState,
                                city: this.state.currentCity,
                                phone: this.state.phoneNumber,
                                website: this.state.website
                               }} />
                <div>
                    <button className={this.state.businessButtonClass} onMouseOver={this.changeButtonClass}
                        onMouseOut={this.changeButtonClass} onClick={this.handleSignup}>Sign up!</button>
                </div>
            </div>
        )
    }
}

export default BusinessSignup;