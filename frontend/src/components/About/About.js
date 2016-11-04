import React, {Component} from 'react';
import RegisterInfo from '../RegisterInfo/RegisterInfo';
class About extends Component {

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1>Vítej, kamaráde...Travel Buddy</h1>
                    <p className="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus,
                        tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet
                        risus.</p>
                </div>
                <div>
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-6 alert alert-info">
                            <h4>Co je to Travel Buddy?</h4>
                            <p>Příliš žluťoučký kůň úpěl ďábelské ódy.</p>
                            <h4>Jak mi může pomoct při cestování?</h4>
                            <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur
                                purus sit amet fermentum.</p>
                            <h4>Jak mi může pomoct seznámit se se zahraničnimi hosty?</h4>
                            <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
                        </div>
                        <div className="col-md-6 alert alert-success">
                            <div className="h3">Join TravelBuddy........</div>
                            <div className="pull-right fill"><RegisterInfo/></div>
                        </div>
                    </div>


                    </div>
                </div>
                <div className="container">
                    <div className="col-lg-12">
                        <h4>O platformě....</h4>
                        <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>
                        <h4>Subheading</h4>
                        <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus
                            sit amet fermentum.</p>
                    </div>
                </div>
            </div>

        );
    }
}
export default About;