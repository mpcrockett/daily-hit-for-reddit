import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material'
import { clearSubPosts } from './postSlice.js';
import PostCard from './PostCard.jsx';
import _ from 'lodash';

const CardContainer = () => {

  const subPosts = useSelector((state) => state.posts.posts.subPosts);
  const allPosts = useSelector((state) => state.posts.posts.allPosts);
  const subreddits = useSelector((state) => state.posts.subreddits);
  const collection = subPosts.length > 0 ? _.shuffle(subPosts) : allPosts;

  const dispatch = useDispatch();

  useEffect(() => {
    if(!subreddits.some((sub) => sub.active === true)) {
      dispatch(clearSubPosts());
    }
  }, [subreddits]);
  
  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap", marginTop: 4}}>
      {collection.map(post => <PostCard key={post.id} post={post} /> )}
    </Box>
    
  );
};
 
export default CardContainer;