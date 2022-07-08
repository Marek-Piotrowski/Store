import { useCallback, useEffect, useState } from 'react';
import { Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import Header from './Header';
import { Outlet, Route, Routes } from 'react-router-dom';
import HomePage from '../../features/Home/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { useStoreContext } from '../context/StoreContext';
import { getCookie } from '../utils/util';
import agent from '../api/agent';
import Loading from './Loading';
import { useAppDispatch} from '../store/configureStore';
import { fetchBasketAsync, setBasket } from '../../features/Basket/BasketSlice';
import { fetchCurrentUser } from '../../features/Account/AccountSlice';

export default function App() {
    //const{setBasket} = useStoreContext();

    const dispatch = useAppDispatch();
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

    const initApp = useCallback(async() => {
        try{
            await dispatch(fetchCurrentUser());
            await dispatch(fetchBasketAsync());
        }catch(error){
            console.log(error);
        }
    }, [dispatch])


    useEffect(() => {
        initApp()
        .then(()=> setLoading(false));
        // const buyerId = getCookie("buyerId");
        // dispatch(fetchCurrentUser());
        // if(buyerId){
        //     agent.Basket.get()
        //     .then(basket=> dispatch(setBasket(basket)))
        //     .catch(error=> console.log(error))
        //     .finally(()=> setLoading(false))
        // }
        // else{
        //     setLoading(false);
        // }
    }, [darkMode,initApp]);

    if(loading) return <Loading message='Initialising app...'/>

  return (
      <ThemeProvider theme={theme }>
          <ToastContainer theme='colored' position='bottom-right' hideProgressBar/>
            <CssBaseline />
            <Header onChange={handleChange} darkMode={darkMode} />
                <Routes>
                        <Route path="/" element={<HomePage />} />
                </Routes>
            <Container sx={{ mt: 2 }}>

                <Outlet />

            </Container>



      </ThemeProvider>
    );
}

