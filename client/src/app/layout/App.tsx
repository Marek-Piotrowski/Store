import React, { useEffect, useState } from 'react';
import  Catalog  from '../../features/catalog/Catalog';
import { Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import Header from './Header';

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
              <Catalog/>
          </Container>
          

      </ThemeProvider>
    );
}

