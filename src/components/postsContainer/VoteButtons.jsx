import { CardActions, IconButton } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { voteOnPost } from './postSlice';
import { useEffect, useState } from 'react';

function VoteButtons(props) {
  const { fullname } = props;
  const dispatch = useDispatch();

  const votes = useSelector((state) => state.posts.votes);

  const handleUpvote = () => {
    const value = votes[fullname] === '1' ? '0' : '1';
    dispatch(voteOnPost({fullname, value}));
  };

  const handleDownvote = () => {
    const value = votes[fullname] === '-1' ? '0' : '-1';
    dispatch(voteOnPost({fullname, value}));
  };

  return (
    <CardActions>
      <IconButton size="large" color={votes[fullname] === '1' ? 'warning' : 'inheret'} disabled={votes[fullname] === '-1'} onClick={handleUpvote}>
        <KeyboardArrowUp />
      </IconButton>
      <IconButton size="large" color={votes[fullname] === '-1' ? 'warning' : 'inheret'} disabled={votes[fullname] === '1'} onClick={handleDownvote}>
        <KeyboardArrowDown />
      </IconButton>
    </CardActions>
  )
}

export default VoteButtons