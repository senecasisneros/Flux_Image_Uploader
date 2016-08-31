import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from './components/Layout'
import Splash from './components/Splash'
import ImageForm from './components/ImageForm'
import css from './css/style.css'

import ImageStore from './stores/ImageStore'

render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Splash} />
      <Route path='photos' component={ImageForm}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
