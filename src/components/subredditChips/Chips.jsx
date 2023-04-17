import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Chip, Box, useMediaQuery } from '@mui/material'
import { toggleSubreddit } from '../postsContainer/postSlice'

function Menu() {
  const { subreddits } = useSelector(state => state.posts);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(toggleSubreddit(id));
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
          onClick={() => handleClick(sub.id)}
          clickable
          size="medium"
        /> 
      )}
    </Box>
   
  );
}

export default Menu