import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const userSlice = createSlice({
  name: "user",
  initialState: {
   user: { 
    username: '',
    iconImg: '',
    subreddits: []
    }
  },
  reducers: {
    setUser: (state, action) => {
      state.user.username = action.payload.name;
      state.user.iconImg = action.payload.icon_img;
    },
  }
});

export function getUserInfo(){
  return async function getUserThunk(dispatch) {
    try {
      const response = await axios.get('/api/user', { withCredentials: true });
      if(response.status === 200) dispatch(setUser(response.data));
    } catch (error) {
      window.alert("Error!")
    }
  };
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;