import React, { Component } from 'react';
import { PageFooter} from '../components/common/PageFooter/PageFooter';

export class PageNotFound extends Component {
  render() {
    return (
        <div className="ident-top-more">
            <div className="container">
                <div className="row">
                    <div className="col-*-8  col-*-offset-2">
                        <div className="alert alert-warning">
                            <div className="h4">
                                Page not Found
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PageFooter/>
        </div>
    );
  }
}


