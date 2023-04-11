import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Chip, Typography, Stack } from '@mui/material'
import { toggleSubreddit } from './postSlice'

function Menu() {
  const { subreddits } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  const handleClick = (subId) => {
    dispatch(toggleSubreddit(subId));
  };

  return (
    <Stack direction="column" spacing={1} sx={{ width: '20%', m: 2 }} >
    <Typography fontWeight="bold" fontSize="clamp(0.5rem, 1rem, 1.5rem)">Subreddits</Typography>
      {subreddits.map(sub => 
        <Chip 
          avatar={<Avatar alt={sub.name} src={sub.iconImg} />} 
          label={sub.name} 
          key={sub.id} 
          variant={sub.active ? "outlined" : "primary"}
          onClick={() => handleClick(sub.id)}
          clickable 
        /> 
      )}
    </Stack>
   
  );
}

export default Menu