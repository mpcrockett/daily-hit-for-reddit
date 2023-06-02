import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import postReducer from '../components/postsContainer/postSlice';
import themeReducer from '../pages/homePage/themeSlice';
import userReducer from '../components/navBar/userSlice';

const preloadedState = {
  posts: {
    posts: {
      allPosts: [],
      subPosts: [],
    },
    subreddits: [],
    votes: {}
  },
  user: { 
   user: { 
     username: '',
      iconImg: '',
    },
    loggedIn: false,
  },
  theme: { 
    mode: "light"
  }
};

const testStore = configureStore({ reducer: { posts: postReducer, theme: themeReducer, user: userReducer }, preloadedState })

const mockTheme = {
  palette: {
    mode: 'light',
  },
};

const AllTheProviders = ({children}) => {
  return (
    <Provider store={testStore}>
      <BrowserRouter>
        <ThemeProvider theme={mockTheme}>
          {children}
        </ThemeProvider>
      </BrowserRouter> 
    </Provider>
  )
};

const testRender = (ui, options) => 
  render(ui, { wrapper: AllTheProviders, ...options});

export * from '@testing-library/react';

export { testRender as render };