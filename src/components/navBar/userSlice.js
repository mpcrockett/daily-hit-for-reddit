import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { clearPosts } from '../../components/postsContainer/postSlice';

export const userSlice = createSlice({
  name: "user",
  initialState: {
   user: { 
    username: '',
    iconImg: '',
    },
    loggedIn: false,
  },
  reducers: {
    userAuthorized(state) {
      state.loggedIn = true;
    },
    loggedOut(state) {
      state.loggedIn = false;
      state.user.username = '';
      state.user.iconImg = '';
    },
    setUser: (state, action) => {
      state.user.username = action.payload.name;
      state.user.iconImg = action.payload.snoovatar_img;
    },
  }
});

export function getUserInfo(){
  return async function getUserThunk(dispatch) {
    try {
      const response = await axios.get('/api/user', { withCredentials: true });
      if(response.status === 200) dispatch(setUser(response.data));
    } catch (error) {
      console.log({ error: error.message })
    }
  };
};

export function authorizeUser(code, state){
  return async function getTokenThunk(dispatch) {
    const response = await axios.post('/api/auth/login', { 
      code, 
      state
    });
    if(response.status === 200) dispatch(userAuthorized());
  };
};

export function logOutUser() {
  return async function logOutThunk(dispatch) {
    const response = await axios.delete('/api/auth/logout', {
      withCredentials: true
    });
    if(response.status === 200) {
      dispatch(loggedOut());
      dispatch(clearPosts());
    };
  };
};

export const { userAuthorized, loggedOut, setUser } = userSlice.actions;
export default userSlice.reducer;