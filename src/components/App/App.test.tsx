import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
describe('App component', () => {
  test('renders App', async () => {
    render(<App />);
    await waitFor(async () => {
      const AppElement = await screen.getByTestId('app');
      expect(AppElement).toBeInTheDocument();
    });
  });
});
