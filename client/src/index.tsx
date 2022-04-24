import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalog from './features/catalog/Catalog';
import AboutPage from './features/About/AboutPage';
import ContactPage from './features/Contact/ContactPage';
import ProductDetails from './features/catalog/ProductDetails';
import NoMatchPage from './features/NoMatchPage/NoMatchPage';
import Login from './features/Login/Login';
import Register from './features/Register/Register';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} >

                    <Route path="catalog" element={<Catalog />} />
                    <Route path="catalog/:id" element={<ProductDetails />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path='login' element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path="*" element={<NoMatchPage/>} />

                </Route>

            </Routes>
        </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
