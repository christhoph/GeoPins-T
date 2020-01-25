import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ContextProviders from "./context";
import ProtectedRoute from "./ProtectedRoute";
import App from "./pages/App";
import Splash from "./pages/Splash";

import "mapbox-gl/dist/mapbox-gl.css";
import * as serviceWorker from "./serviceWorker";

const Root = () => {
  return (
    <Router>
      <ContextProviders>
        <Switch>
          <ProtectedRoute exact path="/" component={App} />
          <Route path="/login" component={Splash} />
        </Switch>
      </ContextProviders>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
