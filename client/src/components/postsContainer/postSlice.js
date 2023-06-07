import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import _ from 'lodash';

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: {
      allPosts: [],
      subPosts: [],
    },
    subreddits: [],
    votes: {}
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
    checkSubreddit(state, action) {
      state.subreddits = state.subreddits.map((sub) => {
        if(sub.id === action.payload) {
          return {...sub, active: true }
        } else {
          return {...sub}
        }
      });
    },
    allPostsFetched(state, action) {
      state.posts.allPosts = action.payload;
      action.payload.map((post) => {
        return state.votes[post.fullname] = 0;
      })
    },
    subPostsFetched(state, action) {
      state.posts.subPosts = [...state.posts.subPosts, ...action.payload];
      action.payload.map((post) => {
        return state.votes[post.fullname] = 0;
      });
    },
    voted(state, action) {
      const { fullname, value } = action.payload;
      state.votes[fullname] = value;
    },
    uncheckSubreddit(state, action) {
      state.subreddits = state.subreddits.map((sub) => {
        if(sub.id === action.payload) {
          return {...sub, active: false }
        } else {
          return {...sub}
        }
      });
      state.posts.subPosts = state.posts.subPosts.filter(
        (posts => posts.subreddit_id !== 't5_' + action.payload)
      );
    },
    clearPosts(state) {
      state.posts = {
        allPosts: [],
        subPosts: []
      };
      state.subreddits = [];
    },
    clearSubPosts(state) {
      state.posts = {
        allPosts: [...state.posts.allPosts],
        subPosts: []
      }
    },
    addSubreddit(state, action) {
      state.subreddits.push(
        { id: action.payload.data.id,
          name: action.payload.data.display_name_prefixed,
          iconImg: action.payload.data.icon_img, 
          description: action.payload.data.public_description, 
          url: action.payload.data.url,
          active: true
        }
      )
    },
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

export function getSubredditPosts({ id, url}) {
  return async function getPostsThunk(dispatch, getState) {
    try {
      dispatch(checkSubreddit(id));
      const response = await axios.post('/api/posts', { subUrl: url }, { withCredentials: true });
      if(response.status === 200) dispatch(subPostsFetched(response.data));
    } catch (error) {
      dispatch(uncheckSubreddit(id));
      console.log({ error: error.message })
    }
  };
};

export function voteOnPost({fullname, value}) {
  return async function upvotePostThunk(dispatch) {
    try {
      const response = await axios.post('/api/posts/vote', { fullname, value }, { withCredentials: true });
      if(response.status === 200) dispatch(voted({ fullname, value }));
    } catch (error) {
      console.log({ error: error.message })
    }
  }
}

export function addSubredditPosts(name) {
  return async function subscribeThunk(dispatch) {
    try {
      const response = await axios.post('/api/subreddit', { name }, {
        withCredentials: true
      });
      if(response.status === 200) {
        dispatch(subPostsFetched(response.data.postData));
        dispatch(addSubreddit(response.data.subData));
      }
    } catch (error) {
      console.log({ error: error.message })
    }
  }
}

export const { 
  postsAdded,
  subredditsFetched, 
  checkSubreddit, 
  uncheckSubreddit, 
  allPostsFetched, 
  subPostsFetched, 
  voted, 
  clearPosts, 
  addSubreddit,
  clearSubPosts
} = postSlice.actions;

export default postSlice.reducer;
