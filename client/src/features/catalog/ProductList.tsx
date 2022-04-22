
import { Product } from '../../app/models/product';
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ProductCard from './ProductCard';

interface Props {
    products: Product[],

}

export default function ProductList({ products }: Props) {
    return (
        <Grid container spacing={3} >
            {products.map((item: Product) => (
                <Grid item xs={3} key={item.id} >
                    <ProductCard  product={item} />
                </Grid >
                
            ))}
        </Grid>
    )    
}