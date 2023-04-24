import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import Auth from './pages/auth';
import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={ <HomePage /> }/>
              <Route path="/login/callback" element={<Auth />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
