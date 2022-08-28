import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Alert from './Alert';
describe('Alert component', () => {
  test('renders default Alert', async () => {
    render(<Alert />);
    const alertElement = screen.getByText(/All done/i);
    expect(alertElement).toBeInTheDocument();
    const okButton = screen.getByText('Ok');
    fireEvent.click(okButton);
    await waitFor(() => {
      const style = screen.getByRole('alert');
      expect(style).toHaveAttribute('data-visibility', 'false');
    });
  });
  test('renders custom Alert', async () => {
    render(
      <Alert title="custom alert">
        <p>hello world!</p>
      </Alert>
    );
    const alertElement = screen.getByText(/custom alert/i);
    expect(alertElement).toBeInTheDocument();
    const infoElement = screen.getByText('hello world!');
    expect(infoElement).toBeInTheDocument();
  });
});
