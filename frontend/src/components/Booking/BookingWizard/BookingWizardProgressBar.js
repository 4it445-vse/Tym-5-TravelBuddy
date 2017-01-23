import React, {Component} from 'react';
import { ProgressBar } from 'react-bootstrap';

export class BookingWizardProgressBar extends Component {

    render() {
        let progress = (100 / 3) * this.props.step;
        return (
            <ProgressBar now={progress} />
        );
    }
}
