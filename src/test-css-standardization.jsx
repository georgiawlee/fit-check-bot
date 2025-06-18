import React from 'react';
import ReactDOM from 'react-dom/client';
import BasicCssTest from './components/BasicCssTest';
import './styles/main-styles.css'; // Ensure styles are properly imported at this level

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BasicCssTest />
  </React.StrictMode>
);
