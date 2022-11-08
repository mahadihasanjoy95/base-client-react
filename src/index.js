import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter} from 'react-router-dom';
import MainRoutes from "./routes";
import './lang/i18n';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter basename={`/`}>
          <MainRoutes/>
      </BrowserRouter>
  </React.StrictMode>
);

// **************** Author: Bokhtyer Abid || bokhtyer.abid@shadhinlab.com *************** //
// **************** React 17 *************** //
// ReactDOM.render(<Root/>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
