import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import _ from 'lodash';

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: {
      allPosts: [],
      subPosts: []
    },
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
    allPostsFetched(state, action) {
      state.posts.allPosts = action.payload;
    },
    subPostsFetched(state, action) {
      state.posts.subPosts = [...state.posts.subPosts, ...action.payload];
    },
    voted(state, action) {
      const { collection, fullname, value } = action.payload;
      const array = state.posts[collection].map((post) => {
        if(post.fullname === fullname) {
          if(value === '1') {
            return {...post, upvoted: true, downvoted: false }
          } else if (value === '-1') {
            return {...post, upvoted: false, downvoted: true }
          } else {
            return {...post, upvoted: false, downvoted: false} 
          }
        } else { 
          return post
        }
      })
      state.posts[collection] = array;
    }
  }
});

export function getUserSubreddits(){
  return async function getUserSubredditsThunk(dispatch) {
    try {
      const response = await axios.get('/api/posts/subreddits', { withCredentials: true });
      if(response.status === 200) {
        dispatch(subredditsFetched(response.data.subreddits));
        dispatch(allPostsFetched(response.data.postData));
      };
    } catch (error) {
      console.log({error: error.message })
    }
  };
};

// export function getPosts(){
//   return async function getPostsThunk(dispatch, getState) {
//     const subreddits = getState().posts.subreddits;
//     try {
//       const response = await axios.post('/api/posts', { subreddits }, { withCredentials: true });
//       if(response.status === 200) dispatch(postsFetched(response.data.data.children));
//     } catch (error) {
//       console.log({ error: error.message })
//     }
//   };
// };

export function voteOnPost({collection, fullname, value}) {
  return async function upvotePostThunk(dispatch) {
    try {
      const response = await axios.post('/api/posts/vote', { fullname, value }, { withCredentials: true });
      if(response.status === 200) dispatch(voted({ collection, fullname, value }));
    } catch (error) {
      console.log({ error: error.message })
    }
  }
}

export const { postsAdded, subredditsFetched, toggleSubreddit, allPostsFetched, voted } = postSlice.actions;

export default postSlice.reducer;
