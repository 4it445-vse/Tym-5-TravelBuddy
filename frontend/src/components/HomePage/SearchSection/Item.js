import React, { Component } from 'react';
import {Button} from 'react-bootstrap';



export class Item extends Component{
    constructor(props) {
        super(props);

}



    render() {
        const productItem = {cityName: this.props.product.productCity.name,
            label: this.props.product.label,
            price: this.props.product.price}
        return (

          <tr>
              <td>{productItem.cityName}</td>
              <td>{productItem.label}</td>
              <td>{productItem.price}</td>
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