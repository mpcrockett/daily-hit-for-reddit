import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box,  } from '@mui/material'
import { getPosts } from './postSlice';
import PostCard from './PostCard';

const CardContainer = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector((state) => state.posts.subreddits);
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if(subreddits?.length) dispatch(getPosts());
  }, [subreddits]);

  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap", marginTop: 4}}>
      {posts.map(post => <PostCard key={post.id} post={post} /> )}
    </Box>
    
  );
};
 
export default CardContainer;