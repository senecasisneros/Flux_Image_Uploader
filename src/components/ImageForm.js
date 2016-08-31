import React, { Component } from 'react'
import ImageActions from '../actions/ImageActions'
import { browserHistory } from 'react-router';
import ImageStore from '../stores/ImageStore';
//
//
export default class ImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: '',
      images: []
    }
    this._onChange = this._onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  componentDidMount() {
    ImageStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    ImageStore.stopListening(this._onChange);
  }

  _onChange(event) {
    let image = ImageStore.get();
    let images = ImageStore.getAll();
    let { name, url } = image;
    this.setState({
      name, url,
      name: '',
      url: '',
      images: images
    });
  }

  deleteImage(id) {
    ImageActions.deleteImage(id);
  }
//
  onSubmit(event) {
    event.preventDefault();
    let { name, url, file} = this.state;


    ImageActions.createImage({ name, url, file});
    this.setState({
      image: ImageStore.get()
    });
  }

  render() {
    let {name, url} = this.state;
    let Images = this.state.images.map((image, i) => {
      return (
        <div className="container" key={i}>
        <img src={image.url} />
        <p>{image.name}    </p>
        <a onClick={this.deleteImage.bind(null, image._id)}>x</a>
        </div>
      );
    })
    return <ul>{Images}</ul>
  }
}
