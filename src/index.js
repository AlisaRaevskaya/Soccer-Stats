import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router} from "react-router-dom";

// import Layout from './layouts/Layout';
import "../src/assets/sass/app.scss";

ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );
