import React, { Component } from 'react';




export class Item extends Component{
    constructor(props) {
        super(props);
        this.state = {product: ''};


    }
    render() {
        return (
          <div>
              Item
          </div>
        );
    }
}