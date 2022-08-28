import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Invite from './Invite';
describe('Invite component', () => {
  test('renders Invite', () => {
    render(
      <Router>
        <Invite />
      </Router>
    );
    const InviteElement = screen.getByText(/A better way/i);
    expect(InviteElement).toBeInTheDocument();
  });
  test('Request an Invite', async () => {
    render(
      <Router>
        <Invite />
      </Router>
    );
    const requestBtn = screen.getByRole('invite');
    expect(requestBtn).toBeInTheDocument();
    fireEvent.click(requestBtn);
    await waitFor(() => {
      const alertElement = screen.getByText('Request an invite');
      expect(alertElement).toBeInTheDocument();
    });
  });

  test('Request an Invite Form', async () => {
    render(
      <Router>
        <Invite />
      </Router>
    );
    const requestBtn = screen.getByRole('invite');
    expect(requestBtn).toBeInTheDocument();
    fireEvent.click(requestBtn);
    await waitFor(() => {
      const alertElement = screen.getByText('Request an invite');
      expect(alertElement).toBeInTheDocument();
      const submit = screen.getByTestId('submit');
      expect(submit).toBeInTheDocument();
      fireEvent.submit(submit);
      expect(screen.getByTestId('alertTip')).toHaveTextContent('[name] cannot be empty!');
    });
  });
  // test('Request an Invite Form', async () => {
  //   render(
  //     <Router>
  //       <Invite />
  //     </Router>
  //   );
  //   const requestBtn = screen.getByRole('invite');
  //   expect(requestBtn).toBeInTheDocument();
  //   fireEvent.click(requestBtn);
  //   await waitFor(() => {
  //     const alertElement = screen.getByText('Request an invite');
  //     expect(alertElement).toBeInTheDocument();
  //     const submit = screen.getByTestId('submit');
  //     expect(submit).toBeInTheDocument();
  //     fireEvent.change(screen.getByPlaceholderText('name'), { target: { value: '2312' } });
  //     fireEvent.submit(screen.getByTestId('alertForm'));
  //     expect(screen.getByTestId('alertTip')).toHaveTextContent('[name] cannot be empty!');
  //     console.log(screen.getByTestId('alertTip').innerHTML);
  //   });
  // });
});
