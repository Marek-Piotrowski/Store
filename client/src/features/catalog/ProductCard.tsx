import { Product } from '../../app/models/product';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import agent from '../../app/api/agent';
import { useEffect, useState } from "react";
import { LoadingButton } from '@mui/lab';
import { useStoreContext } from '../../app/context/StoreContext';
import { currencyFormat } from '../../app/utils/util';

interface Props {
    product: Product,

}



export default function ProductCard({ product }: Props) {

    const [loading, setLoading] = useState(false);
    const{setBasket} = useStoreContext();

    function handleAddItem(productId: Number){
        setLoading(true);
        agent.Basket.addItem(productId)
        .then(basket=>setBasket(basket)) // updates basket icon in header
        .catch(error => console.log(error))
        .finally(()=> setLoading(false));

    }
    return (
        <Card >
            <CardHeader
                avatar={<Avatar sx={{bgcolor: "secondary.main"}}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>}
                title={product.name}
                titleTypographyProps={{
                    sx: { fontWeight: "bold", color: "primary.main" }
                }}


            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: "primary.light" }}
                image={product.pictureUrl}
                title={product.name}

            />
            <CardContent>
                <Typography gutterBottom variant="h5" color="secondary">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand }/ {product.type }
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                loading={loading}
                onClick={()=>handleAddItem(product.id)}
                size="small">Add to cart</LoadingButton>
                <Button component={RouterLink} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}