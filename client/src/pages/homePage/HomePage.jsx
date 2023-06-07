import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/navBar/NavBar.jsx';
import { getUserInfo } from '../../components/navBar/userSlice.js';
import PostContainer from '../../components/postsContainer/PostContainer.jsx';
import LoginButton from './LoginButton.jsx';

const HomePage = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if(loggedIn === true) dispatch(getUserInfo());
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