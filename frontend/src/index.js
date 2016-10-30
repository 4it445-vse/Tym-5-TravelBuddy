import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { configureStore } from './store/configureStore.js';

const store = configureStore()

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
