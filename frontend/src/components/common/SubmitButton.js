import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class SubmitButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name || "",
      isLoading: this.props.isLoading
    }

    // this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ isLoading: nextProps.isLoading });
  }

  render() {
    let isLoading = this.state.isLoading;
    if (isLoading) {
      return (
        <Button
          bsStyle="primary"
          bsSize="large"
          type="submit"
          block
          disabled={isLoading}
          // onClick={!isLoading ? this.handleClick : null}
          >
          {this.state.name}&nbsp;<i className="fa fa-spinner fa-pulse fa-fw"></i>
        </Button>
      );
    } else {
      return(
        <Button
          bsStyle="primary"
          bsSize="large"
          type="submit"
          block
          disabled={isLoading}
          // onClick={!isLoading ? this.handleClick : null}
          >
          {this.state.name}
        </Button>
      );
    }
  }
}
