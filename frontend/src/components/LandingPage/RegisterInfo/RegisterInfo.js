import React, { Component } from 'react';
import { Link } from 'react-router';

export class RegisterInfo extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-lg-6 col-sm-6">
                    <Link to="/registration">Register</Link>
                </div>
            </div>
        );
    }
}
