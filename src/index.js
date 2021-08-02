import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Provider} from 'react-redux';
// import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <Provider store={store}>
//     <StrictMode>
//       <App />
//     </StrictMode>
//   </Provider>,
//   document.getElementById('root')
// );

reportWebVitals();
