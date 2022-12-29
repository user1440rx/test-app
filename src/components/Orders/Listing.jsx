import * as React from 'react';
import {useEffect, useState} from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import OrderEachItem from './EachItem';
import Axios from 'axios';
import Button from '@mui/material/Button'
import { Link } from "react-router-dom";



const ProductsListing = styled(Box)({
    marginTop: 100,
    marginBottom: 230

});


const ListItem = (prop) => {
    return(
        <OrderEachItem key={prop.i_num} i_num={prop.i_num} i_date={prop.i_date} i_id={prop.i_id} i_orderitems={prop.i_orderitems} />
    )
}

export default function OrdersListing() {

    const [listData, setListData] = useState([]);
    const [accountCheck, setAccountCheck] = useState();

    useEffect(() => {
        
        Axios.get(`${process.env.REACT_APP_API_URL}/account/check-status`, {withCredentials: true})
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
        if (accountCheck===true) {
            Axios.get(`${process.env.REACT_APP_API_URL}/orders/list`, {withCredentials: true})
            .then((res) =>
                setListData(res.data)
            );
        }
        else {
            setListData([])
        }
    }, [accountCheck])

  return (
    <React.Fragment>
    <Container>
        <ProductsListing sx={{ flexGrow: 1, width: '100%' }}>
            {
                accountCheck ?
                (<></>)
                :
                (<Link id="a-account-btn" to="/login">
                <Button>Login to view Orders</Button>
                </Link>)
            }

            {listData.map((item, i) => {
                const {time_of_order, _id, items_ordered} = item;
                return <ListItem key={i} i_num={i} i_date={time_of_order} i_id={_id} i_orderitems={items_ordered} />
            })}
        
        </ProductsListing>
    </Container>
    
    </React.Fragment>
  );
}