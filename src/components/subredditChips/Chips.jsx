import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Chip, Box } from '@mui/material'
import { getSubredditPosts, uncheckSubreddit } from '../postsContainer/postSlice'

function Menu() {
  const { subreddits } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  const handleClick = (sub) => {
    if(!sub.active) {
      dispatch(getSubredditPosts({id: sub.id, url: sub.url})); 
    } else {
      dispatch(uncheckSubreddit(sub.id))
    }
  };

  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap", marginTop: 1}}>
      {subreddits.map(sub => 
        <Chip 
          avatar={<Avatar alt={sub.name} src={sub.iconImg} />} 
          label={sub.name} 
          key={sub.id} 
          variant={sub.active ? "outlined" : "primary"}
          sx={{ margin: 0.5, boxShadow: 0.5 }}
          onClick={() => handleClick(sub)}
          clickable
          size="medium"
        /> 
      )}
    </Box>
   
  );
}

export default Menu