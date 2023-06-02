import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/navBar/NavBar';
import { getUserInfo } from '../../components/navBar/userSlice';
import PostContainer from '../../components/postsContainer/PostContainer';
import LoginButton from './LoginButton';

const HomePage = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if(loggedIn) dispatch(getUserInfo());
  }, [loggedIn]);

  return ( 
   <> 
    <NavBar />
    {!loggedIn && <LoginButton /> }
    {loggedIn && <PostContainer />}
   </>
  );
}
 
export default HomePage;