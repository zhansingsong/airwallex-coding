import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';
describe('Home component', () => {
  test('renders Home', async () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const HomeElement = screen.getByTestId('home');
    expect(HomeElement).toBeInTheDocument();
  });
});
