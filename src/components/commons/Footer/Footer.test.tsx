import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
describe('Footer component', () => {
  test('renders Footer', () => {
    render(<Footer />);
    const footerElement = screen.getByText(/All rights reserved./i);
    expect(footerElement).toBeInTheDocument();
  });
});
