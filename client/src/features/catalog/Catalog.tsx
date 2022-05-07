//import { List } from '@mui/icons-material';

import { useEffect} from 'react';

import Loading from '../../app/layout/Loading';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductsAsync, productSelectors } from './catalogSlice';
import ProductList from './ProductList';



export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const {productsLoaded,status} = useAppSelector(state => state.catalog);

    useEffect(() => {
        if(!productsLoaded){
            dispatch(fetchProductsAsync())
        }

        // new way with axios self created agent
        // agent.catalog.list().then(products => setProducts(products))
        // .catch(error => console.log(error))
        // .finally(()=> setLoading(false))

        // fetch('https://localhost:7271/api/Products')
        //     .then(res => res.json())
        //     .then(data => setProducts(data))

    }, [productsLoaded]);

    if(status.includes("pending")){
        return <Loading message="Loading products..."/>
    }

    return (
        <>
            <ProductList products={products}></ProductList>


        </>
        )
}


