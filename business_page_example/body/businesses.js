import React, { Component } from 'react';
import './businesses.css';
import IndividualBusiness from './individualBusiness';

class Businesses extends Component {
    constructor(props) {
        super(props);

        this.printAllBusinesses = this.printAllBusinesses.bind(this);
    }

    render() {
        return this.printAllBusinesses();
    }
}

export default Businesses;