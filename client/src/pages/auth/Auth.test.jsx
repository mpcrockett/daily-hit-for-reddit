import React from 'react';
import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authorizeUser } from '../../components/navBar/userSlice';
import Auth from './Auth';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../../components/navBar/userSlice', () => ({
  __esModule: true,
  authorizeUser: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

beforeEach(() => {
  useNavigate.mockImplementation(() => mockNavigate);
  useSelector.mockReturnValue({ loggedIn: false });
  useDispatch.mockImplementation(() => mockDispatch);
  authorizeUser.mockReturnValue(() => jest.fn());
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Auth', () => {
  test('dispatches authorizeUser action with urlCode and urlState', () => {
    render(<Auth />);
    const location = 'http://example.com?code=test-code&state=test-state';
    expect(mockDispatch).toHaveBeenCalled();
    // You can also assert the specific action creator and arguments if necessary
    expect(mockDispatch).toHaveBeenCalledWith(authorizeUser('test-code', 'test-state'));
  });

  test('navigates to "/" when isLoggedIn is true', () => {
    useSelector.mockReturnValue({ loggedIn: true });
    render(<Auth />);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('does not navigate when isLoggedIn is false', () => {
    useSelector.mockReturnValue({ loggedIn: false });
    render(<Auth />);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
