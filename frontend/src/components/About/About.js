import React, { Component } from 'react';

class About extends Component {

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1>Vítej, kamaráde...na Travel Buddy</h1>
                    <p className="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                   </div>
                <div className="row marketing">
                    <div className="col-lg-6">
                        <h4>Co je to Travel Buddy?</h4>
                        <p>Příliš žluťoučký kůň úpěl ďábelské ódy.</p>
                        <h4>Jak mi může pomoct při cestování?</h4>
                        <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>
                        <h4>Jak mi může pomoct seznámit se se zahraničnimi hosty?</h4>
                        <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
                    </div>
                    <div className="col-lg-6">
                        <h4>O platformě....</h4>
                        <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>
                        <h4>Subheading</h4>
                        <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;