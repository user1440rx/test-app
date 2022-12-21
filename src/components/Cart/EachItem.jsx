import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Axios from 'axios';


const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: '#303030',
    padding: theme.spacing(2),
    maxWidth: 600,
    color: theme.palette.text.primary,
  }));


const CartEachItem = (prop) => {
    var product_name = prop.i_name;
    var product_img = prop.i_timg;
    var product_id = prop.i_id;
    var product_category = prop.i_category;


    const RemoveItemButton = () => {
        return (
            <Button onClick={() => {
                const cartRemoveURL = `${process.env.REACT_APP_API_URL}/cart/${product_id}/remove`;
                Axios.get(cartRemoveURL, {withCredentials: true});
                document.getElementById(product_id).remove();
            }}
            size="small"variant="contained" color="error" endIcon={<RemoveShoppingCartIcon />}>Remove from Cart</Button>
        );
    };
    

    return(
        <>
        <StyledPaper id={product_id} sx={{ my: 3, mx: 'auto', p: 2, }} >
            <Grid container spacing={2}>
            <Grid item>
            <img
                src={`${product_img}`}
                alt={product_name}
                loading="lazy"
                height="80px"
            />
            </Grid>
            <Grid item xs>
                <Typography variant="h5" sx={{color: '#fff', marginBottom: 1}}>{product_name}</Typography>
                <Stack direction="row" spacing={1}>
                    {product_category.map((ecat, i) => {
                    return <Chip sx={{backgroundColor: '#B39DDC', fontWeight: '500'}} key={i} label={ecat} size="small" variant="filled" />
                    })}
                </Stack>
            </Grid>
            <Grid item s>
                <RemoveItemButton />
            </Grid>
            </Grid>
        </StyledPaper>
        </>
    );
};

export default CartEachItem;