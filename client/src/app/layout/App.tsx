import React, { useEffect, useState } from 'react';
import  Catalog  from '../../features/catalog/Catalog';
import { Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import Header from './Header';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import HomePage from '../../features/Home/HomePage';
import AboutPage from '../../features/About/AboutPage';
import ContactPage from '../../features/Contact/ContactPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from '../context/StoreContext';
import { getCookie } from '../utils/util';
import agent from '../api/agent';
import Loading from './Loading';

export default function App() {
    const{setBasket} = useStoreContext();
    const[loading,setLoading] = useState(true);

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
        const buyerId = getCookie("buyerId");
        if(buyerId){
            agent.Basket.get()
            .then(basket=> setBasket(basket))
            .catch(error=> console.log(error))
            .finally(()=> setLoading(false))
        }
        else{
            setLoading(false);
        }
    }, [darkMode,setBasket]);

    if(loading) return <Loading message='Initialising app...'/>

  return (
      <ThemeProvider theme={theme }>
          <ToastContainer theme='colored' position='bottom-right' hideProgressBar/>
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

