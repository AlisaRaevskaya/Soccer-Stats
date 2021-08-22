import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";

// import Layout from './layouts/Layout';
// import MainPage from './pages/Main.js';

import "./styles/style.css";

// import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );

// ReactDOM.render(<Router history={browserHistory}>
//     <Route path="/" component={ Layout }>
//       <IndexRoute component={MainPage}/>
//     </Route>
//   </Router>, document.querySelector('#root'));