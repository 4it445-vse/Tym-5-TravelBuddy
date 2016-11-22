import React, { Component } from 'react';
import '../../../../public/css/SlideIndicatorStyle.css';

export class SlideIndicator extends Component {
  constructor(props) {
    super(props);
    const { show } = this.props;
    this.state = {
      "show": show
    }
  }

  render() {
    return (
      <ol className="tb-slide-indicators">
        <li className=""></li>
        <li className=""></li>
        <li className=""></li>
      </ol>
    );
  }
}
