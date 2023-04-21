import { useSelector } from 'react-redux';
import { Box } from '@mui/material'
import PostCard from './PostCard';

const CardContainer = () => {

  const subPosts = useSelector((state) => state.posts.posts.subPosts);
  const allPosts = useSelector((state) => state.posts.posts.allPosts);
  const collection = subPosts.length > 0 ? subPosts : allPosts;
  
  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap", marginTop: 4}}>
      {collection.map(post => <PostCard key={post.id} post={post} /> )}
    </Box>
    
  );
};
 
export default CardContainer;