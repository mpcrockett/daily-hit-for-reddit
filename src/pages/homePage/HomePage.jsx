import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Navbar from 'components/navBar/NavBar.jsx'
import { getUserInfo } from '../../components/navBar/userSlice'
import PostContainer from 'components/postsContainer/PostContainer';
import LoginButton from './LoginButton';

const HomePage = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if(loggedIn) dispatch(getUserInfo());
  }, [loggedIn]);

  return ( 
   <> 
    <Navbar />
    {!loggedIn && <LoginButton /> }
    {loggedIn && <PostContainer />}
   </>
  );
}
 
export default HomePage;