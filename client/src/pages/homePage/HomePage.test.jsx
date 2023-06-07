import React from 'react';
import { render, screen } from '../../utils/test-utils';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './HomePage';
import { getUserInfo } from 'components/navBar/userSlice';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../components/navBar/NavBar', () => () => <div data-testid="mocked-navbar" />);
jest.mock('./LoginButton', () => () => <div data-testid="mocked-login-button" />);
jest.mock('../../components/postsContainer/PostContainer', () => () => <div data-testid="mocked-post-container" />);

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../components/navBar/userSlice', () => ({
  __esModule: true,
  getUserInfo: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  useDispatch.mockImplementation(() => mockDispatch);
  getUserInfo.mockReturnValue(() => jest.fn());
});

afterEach(() => {
  jest.restoreAllMocks();
});
describe('HomePage', () => {
  test('renders NavBar component', () => {
    useSelector.mockReturnValue({ loggedIn: true });
    render(<HomePage />);
    expect(screen.getByTestId('mocked-navbar')).toBeInTheDocument();
  });

  test('renders LoginButton component when not logged in', () => {
    useSelector.mockReturnValue({ loggedIn: false });
    render(<HomePage />);
    expect(screen.getByTestId('mocked-login-button')).toBeInTheDocument();
  });

  test('renders PostContainer component when logged in', () => {
    useSelector.mockReturnValue({ loggedIn: true });
    render(<HomePage />);
    expect(screen.getByTestId('mocked-post-container')).toBeInTheDocument();
  });

  test('dispatches getUserInfo if logged in', () => {
    useSelector.mockReturnValue({ loggedIn: true });
    render(<HomePage />);
    expect(mockDispatch).toHaveBeenCalled();
    expect(getUserInfo).toHaveBeenCalled();
  });
});