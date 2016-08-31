import { browserHistory } from 'react-router'

const RouteActions = {
  route(path) {
    console.log("path from RouteActions: ", path)
    browserHistory.push(path);
  }
};

export default RouteActions;
