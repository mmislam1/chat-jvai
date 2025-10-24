import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store/store"
import { Route,Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>

    
      <div className="flex flex-col bg-[#fff] w-full h-screen text-white">

      </div>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
