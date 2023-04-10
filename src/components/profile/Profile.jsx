import { useEffect, useState } from 'react';
import { Avatar } from '@mui/material'
import axios from 'axios';
import FlexBetween from 'components/flexBetween';

const Profile = () => {

  return ( 
    <FlexBetween>
      <Avatar alt="Profile avatar for Reddit account" />
    </FlexBetween>
  );
}
 
export default Profile;