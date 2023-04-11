import { useEffect } from 'react'
import { Box } from '@mui/material'
import TileContainer from './TileContainer'
import Menu from './Menu'
import { useSelector, useDispatch } from 'react-redux'
import { getUserSubreddits } from './postSlice'

function PostContainer() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.user.username);

  useEffect(() => {
    if(username.length > 0) {
      dispatch(getUserSubreddits())
    }
  }, [username]);
  
  return (
    <Box>
      <Menu />
      <TileContainer />
    </Box>
  )
}

export default PostContainer