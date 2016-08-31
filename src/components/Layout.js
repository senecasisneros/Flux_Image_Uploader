import React, { Component } from 'react';
// import Navbar from './Navbar'
import ImageForm from './ImageForm'
import FileUploader from './FileUploader'
import axios from 'axios';


export default class Layout extends Component {
  constructor() {
  super();

}

  render() {
    return (
      <div className="container">
      <h1>Flux Image Uploader</h1>
        <ImageForm />
        <FileUploader submitFile={this._submitFile}/>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}
