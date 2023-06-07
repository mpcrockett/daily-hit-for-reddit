import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import DarkModeIcon from './DarkMode.jsx';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../flexBetween/FlexBetween.js';
import SearchBar from './SearchBar.jsx';
import Profile from './Profile.jsx';

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isLoggedIn = useSelector((state) => state.user.loggedIn);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  return ( 
    <FlexBetween padding="1rem 6%" backgroundColor={alt} marginTop={4} >
      <FlexBetween gap="1.75rem">
        <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)" color="primary" onClick={() => navigate("/")} sx={{ "&:hover": { color: primaryLight, cursor: "pointer", } }} >
          Daily Hit of Reddit
        </Typography>
        {isNonMobileScreens && ( 
          <SearchBar backgroundColor={neutralLight} />
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <DarkModeIcon />
          {isLoggedIn && <Profile flexDirection={'row'}/>}
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)} >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box position="fixed" right="0" bottom="0" height="100%" zIndex="10" maxWidth="500px" minWidth="300px" backgroundColor={background}>
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
           <DarkModeIcon />
            {isLoggedIn && <Profile flexDirection={'column'}/>}
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
   );
}
 
export default NavBar;