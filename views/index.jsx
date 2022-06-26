import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { GlobalProvider } from './store';
import App from './containers/App';

const root = createRoot(document.getElementById('root'));

root.render(
  <GlobalProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalProvider>,
);
