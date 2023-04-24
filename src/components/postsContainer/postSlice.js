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
  addSubreddit 
} = postSlice.actions;

export default postSlice.reducer;
