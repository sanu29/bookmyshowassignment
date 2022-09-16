import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>
);