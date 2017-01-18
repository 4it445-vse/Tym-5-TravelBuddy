import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class SubmitButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name || "",
      isLoading: this.props.isLoading,
      bsStyle: this.props.bsStyle,
      bsSize: this.props.bsSize,
      block: this.props.block,
      type: this.props.type
    }

    // this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ isLoading: nextProps.isLoading });
  }

  render() {
    let isLoading = this.state.isLoading;
    let { bsStyle } = this.state;
    let { bsSize } = this.state;
    if (isLoading) {
      return (
        <Button
          type={this.state.type ? this.state.type : "submit"}
          disabled={isLoading}
          bsStyle={bsStyle}
          bsSize={bsSize}
          // onClick={!isLoading ? this.handleClick : null}
          >
          {this.state.name}&nbsp;<i className="fa fa-spinner fa-pulse fa-fw"></i>
        </Button>
      );
    } else {
      return(
        <Button
          type="submit"
          disabled={isLoading}
          bsStyle={bsStyle}
          bsSize={bsSize}
          // onClick={!isLoading ? this.handleClick : null}
          >
          {this.state.name}
        </Button>
      );
    }
  }
}
