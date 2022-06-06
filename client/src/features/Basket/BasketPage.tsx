import { Box, Button, Grid, Typography } from '@mui/material';



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useState } from 'react';
import agent from '../../app/api/agent';
import { LoadingButton } from '@mui/lab';
import BasketSummary from './BasketSummary';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from './BasketSlice';
import BasketTable from './BasketTable';

export default function BasketPage() {
    const{basket} = useAppSelector(state => state.basket);


    // const[status,setStatus] = useState({
    //   loading: false,
    //   name: "",

    // });

    // function handleAddItem(productId: number, name: string){
    //     setStatus({
    //       loading: true,
    //       name
    //     })
    //     agent.Basket.addItem(productId)
    //     .then(basket=> dispatch(setBasket(basket)))
    //     .catch((error)=> console.log(error))
    //     .finally(()=> setStatus({
    //       loading: false,
    //       name: "",
    //     }))
    // }

    // function handleRemoveItem(productId: number, quantity = 1, name: string){
    //   setStatus({
    //     loading: true,
    //     name
    //   })
    //     agent.Basket.removeItem(productId,quantity) // remove from backend
    //     .then(()=> dispatch(removeItem({productId,quantity}))) // remove from client
    //     .catch((error)=> console.log(error))
    //     .finally(()=> setStatus({
    //       loading: false,
    //       name: "",
    //     }))

    // }

    if(!basket) return <Typography variant='h3'> Your basket is empty</Typography>

  return (
    //<div>BuyerId = {basket.buyerId}</div>
    <>

      <BasketTable items={basket.items} />

      <Grid container >
              <Grid item xs={6}/>
              <Grid item xs={6}>
                <BasketSummary/>
                <Button
                  component={RouterLink}
                  to="/checkout"
                  variant = "contained"
                  size='large'
                  fullWidth

                >
                    Checkout
                </Button>
              </Grid>
      </Grid>
    </>
  )
}

