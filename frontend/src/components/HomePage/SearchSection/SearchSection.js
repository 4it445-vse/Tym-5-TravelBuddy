import React, {Component} from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';


export class SearchSection extends Component {
    constructor(props) {
        super(props);

    }



    render() {
        const fields = [
            /*key, label, type, desc*/
            ['location', 'Location', 'text', ''],
            ['service', 'Service category', 'text', ''],
            ['product', 'Product', 'text', ''],
            ['price', 'Price ($)', 'text', ''],
            ['rating', 'Rating', 'text', ''],
        ];

        return (
            <div className="container">
                <div className="h3">Search</div>
                <form>
                {fields.map(([key, label, type, desc]) => {
                return (
                    <div className="form-group">
                        <label for="exampleInputEmail1">{label}</label>
                        <input type={type} className="form-control" id="exampleInputEmail1" placeholder={label}/>

                            </div>
                   );})}

                <Button type="submit" bsStyle="primary">Search!</Button>
                </form>
            </div>
        );
    }
}