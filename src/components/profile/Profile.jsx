import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Container, Typography } from '@mui/material'
import { logOutUser } from '../../pages/profilePage/userSlice'

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!loggedIn) navigate('/')
  }, [loggedIn]);

  return ( 
    <Container maxWidth='lg' sx={{ margin: 4, display: 'block' }}>
      <Typography variant='h2' sx={{ margin: 2 }}>
        {user.username}
      </Typography>
      <Avatar alt="Profile avatar for Reddit account" src={user.iconImg} variant="circular" sizes="lg" sx={{ margin: 2 }} />
      <Button variant="contained" sx={{ margin: 2 }} onClick={() => dispatch(logOutUser())}>Log Out</Button>
    </Container>
  );
}
 
export default Profile;