import React, { useEffect, useState } from 'react';
import  Catalog  from '../../features/catalog/Catalog';
import { Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import Header from './Header';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import HomePage from '../../features/Home/HomePage';
import AboutPage from '../../features/About/AboutPage';
import ContactPage from '../../features/Contact/ContactPage';

export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const paletteType = darkMode ? "dark" : "light";

    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: darkMode ? "#121212" : "#eaeaea",
            }
        }
    });

    const handleChange = () => {
        setDarkMode(!darkMode);
    }


    useEffect(() => {

    }, [darkMode]);

  return (
      <ThemeProvider theme={theme }>
          <CssBaseline />
          <Header onChange={handleChange} darkMode={darkMode} />

          <Container>
            <Routes>
                    <Route path="/" element={<HomePage />} />
            </Routes>
            <Outlet />

          </Container>



      </ThemeProvider>
    );
}

