//import { List } from '@mui/icons-material';

import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { useEffect} from 'react';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';

import Loading from '../../app/layout/Loading';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchFilters, fetchProductsAsync, productSelectors, setProductParams } from './catalogSlice';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';

const sortOptions = [
    {value: "name",label: "Alphabetical",},
    {value: "priceDesc",label: "Price - High to Low",},
    {value: "price",label: "Price - Low to High",}
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const {productsLoaded,status, filtersLoaded, brands,types, productParams} = useAppSelector(state => state.catalog);

    useEffect(() => {

        //request to load filters when component loads
        // if(!filtersLoaded){
        //     dispatch(fetchFilters())
        // }

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

    // to avoid double loading of products,two dependencies in one use effect, we make two use Effects
    useEffect(()=>{
        if(!filtersLoaded){
            dispatch(fetchFilters())
        }
    },[filtersLoaded])


    if(status.includes("pending")){
        return <Loading message="Loading products..."/>
    }

    return (

        <Grid container spacing={4}>
            {/* spacing = 4. make 4 columns*/}
            {/* takes 1/4 av space. 3 from 12 columns = 1 column from container*/}
            <Grid item xs={3}>
                <Paper sx={{mb: 2}}>
                    <ProductSearch/>
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <RadioButtonGroup
                     onChange={(e)=> dispatch(setProductParams({orderBy: e.target.value}))}
                     options={sortOptions}
                     selectedValue={productParams.orderBy}
                    />
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <FormGroup>
                        {brands.map(brand => (
                            <FormControlLabel control={<Checkbox />} label={brand} key={brand}/>
                        ))}


                    </FormGroup>
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <FormGroup>
                        {types.map(type => (
                            <FormControlLabel control={<Checkbox />} label={type} key={type}/>
                        ))}


                    </FormGroup>
                </Paper>
            </Grid>
            {/* takes 3/4 av space. 9 from 12 columns = 3 columns from container*/}
            <Grid item xs={9}>
                <ProductList products={products}></ProductList>
            </Grid>
            {/* takes 1/4 av space. 3 from 12 columns*/}
            <Grid item xs={3}/>
            {/* bottom empty space*/}
            {/* takes 3/4 av space. 9 from 12 columns*/}
            <Grid item xs={9}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>
                        Displaying 1-6 of 20 items
                    </Typography>
                    <Pagination
                    color="secondary"
                    size="large"
                    count={10}
                    page={2}
                    />

                </Box>
            </Grid>



        </Grid>
        )
}


