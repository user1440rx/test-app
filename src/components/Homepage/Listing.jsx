import * as React from 'react';
import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import EachItem from './EachItem';
import axios from 'axios';


// Navbar CSS
const ProductsListing = styled(Box)({
  marginTop: 100
});


const GridItem = (prop) => {
    return(
        <Grid xs={4} sm={4} md={4} >
            <EachItem i_name={prop.i_name} i_timg={prop.i_timg} i_id={prop.i_id} i_category={prop.i_cat} i_loginstatus={prop.i_loginstatus} />
        </Grid>
    )
}

export default function Listing() {

    const [listData, setListData] = useState([]);
    const [accountCheck, setAccountCheck] = useState();

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/account/check-status`, {withCredentials: true})
        .then((res) => {
            if(res.data.message==='Authorized') {
                setAccountCheck(true);
            }
            else {
                setAccountCheck(false);
            }
        })
        .catch(() => {
            console.log('Not Authorized')
        });
        
        axios.get(`${process.env.REACT_APP_API_URL}/products/listing`)
        .then((res) =>
            setListData(res.data)
        );

    }, [])

  return (
    <React.Fragment>
    <Container>
        <ProductsListing sx={{ flexGrow: 1, width: '100%' }}>
            {
                accountCheck ?
                (<></>)
                :
                (<><Link id="a-account-btn" to="/login">
                <Button>Login to add Products to Cart</Button>
                </Link>
                <br /><br /></>
                )
            }
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {listData.map((item, i) => {
                    const {product_name, _id, product_thumbimage, product_category} = item;
                    return <GridItem key={i} i_name={product_name} i_id={_id} i_timg={product_thumbimage} i_cat={product_category} i_loginstatus={accountCheck} />
                })}
            </Grid>
        </ProductsListing>
    </Container>
    
    </React.Fragment>
  );
}