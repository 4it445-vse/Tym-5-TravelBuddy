import React, { Component } from 'react';
import { Button, Glyphicon, Modal } from 'react-bootstrap';
import AvatarEditor from "react-avatar-editor";

export class ProfilePictureEditorComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      sliderValue: 1.0,
      show: false,
      pictureURL: "/images/profilePictureDefault.png"
    }
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.setPicture = this.setPicture.bind(this);
  }

  handleSave(){
    var canvas = this.refs.imgEditor.getImage(); // This is a HTMLCanvasElement.
    // It can be made into a data URL or a blob, drawn on another canvas, or added to the DOM.
    let croppedImgURL = canvas.toDataURL('image/jpeg');
      this.props.setPicture(null,croppedImgURL);
      this.hide();

    // If you want the image resized to the canvas size (also a HTMLCanvasElement)
    //var canvasScaled = this.refs.imgEditor.getImageScaledToCanvas();
    //console.log("canvasScaled",canvasScaled);
  }

  handleCancel(){
    this.hide();
  }

  show(){
    this.setState({show:true});
  }

  hide(){
    this.setState({show:false});
  }

  setPicture(pictureURL){
    this.setState({pictureURL:pictureURL})
  }
  render(){
    return(
      <Modal
          show={this.state.show}
          bsSize="large"
          container={this.props.container}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header >
            <Modal.Title id="contained-modal-title">Create profile picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <AvatarEditor
                ref="imgEditor"
                image={this.state.pictureURL}
                width={250}
                height={250}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={this.state.sliderValue}
                style={{display:"block",marginLeft:"auto",marginRight:"auto"}}
                 />
            </div>
          </Modal.Body>
          <Modal.Footer  >

          <div className="col-xs-7 text-center">
            <Glyphicon glyph="picture" style={{fontSize:"100%",verticalAlign:"100%"}}/>
            {" "}
              <input
                type="range"
                style={{width:"68%", maxWidth:"200px",display:"inline",verticalAlign:"50%"}}
                value={this.state.sliderValue}
                min={1.0}
                max={3.0}
                step={.01}
                onChange={(e) =>{this.setState({sliderValue: parseFloat(e.target.value)})}}
                    />
            {" "}
              <Glyphicon glyph="picture" style={{fontSize:"200%",verticalAlign:"25%"}}/>
            </div>
            <div className="col-xs-5" >
              <Button onClick={this.handleCancel} bsSize="small">Cancel</Button>
              <Button onClick={this.handleSave}  bsStyle="primary" bsSize="small">Save</Button>
            </div>

          </Modal.Footer>
        </Modal>


    );
  }
}
