import API from '../API'

const ImageActions = {
  getImage(id) {
    API.getImage(id);
  },
  createImage(image) {
    API.createImage(image);
  },
  deleteImage(id) {
    API.deleteImage(id);
  },
  editImage(id) {
    API.editImage(id);
  },
  submitFile(file) {
    API.submitFile(file);
  }
};

export default ImageActions;
