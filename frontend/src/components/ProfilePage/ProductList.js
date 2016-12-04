import React, { Component } from 'react';
import { ProductListItem } from './ProductListItem';
import { Grid, Row, Col} from 'react-bootstrap';




export class ItemList extends Component {

    constructor(props) {
        super(props);

        this.product = {
            label: "",
            description: "",
            price: "",
        };
        this.loadUserMain();
        this.getProducts();
    }


    loadUserMain() {
        const userId = localStorage.userId;
        const srvUrl = '/UserMain/' + userId + '?access_token=' + localStorage.accessToken;
        api.get(srvUrl).then((response) => {
            if (response.status === 200) {
                var keys = ["lastName", "firstName", "birthdate", "email"];
                for (let i = 0; i < keys.length; i++) {
                    this.setState({
                        [keys[i]]: response.data[keys[i]]
                    })
                }
                console.log(response);
                this.setState({birthdate: '10/10/2016'});
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
        });
    }

    getProducts() {

        const userId = localStorage.userId;
        if (searchTerm.length > 0) {

            api.get("/Products?access_token=" + localStorage.getItem("accessToken"), {params: this.paramsForSearchTerm(searchTerm)})
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({products: response.data});
                    }
                })
                .catch((error) => {
                    console.log("Error: ", error);
                    console.log("Error: ", error.response);
                });
        } else {
            this.setState({
                    products: []
                }
            );
        }
    }





    render () {
        const productItems = this.props.products.map((product) => {
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