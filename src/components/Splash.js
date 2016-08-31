import React, { Component } from 'react';
import ImageStore from '../stores/ImageStore';
import ImageActions from '../actions/ImageActions';

export default class Splash extends Component {
  render() {

    return (
      <div>
        <h1 className="text-center">
          <span id="splash"></span>
        </h1>
      </div>
    )
  }
}
