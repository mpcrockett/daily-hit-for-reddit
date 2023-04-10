import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authorizeUser } from './authSlice';
import { useNavigate } from 'react-router-dom';


export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = window.location.href;
  const params = new URL(location).searchParams;

  const [urlState, setUrlState] = useState( params.get('state') || null);
  const [urlCode, setUrlCode] = useState(params.get('code'));

  const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    dispatch(authorizeUser(urlCode, urlState));
  }, []);
  
  useEffect(() => {
    if(isLoggedIn) navigate('/')
  }, [isLoggedIn]);
  return  <></>
};

export default Auth;