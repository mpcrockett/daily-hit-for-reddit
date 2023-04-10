import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: {},
  subreddits: []
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsAdded(state, action){
      state.posts = action.payload;
    },
  }
});

export const { postsAdded } = postsSlice.actions;

export default postsSlice.reducer;
