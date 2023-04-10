import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Navbar from 'components/navBar/NavBar.jsx'
import TileContainer from 'components/tile/TileContainer'
import { getUserInfo } from '../profilePage/userSlice'
import Menu from 'components/subredditMenu/Menu'

const HomePage = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if(loggedIn) dispatch(getUserInfo());
  }, [loggedIn]);

  return ( 
    <>
    <Navbar />
    <Menu />
    <TileContainer />
    </>
  );
}
 
export default HomePage;