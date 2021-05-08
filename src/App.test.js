import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers  from './reducers';
 
import App from './App';

const store = createStore(reducers, applyMiddleware(thunk));
 
describe('App', () => {
  test('renders App component', () => {
    render(
        <Provider store={store}>
            <App/>
        </Provider>
    );

    screen.getByText('Order');
    screen.getByText('Name');
  });
});