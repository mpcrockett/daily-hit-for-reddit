import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Box, Typography } from '@mui/material'
import { logOutUser } from '../../pages/profilePage/userSlice'

const Profile = (props) => {
  const { flexDirection }= props;
  const user = useSelector((state) => state.user.user);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!loggedIn) navigate('/')
  }, [loggedIn]);

  return ( 
    <Box maxWidth='lg' sx={{ margin: 4, display: 'flex', alignItems: 'center', flexDirection: {flexDirection} }}>
      <Avatar alt="Profile avatar for Reddit account" src={user.iconImg} variant="circular" sizes="lg" sx={{ margin: 1 }} />
      <Typography variant='caption' sx={{ margin: 0.5 }}>
        {user.username}
      </Typography>
      <Button size='small' variant="text" sx={{ margin: 1 }} onClick={() => dispatch(logOutUser())}>Log Out</Button>
    </Box>
  );
}
 
export default Profile;