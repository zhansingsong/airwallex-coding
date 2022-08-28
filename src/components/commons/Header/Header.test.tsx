import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
describe('Header component', () => {
  test('renders Header', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const headerElement = screen.getByText(/Broccoli & Co./i);
    expect(headerElement).toBeInTheDocument();
  });
});
