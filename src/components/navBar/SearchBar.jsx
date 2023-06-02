import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, InputBase, IconButton, Stack, Button } from "@mui/material"
import FlexBetween from '../flexBetween/FlexBetween';
import { Search } from '@mui/icons-material';
import  axios from 'axios';
import { addSubredditPosts } from '../postsContainer/postSlice'


function SearchBar({ backgroundColor }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if(searchQuery.length > 0) {
      axios.post('/api/search', {
        params: {
        query: searchQuery
        },
        withCredentials: true
        }).then((response) => setSearchResults(response.data));
    };
  }, [searchQuery]);

  const handleSubredditClick = (name) => {
    dispatch(addSubredditPosts(name));
    setSearchQuery('');
    setSearchResults('');
  };

  const handleCloseMenu = () => {
    setSearchResults([]);
    setSearchQuery('');
  };

  const useOutsideClick = (callback) => {
    const ref = useRef();
    useEffect(() => {
      const handleClick = (e) => {
        if(ref.current && !ref.current.contains(e.target)) {
          callback()
        }
      };
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick)
      };
    }, [ref]);

    return ref
  };

  const ref = useOutsideClick(handleCloseMenu);

  return (
    <Box width='400px'>
      <FlexBetween backgroundColor={backgroundColor} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem" width='100%' >
        <InputBase 
          placeholder="Search for subreddits..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          width='100%'
          disabled={!loggedIn} 
        />
          <IconButton>
            <Search />
        </IconButton>
      </FlexBetween>
      {searchResults.length > 0 && 
      <Box sx={{ position: 'relative' }} width='100%' ref={ref}>
        <Stack 
          direction="column"
          spacing="0"
          divider={<Divider orientation="horizontal" flexItem />}
          sx={{ position: 'absolute', zIndex: '1', padding: '4' }}
          backgroundColor={backgroundColor}
          width='100%'
        >
          {searchResults.map(result =>
            <Button key={result} color='secondary' 
              sx={{ textTransform: 'lowercase'}} 
              onClick={() => handleSubredditClick(result)}
            >
            {'r/' + result}
            </Button>)
          }
        </Stack>
      </Box>
        
      }
    </Box>
 )   
};

export default SearchBar