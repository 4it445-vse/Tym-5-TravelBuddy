import React, {Component} from 'react';
import {FilterForm} from './FilterForm';

export class SearchSection extends Component {

    render() {
        return (
            <div className="container">
                <div className="filterForm">
                    <FilterForm modal={this.props.modal}/>
                </div>
            </div>
        );
    }
}
