import React, { Component } from 'react';
import { Item } from './Item';
import { Grid, Row, Col} from 'react-bootstrap';
import { FilterForm } from './FilterForm';



export class ItemList extends Component {

render () {
    const productItems = this.props.products.map((product) => {
        return (
              <Item key={product.id} product={product} />
        );
    });

    if (productItems.length > 0) {
      return (
        <div>
          <div className="filterForm">
              <FilterForm/>
          </div>
            <Grid>
                <Row>
                    <Col sm={2} md={2} lg={2}>Label</Col>
                    <Col sm={3} md={3} lg={3}>Description</Col>
                    <Col sm={2} md={2} lg={2}>Price</Col>
                    <Col sm={2} md={2} lg={2}>Detail</Col>
                    <Col sm={2} md={2} lg={2}>Buddy</Col>
                </Row>
                    {productItems}
            </Grid>
        </div>
      );
    } else {
      return (
          <Grid>
              <Row>
                  <Col sm={12} md={12} lg={12}>No records have been found!</Col>
              </Row>
          </Grid>
      );
    }
}
}