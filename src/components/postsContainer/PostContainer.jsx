import { useEffect } from 'react'
import { Box } from '@mui/material'
import CardContainer from './CardContainer'
import Menu from '../subredditChips/Chips'
import { useSelector, useDispatch } from 'react-redux'
import { getUserSubreddits } from './postSlice'


function PostContainer() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.user.username);
  const subreddits = useSelector((state) => state.posts.subreddits);

  useEffect(() => {
    if(username.length > 0) {
      dispatch(getUserSubreddits())
    }
  }, [username]);

  return (
    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", overflow: "auto"}}>
      <Menu />
      <CardContainer />
    </Box>
  )
}

export default PostContainer