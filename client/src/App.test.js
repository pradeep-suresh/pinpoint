import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

import { Provider } from 'react-redux'
import store from './app/store';

test('renders learn react link', () => {
  render(   
  < Provider store={store}>
    <App />
  </Provider>
);
  const linkElement = screen.getByText(/Url Shortener/i);
  expect(linkElement).toBeInTheDocument();
});

