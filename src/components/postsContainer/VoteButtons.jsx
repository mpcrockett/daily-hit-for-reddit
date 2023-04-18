import { CardActions, IconButton } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { voteOnPost } from './postSlice';

function VoteButtons(props) {
  const { fullname } = props;
  const dispatch = useDispatch();
  const { upvoted } = useSelector((state) => state.posts.posts.find(post => post.fullname === fullname));
  const { downvoted } = useSelector((state) => state.posts.posts.find(post => post.fullname === fullname));

  const handleUpvote = () => {
    const value = upvoted ? '0' : '1';
    dispatch(voteOnPost(fullname, value));
  }

  const handleDownvote = () => {
    const value = downvoted ? '0' : '-1';
    dispatch(voteOnPost(fullname, value));
  }
 
  return (
    <CardActions>
      <IconButton size="large" color={upvoted ? 'warning' : 'inheret'} disabled={downvoted} onClick={handleUpvote}>
        <KeyboardArrowUp />
      </IconButton>
      <IconButton size="large" color={downvoted ? 'warning' : 'inheret'} disabled={upvoted} onClick={handleDownvote}>
        <KeyboardArrowDown />
      </IconButton>
    </CardActions>
  )
}

export default VoteButtons