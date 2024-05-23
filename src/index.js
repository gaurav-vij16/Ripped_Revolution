import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import
import App from './App';                  // Ensure correct import of App
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Correct method call

root.render(
  <BrowserRouter>
    <App />
    <ToastContainer/>
  </BrowserRouter>
);
