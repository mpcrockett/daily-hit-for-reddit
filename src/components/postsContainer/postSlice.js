import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    entries: {},
    subreddits: []
  },
  reducers: {
    postsAdded(state, action){
      state.entries = action.payload;
    },
    subredditsFetched(state, action) {
      const array = [];
      action.payload.map(x => array.push({ id: x.data.id, name: x.data.display_name_prefixed, iconImg: x.data.icon_img, description: x.data.public_description, active: true}));
      state.subreddits = array;
    },
    toggleSubreddit(state, action) {
      const newArray = state.subreddits.map((sub) => {
        if(sub.id === action.payload) {
          return {...sub, active: !sub.active }
        } else {
          return {...sub}
        }
      });
      state.subreddits = newArray;
    }
  }
});

export function getUserSubreddits(){
  return async function getUserSubredditsThunk(dispatch) {
    try {
      const response = await axios.get('/api/posts/subreddits', { withCredentials: true });
      if(response.status === 200) dispatch(subredditsFetched(response.data.data.children));
    } catch (error) {
      console.log({error: error.message })
    }
  };
};

export const { postsAdded, subredditsFetched, toggleSubreddit } = postSlice.actions;

export default postSlice.reducer;
