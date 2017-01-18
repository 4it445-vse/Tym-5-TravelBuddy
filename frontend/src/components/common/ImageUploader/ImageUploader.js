import React, { Component } from 'react';
import { Button, Glyphicon, Image, Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import AvatarEditor from "react-avatar-editor";

export class ImageUploader extends Component{
  constructor(props){
    super(props);
    this.state = {
      sliderValue: 1.0,
      show: false,
      imageURL: null,
    }
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.setImage = this.setImage.bind(this);
  }

  handleSave(){
    this.hide();
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
  getImage() {
    return this.state.imageURL;
  }
  setImage(imageURL){
    this.setState({imageURL:imageURL})
  }
  handleImageChange(event) {
      event.preventDefault();

      let reader = new FileReader();
      let file = event.target.files[0];
      event.target.value = '';
      reader.onloadend = () => {
          this.show();
          this.setImage(reader.result);
      }
      reader.onabort = () => {
          console.log("aborted-.");
      }
      reader.onerror = () => {
          console.log("error");
      }
      reader.readAsDataURL(file);
  }
  render(){
      return (
        <div>
          <div>
            <div style={{display:"inline-block"}}>
              <Image height="100px" width="100px" src={this.state.imageURL ? this.state.imageURL : "/images/imageDefault.jpg"}  thumbnail/>
            </div>
            <div style={{display:"inline-block", margin:"10px"}}>
              <input type="file" ref="fileInput" style={{display: "none"}} onChange={(e)=>this.handleImageChange(e)} accept="image/*" autoComplete="off"/>
              <Button type="submit" onClick={(e) => {e.preventDefault(); var input = ReactDOM.findDOMNode(this.refs.fileInput); input.click(); input.value = null;}}>
                Choose photo
              </Button>

            </div>
          </div>
          <Modal
              show={this.state.show}
              bsSize="large"
              aria-labelledby="contained-modal-title"
              className="modal-create-profile-picture"
            >
              <Modal.Header >
                <Modal.Title id="contained-modal-title">Upload Image</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <AvatarEditor
                    ref="imgEditor"
                    image={this.state.imageURL}
                    width={250}
                    height={250}
                    border={50}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={this.state.sliderValue}
                    style={{display:"block",marginLeft:"auto",marginRight:"auto"}}
                     />
                </div>
                <div className="row range-input text-center">
                  <Glyphicon glyph="picture" style={{fontSize:"100%",verticalAlign:"100%"}}/>
                  &nbsp;
                    <input
                      type="range"
                      style={{width:"68%", maxWidth:"200px",display:"inline",verticalAlign:"50%"}}
                      value={this.state.sliderValue}
                      min={1.0}
                      max={3.0}
                      step={.01}
                      onChange={(e) =>{this.setState({sliderValue: parseFloat(e.target.value)})}}
                          />
                  &nbsp;
                    <Glyphicon glyph="picture" style={{fontSize:"200%",verticalAlign:"25%"}}/>
                </div>
              </Modal.Body>
              <Modal.Footer  >
                  <Button onClick={this.handleCancel} bsSize="small">Cancel</Button>
                  <Button onClick={this.handleSave}  bsStyle="primary" bsSize="small">Save</Button>
              </Modal.Footer>
            </Modal>
          </div>

    );
  }
}
