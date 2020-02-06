import React, { Component } from 'react';
import './searchArea.css';
import { citiesInIowa, 
    citiesInMinnesota, citiesInNorthDakota, citiesInWisconsin } from './cityOptions';

class SearchArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: 'IA',
            currentCity: 'Ames',
            currentCityMenu: citiesInIowa
        }

        this.changeToIowa = this.changeToIowa.bind(this);
        this.changeToMinnesota = this.changeToMinnesota.bind(this);
        this.changeToNorthDakota = this.changeToNorthDakota.bind(this);
        this.changeToWisconsin = this.changeToWisconsin.bind(this);
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
            currentCity: 'Fargo',
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

    render() {
        return (
            <div className="body-searcharea">
                <div className="search">
                    <select className="state-menu">
                        <option onClick={this.changeToIowa} value='IA'>Iowa</option>
	                    <option onClick={this.changeToMinnesota} value='MN'>Minnesota</option>
	                    <option onClick={this.changeToNorthDakota} value='ND'>North Dakota</option>
	                    <option onClick={this.changeToWisconsin} value='WI'>Wisconsin</option>
                    </select>
                    <div onChange={e => this.setState({ currentCity: e.target.value })}>
                        {this.state.currentCityMenu}
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchArea;