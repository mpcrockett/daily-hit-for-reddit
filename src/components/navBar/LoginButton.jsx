import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

const LoginButton = () => {
  // const url = useSelector((state) => state.auth.authUrl);

  // const handleClick = async (e) => {
  //   e.preventDefault(); // Steve wuz here
  //   window.location.assign(url);
  // };
  
  return ( 
    <Button variant="text" href='/api/auth'>Log into Reddit</Button>
  );
};
 
export default LoginButton;