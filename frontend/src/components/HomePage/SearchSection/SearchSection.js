import React, {Component} from 'react';
import {FilterForm} from './FilterForm';

export class SearchSection extends Component {

    render() {
        return (
            <FilterForm modal={this.props.modal}/>
        );
    }
}
