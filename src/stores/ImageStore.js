import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';
import ImageActions from '../actions/ImageActions';
import Constants from '../Constants';

let _image = [];

let _images = [];
console.log('ImageStore')

class ImageStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case Constants.RECEIVE_IMAGE:
        _image = action.image;
        _images.push(action.image);
        this.emit('CHANGE');
        break;
        case Constants.REMOVE_PROFILE:
          _image = null;
          this.emit('CHANGE');
          break;
        case Constants.DELETE_IMAGE:
          var { id } = action;
          _images = _images.filter(i => i._id !== id);
          this.emit("CHANGE");
          break;
        case Constants.EDIT_IMAGE:
          _images = action.image;
          this.emit('CHANGE');
          break;
      }
    });
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  get() {
    return _image;
  }

  getAll() {
    return _images;
  }

  deleteImage() {
    return _images;
  }
}

export default new ImageStore();
