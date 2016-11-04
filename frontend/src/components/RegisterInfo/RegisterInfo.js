import React, { Component } from 'react';
import { Link } from 'react-router';

class RegisterInfo extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-lg-6 col-sm-6">
                    <button className="btn btn-lg btn-primary">
                        <Link to="/registration">Register</Link>
                    </button>
                </div>
            </div>
        );
    }
}

export default RegisterInfo;