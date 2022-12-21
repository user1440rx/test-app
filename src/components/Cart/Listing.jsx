import * as React from 'react';
import {useEffect, useState} from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CartEachItem from './EachItem';
import Axios from 'axios';
import Button from '@mui/material/Button'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate } from "react-router-dom";



const ProductsListing = styled(Box)({
    marginTop: 100,
    marginBottom: 230

});

const PlaceOrderBox = styled(Box)({
    maxWidth: '640px',
    marginLeft: 'auto',
    marginRight: 'auto'
});

const ListItem = (prop) => {
    return(
        <CartEachItem i_name={prop.i_name} i_timg={prop.i_timg} i_id={prop.i_id} i_category={prop.i_cat} />
    )
}

export default function CartListing() {

    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);
    }

    const PlaceOrderSection = () => {
        return (
            <PlaceOrderBox>
                <Button onClick={() => {
                        const createOrderAPI = `${process.env.REACT_APP_API_URL}/cart/order`;
                        Axios.get(createOrderAPI, {withCredentials: true}).then((res) => {
                        refreshPage(); 
                        })
                    }}
                    variant="contained" endIcon={<ShoppingBasketIcon />}>
                    Place Order
                </Button>
            </PlaceOrderBox>
        );
    }

    const [listData, setListData] = useState([]);

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_API_URL}/cart/list`, {withCredentials: true})
        .then((res) =>
            setListData(res.data)
        );
    }, [])
    
  return (
    <React.Fragment>
    <Container>
        <ProductsListing sx={{ flexGrow: 1, width: '100%' }}>
            {listData.map((item, i) => {
                const {product_name, _id, product_thumbimage, product_category} = item;
                return <ListItem key={i} i_name={product_name} i_id={_id} i_timg={product_thumbimage} i_cat={product_category} />
            })}
        
        {listData.length > 0 ? <PlaceOrderSection /> : <></>}
        </ProductsListing>
    </Container>
    
    </React.Fragment>
  );
}