import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { 
  persistReducer, 
  FLUSH, 
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import postsReducer from '../components/tileContainer/postSlice';
import authReducer from '../pages/auth/authSlice';
import themeReducer from '../pages/homePage/themeSlice';
import userReducer from '../pages/profilePage/userSlice';

const persistConfig = {
  key: "root",
  storage,
  version: 1
};

const combinedReducers = combineReducers(
  { posts: postsReducer, auth: authReducer, theme: themeReducer, user: userReducer }
  );

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    },
  })
});