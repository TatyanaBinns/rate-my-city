import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Modal from "./components/modal.component";

export default class Login extends Component {

    handleClick = () => {
        this.props.toggle();
    }

    render() {
        return (
            <div className="modal">
                <div className="modal_content">
                    {/* <spam className="close" onClick={this.handleClick}>
                        &times;
                    </spam> */}
                    <p>I'm a Pop Up</p>
                </div>
            </div>
        );
    }
}
