
import { Product } from '../../app/models/product';
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ProductCard from './ProductCard';
import { useState } from 'react';
import { useAppSelector } from '../../app/store/configureStore';
import ProductCardSkeleton from './ProductCardSkeleton';

interface Props {
    products: Product[],

}

export default function ProductList({ products }: Props) {

    const {productsLoaded}= useAppSelector(state => state.catalog);
    return (
        <Grid container spacing={4} >
            {products.map((item: Product) => (
                <Grid item xs={4} key={item.id} >
                    {!productsLoaded ? (
                        <ProductCardSkeleton/>
                    ) : (
                        <ProductCard  product={item} />
                    )}
                </Grid >

            ))}
        </Grid>
    )
}