import React, { Component } from 'react';
import { ProductListItem } from './ProductListItem';
import { Grid, Row, Col} from 'react-bootstrap';

export class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
            /*label: "",
            description: "",
            price: "",*/
        };
        this.loadProducts();
    }

    loadProducts() {
        const dataUrl = '/UserMain/Me/owns' + '?access_token=' + localStorage.accessToken;
        api.get(dataUrl).then((response) => {
            if (response.status === 200) {
            this.setState({products: response.data.objects}) // pole hodnot - objects - potřeba zjistit atribut, ve kterým se vrací pole
                console.log(response);
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
        });
    }

    render () {
        const productItems = this.state.products.map((product) => {
            return (
                <ProductListItem key={product.id} product={product} />
            );
        });

        if (productItems.length > 0) {
            return (
                <div>
                    <Grid>
                        <Row>
                            <Col sm={2} md={2} lg={2}>Label</Col>
                            <Col sm={3} md={3} lg={3}>Description</Col>
                            <Col sm={2} md={2} lg={2}>Price</Col>
                            <Col sm={2} md={2} lg={2}>Detail</Col>
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