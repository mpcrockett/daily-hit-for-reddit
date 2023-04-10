import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Navbar from 'components/navBar/NavBar.jsx'
import TileContainer from 'components/tileContainer'
import { getUserInfo } from '../profilePage/userSlice'

const HomePage = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if(loggedIn) dispatch(getUserInfo());
  }, [loggedIn]);

  return ( 
    <>
    <Navbar />
    <TileContainer />
    </>
  );
}
 
export default HomePage;