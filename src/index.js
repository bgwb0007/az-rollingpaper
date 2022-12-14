import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
document.getElementsByTagName('head')[0].appendChild(meta);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

