import React, { Component } from 'react';
import {Button} from 'react-bootstrap';



export class Item extends Component{
    constructor(props) {
        super(props);

}

    render() {
        return (
          <tr>

              <td>{this.props.product.label}</td>
              <td>{this.props.product.price}</td>
              <td>{this.props.product.description}</td>
              <td>
                  <Button type='submit' bsStyle="primary">Detail</Button>
              </td>
              <td>
                  <Button type='submit' bsStyle="primary">Reply</Button>
              </td>

          </tr>

        );
    }
}