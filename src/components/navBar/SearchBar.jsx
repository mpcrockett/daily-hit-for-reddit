import { InputBase, IconButton } from "@mui/material"
import FlexBetween from 'components/flexBetween';
import { Search } from '@mui/icons-material'


function SearchBar({ backgroundColor }) {
  return (
    <FlexBetween backgroundColor={backgroundColor} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem" >
      <InputBase placeholder="Search for Subreddits..." />
        <IconButton>
          <Search />
        </IconButton>
    </FlexBetween>
  )
}

export default SearchBar