import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    entries: {},
    subreddits: ["MadeMeSmile", "Awww", "Doggos", "OddlySatisfying", "Weimaraners", "Dogs"]
  },
  reducers: {
    postsAdded(state, action){
      state.entries = action.payload;
    },
  }
});

export const { postsAdded } = postSlice.actions;

export default postSlice.reducer;
