import axios from 'axios';
import ImageActions from './actions/ImageActions';
import ServerActions from './actions/ServerActions';

console.log('API')
const API = {
  getImage(id) {
    axios.get(`/api/images/${id}`)
    .then(res => {
      // console.log('getImage:', res)
    })
    .then(ServerActions.receiveImage)
    .catch(console.error)
  },

  submitFile(file) {
    let data = new FormData();
    data.append('image', file);

    axios.post(`/api/images`, data)
    .then(res => res.data)
    .then(ServerActions.receiveImage)
    .catch(console.err)
  },


  createImage(image) {
    axios.post('/api/images', image)
    .then(res =>  res.data)
    .then(ServerActions.receiveImage)
    .catch(console.error);
  },

  deleteImage(id) {
    axios.delete(`/api/images/${id}`)
    .then(ServerActions.deleteImage(id))
    .catch(console.error);
  },

  editImage(id) {
    axios.put(`/api/images/${id}`)
    .then(res => {
      ServerActions.editImage(res.data);
    }
  )
  // .then(ServerActions.editImage)
  .catch(console.error);
}

}

export default API;
