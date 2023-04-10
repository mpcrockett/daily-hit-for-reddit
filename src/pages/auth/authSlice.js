import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userAuthorized(state) {
      state.loggedIn = true;
    },
  }
});

export function authorizeUser(code, state){
  return async function getTokenThunk(dispatch) {
    const response = await axios.post('/api/auth/login', { 
      code, 
      state
    });
    if(response.status === 200) dispatch(userAuthorized());
  };
};

export const { userAuthorized, tokenRefreshed } = authSlice.actions;

export default authSlice.reducer;
