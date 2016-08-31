import React, { Component } from 'react';
import ImageActions from '../actions/ImageActions'

export default class FileUploader extends Component {
  constructor() {
    super();

    this.state = {
      file: '',
      imagePreviewUrl: ''
    };

    this._onInputChange = this._onInputChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    // this._submitFile = this._submitFile.bind(this);

  }
  _onSubmit(event) {
    event.preventDefault();
    ImageActions.submitFile(this.state.file);
  }

  _onInputChange(event) {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;

    let ImagePreview = imagePreviewUrl && <img className="img" src={imagePreviewUrl} />;

    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <input type="file" name="" onChange={this._onInputChange} />
          <button>Upload Image</button>
        </form>
        {/* {ImagePreview} */}
      </div>
    )
  }
}
