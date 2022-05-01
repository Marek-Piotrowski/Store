//import { List } from '@mui/icons-material';

import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import agent from '../../app/api/agent';
import Loading from '../../app/layout/Loading';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';



export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // new way with axios self created agent
        agent.catalog.list().then(products => setProducts(products))
        .catch(error => console.log(error))
        .finally(()=> setLoading(false))

        // fetch('https://localhost:7271/api/Products')
        //     .then(res => res.json())
        //     .then(data => setProducts(data))

    }, []);

    if(loading){
        return <Loading message="Loading products..."/>
    }

    return (
        <>
            <ProductList products={products}></ProductList>


        </>
        )
}


