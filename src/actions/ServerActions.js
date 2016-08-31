import AppDispatcher from '../AppDispatcher';
import Constants from '../Constants';

const ServerActions = {

  receiveImage(image) {
    AppDispatcher.dispatch({
      type: Constants.RECEIVE_IMAGE,
      image
    })
  },

  deleteImage(id) {
    AppDispatcher.dispatch({
      type: 'DELETE_IMAGE',
      id
    })
  },

  editImage(image) {
    AppDispatcher.dispatch({
      type: 'Constants.EDIT_IMAGE',
      image
    })
  }
};

export default ServerActions;
