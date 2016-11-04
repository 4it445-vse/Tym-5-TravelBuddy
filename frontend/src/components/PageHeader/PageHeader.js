import React, { Component } from 'react';

class PageHeader extends Component {

    render() {
        return (
            <div className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand">Travel Buddy</a>
                    </div>

                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav"></ul>
                    </div>
                </div>
            </div>

        );
    }
}

export default PageHeader;