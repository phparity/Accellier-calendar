import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from 'react-i18next';
import i18n from './config/i18n'
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <I18nextProvider i18n={i18n}>
    <HashRouter>
      <App />
    </HashRouter>
  </I18nextProvider>


);

reportWebVitals();
