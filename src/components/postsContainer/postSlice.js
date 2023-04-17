import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import _ from 'lodash';

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    subreddits: []
  },
  reducers: {
    postsAdded(state, action){
      state.entries = action.payload;
    },
    subredditsFetched(state, action) {
      const array = [];
      action.payload.map(x => array.push(
        { id: x.data.id,
          name: x.data.display_name_prefixed,
          iconImg: x.data.icon_img, 
          description: x.data.public_description, 
          url: x.data.url,
          active: false
        }
        ));
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
    },
    postsFetched(state, action) {
      const array = [];
      action.payload.map((x) => array.push({
        id: x.data.id,
        permalink: x.data.permalink,
        subreddit: x.data.subreddit,
        subreddit_id: x.data.subreddit_id,
        gallery_data: x.data.gallery_data || null,
        preview: x.data.preview || null,
        media_metadata: x.data.media_metadata || null,
        title: x.data.title,
        author: x.data.author,
        flair : x.data.flair_text,
        thumbnail: x.data.thumbnail,
        selftext: x.data.selftext,
        url: x.data.url,
        created: x.data.created,
      }));
      state.posts = array;
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

export function getPosts(){
  return async function getPostsThunk(dispatch, getState) {
    const subreddits = getState().posts.subreddits;
    try {
      const response = await axios.post('/api/posts', { subreddits }, { withCredentials: true });
      if(response.status === 200) dispatch(postsFetched(response.data.data.children));
    } catch (error) {
      console.log({ error: error.message })
    }
  };
};

export const { postsAdded, subredditsFetched, toggleSubreddit, postsFetched } = postSlice.actions;

export default postSlice.reducer;
