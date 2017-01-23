import React, {Component} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { WeatherList } from '../../Weather/WeatherList';
import api from '../../../api.js';
import { startBookingAction } from "../../Booking/actions.js";

export class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            product: [],
            user: [],
            city:[],
            categories:[],
            ownerProfilePicture: undefined

        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.handleStartBooking = this.handleStartBooking.bind(this);
    }

    show(product, city, user, categories) {
        // console.log("Product", product);
        // console.log("User",user);
        // console.log("City", city);
        // console.log("Categories", categories);
        this.setState({ show:true,
            product:product,
            user:user,
            city:city,
            categories:categories});

        this.updateViews(product.id);
        this.getOwnerProfilePicture(user.id);
    }

    hide() {
        this.setState({ show:false });
    }

    updateViews(productId) {
      const srvUrl = '/Products/' + productId + '?access_token=' + localStorage.accessToken;
      api.get(srvUrl)
        .then(({data})=> {
          api.patch(srvUrl, {"views": data.views + 1}).then(({data})=> {

          }).catch((error)=> {
            console.log('<!> updateViews', error);
          });
        })
        .catch((error)=> {
          console.log('<!> updateViews', error);
        });
    }

    returnCategories() {
        var categoriesString = '';
        for (var i = 0; i < this.state.categories.length; i++) {
            categoriesString = categoriesString + this.state.categories[i].name + ',';
        }

        return categoriesString.substr(0, categoriesString.length-1);
    }

    getOwnerProfilePicture(ownerId) {
        const srvUrl = '/UserDetails?access_token=' + localStorage.accessToken;
        let params = {params: {filter: {fields: {profilePicture: true}}, where: {refUserMainId: ownerId}}};
        api.get(srvUrl, params).then((response) => {
            if (response.status === 200) {
              // console.log("Success: ", response);
              this.setState({ ownerProfilePicture: response.data[0].profilePicture });
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
        });
    }

    handleStartBooking() {
      this.hide();
      let data = {
        product: this.state.product,
        owner: this.state.user
      }
      data.product.city = this.state.city;
      data.product.categories = this.state.categories;
      data.owner.profilePicture = this.state.ownerProfilePicture;
      this.props.dispatch(startBookingAction(data.product, data.owner, localStorage.userId));
    }

    render() {
        let productImageUrl = "/api/containers/productPictures/download/"+this.state.product.picture;
        let productStyle = {
          backgroundImage: "url(" + productImageUrl + ")",
        }
        let ownerPictureUrl = "/api/containers/profilePictures/download/"+this.state.ownerProfilePicture;
        let ownerStyle = {
          backgroundImage: "url(" + ownerPictureUrl + ")",
        }
        let buddyLink = "/profile/"+`${this.state.user.id}`;
        return(

            <Modal
                show={this.state.show}
                bsSize="large"
                onHide={this.hide}
                className="detail-product"
                >
                <Modal.Header style={productStyle}>
                    <Modal.Title id="modal-title">{this.state.product.label}</Modal.Title>
                    <span className="price">
                      {this.state.product.price !== 0 ? <i className="fa fa-eur" aria-hidden="true">&nbsp;</i> : undefined}
                      {this.state.product.price === 0 ? "Free!" : this.state.product.price}
                    </span>
                </Modal.Header>
                <Modal.Body>
                    <div className="info-bar">
                      <div className="profile-picture" style={ownerStyle}></div>
                      <span className="name">
                          <Link to={buddyLink}>
                        {`${this.state.user.firstName} ${this.state.user.lastName}`}
                          </Link>
                      </span>
                      <span className="city">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        &nbsp;
                        {this.state.city.name}
                      </span>
                      <span className="category">
                        {this.returnCategories()}
                      </span>
                    </div>
                    <div className="">
                      <p className="description">{this.state.product.description}</p>
                    </div>
                    <WeatherList cityName={this.state.city.name}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {this.hide()}}>Cancel</Button>
                    <Button onClick={() => {this.handleStartBooking()}} type='button' bsStyle="primary">Book</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

//---Mapping functions and React-redux connection

export const DetailProductContainer = connect(
  undefined, undefined, undefined, { withRef: true }
)(DetailProduct);
