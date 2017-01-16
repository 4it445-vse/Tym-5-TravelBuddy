import React, {Component} from 'react';
import api from '../../api.js';

/**
 * TopPropositions component, limit is number of offers to display. Please
 * choose number which is divident to 12 (because of bootstrap 12 column grid)
 */

export class TopPropositions extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        limit: props.limit,
        cssClass: props.className,
        products: [],
      };

      const params = {
        filter: {
          where: {
            picture: {
              like: "%"
            }
          },
          include: {
            relation: 'user',
            scope: {
              where: {
                isActive: true
              }
            }
          },
          include: {
            relation: 'productCity'
          },
          order: "views DESC",
          limit: this.state.limit
        }
      };

      this.fetchProductData(params);
    }

    fetchProductData(params) {
        let srvUrl = "/Products";
        api.get(srvUrl, {params: params})
            .then((response) => {
                if (response.status === 200) {
                    let products = response.data;
                    this.setState({ isLoading: false });
                    this.setState({ products: products });
                    // console.log('--- TopPropositions data', response);
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                // console.log("<!> fetchProductData: ", error);
            });
    }

    render() {
        const products = this.state.products;
        let cols = 12 / this.state.limit;
        return (
          <div className={`item-list ${this.state.cssClass}`}>
              {this.state.isLoading ?
              <div className="loading-bar text-center"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
              :
              <div className="row">
                  {products.map((product, i) => {
                    var imageUrl = "/api/containers/productPictures/download/" + product.picture;
                    var style = {
                      backgroundImage: "url(" + imageUrl + ")",
                    }
                    return (
                      <div className={`item col-md-${cols}`} key={i}>
                          <div className="list-group-item">
                            <div className="title">
                              <h3>{product.label}</h3>
                            </div>
                            <div className="body" style={style}>
                              {/* <img src="../images/product_item_list_placeholder_bg.jpg"/> */}
                              {/* {product.description} */}
                            </div>
                            <div className="footer">
                              <span className="text-center">
                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                &nbsp;
                                {product.productCity.name}
                              </span>
                            </div>
                          </div>
                      </div>
                    );
                  })}
              </div>
              }
          </div>
        );
    }
}
