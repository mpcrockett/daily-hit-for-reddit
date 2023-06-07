import {  DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from '../../pages/homePage/themeSlice.js';
import { useTheme, IconButton } from "@mui/material";

function DarkModeIcon() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;

  return (
    <IconButton onClick={() => dispatch(setMode())}>
      {theme.palette.mode === "dark" ? (<DarkMode sx={{ fontSize: "25px" }} />) : (<LightMode sx={{ color: dark, fontSize: "25px" }} />)}
    </IconButton>
  )
}

export default DarkModeIcon