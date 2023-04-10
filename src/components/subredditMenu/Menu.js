import { useSelector } from 'react-redux'
import { FormGroup, FormControlLabel, Checkbox, Typography, Box } from '@mui/material'

function Menu() {
  const { subreddits } = useSelector(state => state.posts);

  return (
    <Box sx={{ margin: 4 }}>
    <Typography fontWeight="bold" fontSize="clamp(0.5rem, 1rem, 1.5rem)">Subreddits</Typography>
    <FormGroup >
      {subreddits.map(x => <FormControlLabel control={<Checkbox defaultChecked />} label={x} key={x} />)}
    </FormGroup>
    </Box>
   
  );
}

export default Menu