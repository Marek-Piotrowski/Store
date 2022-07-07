import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import agent from '../../app/api/agent'
import Loading from '../../app/layout/Loading'
import { useAppDispatch } from '../../app/store/configureStore'
import { setBasket } from '../Basket/BasketSlice'
import CheckoutPage from './CheckoutPage'


const stripePromise = loadStripe("pk_test_51LHpeFDCpqZ6e4QxpY9bqC8DSh5zrGGiZDeuyOgchGz1pG4OkAG738t7Ns5Z1dnnGrAlaPDeOesxoessCEKla8eQ00RdMTg3SE")

export const CheckoutWrapper = () => {

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        agent.Payments.createPaymentIntent()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(()=> setLoading(false))
    },[dispatch])

    if(loading) return <Loading message='Loading checkout....'/>

    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
      };

  return (
    <Elements stripe={stripePromise} >
        <CheckoutPage/>
    </Elements>
  )
}
