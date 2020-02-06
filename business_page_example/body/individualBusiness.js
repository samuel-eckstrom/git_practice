import React, { Component } from 'react';
import './individualBusiness.css';

class IndividualBusiness extends Component {
    render() {
        return (
        <div className="business-profile">
            <div className="title">
                <h2>{this.props.currentBusiness.name}</h2>
            </div>
            <div className="business-stuff">
                <div className="profile-box-deals">
                    <h2>Specials:</h2>
                    <ul>{this.props.currentBusiness.specials[0]}</ul>
                    <ul>{this.props.currentBusiness.specials[1]}</ul>
                    <ul>{this.props.currentBusiness.specials[2]}</ul>
                    <ul>{this.props.currentBusiness.specials[3]}</ul>
                    <ul>{this.props.currentBusiness.specials[4]}</ul>
                </div>
                <div className="profile-box-events">
                    <h2>Events:</h2>
                    <ul>{this.props.currentBusiness.events[0]}</ul>
                    <ul>{this.props.currentBusiness.events[1]}</ul>
                    <ul>{this.props.currentBusiness.events[2]}</ul>
                </div>
                <div className="profile-box-details">
                    <h2>Restaurant details:</h2>
                        <div className="profile-box-details-items">
                            <h3>Description: {this.props.currentBusiness.briefDescription}</h3>
                        </div>
                        <div className="profile-box-details-items">
                            <h3>Hours: {this.props.currentBusiness.hours}</h3>
                        </div>
                        <div className="profile-box-details-items">
                            <h3>Location: {this.props.currentBusiness.location}
                            {' '}{this.props.currentBusiness.city}, {this.props.currentBusiness.state}</h3>
                        </div>
                        <div className="profile-box-details-items">
                            <h3>Phone: {this.props.currentBusiness.phone}</h3>
                        </div>
                        <div className="profile-box-details-items">
                            <h3>Website: {this.props.currentBusiness.website}</h3>
                        </div>
                </div>
            </div>
        </div>
        )
    }
}

export default IndividualBusiness;