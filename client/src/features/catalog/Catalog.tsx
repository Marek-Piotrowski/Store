//import { List } from '@mui/icons-material';

import { useEffect, useState } from 'react';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';



export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://localhost:7271/api/Products')
            .then(res => res.json())
            .then(data => setProducts(data))

    }, []);

    return (
        <>
            <ProductList products={products }></ProductList>
           
        </>
        )
}


