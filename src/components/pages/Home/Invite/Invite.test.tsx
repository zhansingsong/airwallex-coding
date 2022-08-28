import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'; // eslint-disable-line
import Invite from './Invite';

jest.mock('axios', () => {
  return {
    __esModule: true,
    default: (agrs: any) => {
      // eslint-disable-line
      return agrs.data.email === 'usedemail@airwallex.com'
        ? Promise.reject({
            response: { data: { errorMessage: 'Bad Request: Email is already in use' } }, // eslint-disable-line
          }) // eslint-disable-line
        : Promise.resolve('Registered');
    },
  };
});
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

  test('[name] field validation1', async () => {
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
  test('[name] field validation2', async () => {
    render(
      <Router>
        <Invite />
      </Router>
    );
    const requestBtn = screen.getByRole('invite');
    expect(requestBtn).toBeInTheDocument();
    fireEvent.click(requestBtn);
    await waitFor(async () => {
      const alertElement = screen.getByText('Request an invite');
      expect(alertElement).toBeInTheDocument();
      const submit = screen.getByTestId('submit');
      expect(submit).toBeInTheDocument();
      user.type(await screen.getByPlaceholderText('name'), '12');
      fireEvent.submit(await screen.getByTestId('alertForm'));
      const alertTip = await screen.getByTestId('alertTip');
      expect(alertTip).toHaveTextContent('[name] cannot be less than 3 characters long!');
    });
  });
  test('[email] field validation1', async () => {
    render(
      <Router>
        <Invite />
      </Router>
    );
    const requestBtn = screen.getByRole('invite');
    expect(requestBtn).toBeInTheDocument();
    fireEvent.click(requestBtn);
    await waitFor(async () => {
      const alertElement = screen.getByText('Request an invite');
      expect(alertElement).toBeInTheDocument();
      const submit = screen.getByTestId('submit');
      expect(submit).toBeInTheDocument();
      user.type(screen.getByPlaceholderText('name'), '1244');
      fireEvent.submit(screen.getByTestId('alertForm'));
      const alertTip = await screen.getByTestId('alertTip');
      expect(alertTip).toHaveTextContent('[email] cannot be empty!');
    });
  });
  test('[email] field validation2', async () => {
    render(
      <Router>
        <Invite />
      </Router>
    );
    const requestBtn = screen.getByRole('invite');
    expect(requestBtn).toBeInTheDocument();
    fireEvent.click(requestBtn);
    await waitFor(async () => {
      const alertElement = screen.getByText('Request an invite');
      expect(alertElement).toBeInTheDocument();
      const submit = screen.getByTestId('submit');
      expect(submit).toBeInTheDocument();
      user.type(screen.getByPlaceholderText('name'), '1244');
      user.type(screen.getByPlaceholderText('email'), '1244');
      fireEvent.submit(screen.getByTestId('alertForm'));
      const alertTip = await screen.getByTestId('alertTip');
      expect(alertTip).toHaveTextContent('[email] is not a valid email!');
    });
  });
  test('[email] field validation3', async () => {
    render(
      <Router>
        <Invite />
      </Router>
    );
    const requestBtn = screen.getByRole('invite');
    expect(requestBtn).toBeInTheDocument();
    fireEvent.click(requestBtn);
    await waitFor(async () => {
      const alertElement = screen.getByText('Request an invite');
      expect(alertElement).toBeInTheDocument();
      const submit = screen.getByTestId('submit');
      expect(submit).toBeInTheDocument();
      user.type(screen.getByPlaceholderText('name'), '1244');
      user.type(screen.getByPlaceholderText('email'), '123@121');
      fireEvent.submit(screen.getByTestId('alertForm'));
      const alertTip = await screen.getByTestId('alertTip');
      expect(alertTip).toHaveTextContent('[email] is not a valid email!');
    });
  });
  test('[Confirm email] field validation1', async () => {
    render(
      <Router>
        <Invite />
      </Router>
    );
    const requestBtn = screen.getByRole('invite');
    expect(requestBtn).toBeInTheDocument();
    fireEvent.click(requestBtn);
    await waitFor(async () => {
      const alertElement = screen.getByText('Request an invite');
      expect(alertElement).toBeInTheDocument();
      const submit = screen.getByTestId('submit');
      expect(submit).toBeInTheDocument();
      user.type(screen.getByPlaceholderText('name'), '1244');
      user.type(screen.getByPlaceholderText('email'), '123@121.com');
      fireEvent.submit(screen.getByTestId('alertForm'));
      await waitFor(async () => {
        const alertTip = await screen.getByTestId('alertTip');
        expect(alertTip).toHaveTextContent('[Confirm email] cannot be empty!');
      });
    });
  });
  test('[Confirm email] field validation2', async () => {
    render(
      <Router>
        <Invite />
      </Router>
    );
    const requestBtn = screen.getByRole('invite');
    expect(requestBtn).toBeInTheDocument();
    fireEvent.click(requestBtn);
    await waitFor(async () => {
      const alertElement = screen.getByText('Request an invite');
      expect(alertElement).toBeInTheDocument();
      const submit = screen.getByTestId('submit');
      expect(submit).toBeInTheDocument();
      user.type(screen.getByPlaceholderText('name'), '1244');
      user.type(screen.getByPlaceholderText('email'), '123@121.com');
      user.type(screen.getByPlaceholderText('Confirm email'), '123@.com');
      fireEvent.submit(screen.getByTestId('alertForm'));
      await waitFor(async () => {
        const alertTip = await screen.getByTestId('alertTip');
        expect(alertTip).toHaveTextContent('[Confirm email] confirmation is incorrect！');
      });
    });
  });
  test('form submit ok', async () => {
    render(
      <Router>
        <Invite />
      </Router>
    );
    const requestBtn = screen.getByRole('invite');
    expect(requestBtn).toBeInTheDocument();
    fireEvent.click(requestBtn);
    await waitFor(async () => {
      const alertElement = screen.getByText('Request an invite');
      expect(alertElement).toBeInTheDocument();
      const submit = screen.getByTestId('submit');
      expect(submit).toBeInTheDocument();
      user.type(screen.getByPlaceholderText('name'), '1244');
      user.type(screen.getByPlaceholderText('email'), '123@121.com');
      user.type(screen.getByPlaceholderText('Confirm email'), '123@121.com');
      fireEvent.submit(screen.getByTestId('alertForm'));
      const alertTip = await screen.getByText('sending! please wait');
      expect(alertTip).toBeInTheDocument();
      await waitFor(async () => {
        const ok = await screen.getByText('Ok');
        expect(ok).toBeInTheDocument();
      });
    });
  });
  test('form submit fail', async () => {
    render(
      <Router>
        <Invite />
      </Router>
    );
    const requestBtn = screen.getByRole('invite');
    expect(requestBtn).toBeInTheDocument();
    fireEvent.click(requestBtn);
    await waitFor(async () => {
      const alertElement = screen.getByText('Request an invite');
      expect(alertElement).toBeInTheDocument();
      const submit = screen.getByTestId('submit');
      expect(submit).toBeInTheDocument();
      user.type(screen.getByPlaceholderText('name'), '1244');
      user.type(screen.getByPlaceholderText('email'), 'usedemail@airwallex.com');
      user.type(screen.getByPlaceholderText('Confirm email'), 'usedemail@airwallex.com');
      fireEvent.submit(screen.getByTestId('alertForm'));
      await waitFor(async () => {
        const alertTip = await screen.getByTestId('alertTip');
        expect(alertTip).toHaveTextContent('Bad Request: Email is already in use');
      });
    });
  });
});
