import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Popup from "./Popup";
import { useState } from 'react';


export default class InitialPage extends React.Component {
    state = {
        seen: false
    }

    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        })
    }

    

    render() {
        return (
            <div>
                <div className="input-group mt-1 mb-2">
                    <div className="input-group-append">
                        <button className="btn text-white fw-bold btn-outline-dark btn-secondary">Options</button>
                    </div>

                    <input className="form-control text-center fw-bold" placeholder="Welcome: User Registered" />
                    <div className="input-group-append" onClick={this.togglePop}>
                        {/* <Link to="/login"> */}
                            <button className="btn text-white fw-bold btn-outline-dark btn-secondary">Login / Register</button>
                            <Popup trigger={false} setTrigger={this.state.seen}>
                                <h3>My Popup</h3>
                            </Popup>
                        {/* </Link> */}
                    </div>

                    <div className="input-group-append">
                        <Link to="/settings">
                            <button className="btn text-white fw-bold btn-outline-dark btn-secondary">Settings</button>
                        </Link>
                    </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh'}}>
                    <h1>Rate My City</h1>
                </div>

                <div className="input-group mt-1 mb-2">
                    <input className="form-control" placeholder="Search by City" />
                    <input className="form-control" placeholder="Search by State" />
                    <input className="form-control" placeholder="Search by Username" />
                    <button className="btn text-white fw-bold btn-outline-dark btn-secondary">Search</button>
                    <button className="btn text-white fw-bold btn-outline-dark btn-secondary">Add City</button>
                </div>
                
            </div>
            
                

        )
    }
}
