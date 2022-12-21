import {useState, useEffect} from 'react';
import Axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';



const EachItem = (prop) => {
    var product_name = prop.i_name;
    var product_img = prop.i_timg;
    var product_id = prop.i_id;
    var product_category = prop.i_category;

    
    const AddItemButton = () => {
        return (
            <Button onClick={() => {
                const cartAddURL = `${process.env.REACT_APP_API_URL}/cart/${product_id}/add`;
                setItemStatus(true);
                Axios.get(cartAddURL, {withCredentials: true});
            }} 
            size="small" variant="contained" endIcon={<AddShoppingCartIcon />}>Add to Cart</Button>
        );
    };

    const RemoveItemButton = () => {
        return (
            <Button onClick={() => {
                const cartRemoveURL = `${process.env.REACT_APP_API_URL}/cart/${product_id}/remove`;
                setItemStatus(false);
                Axios.get(cartRemoveURL, {withCredentials: true});
            }}
            size="small"variant="contained" color="error" endIcon={<RemoveShoppingCartIcon />}>Remove from Cart</Button>
        );
    };
    
    const [itemStatus, setItemStatus] = useState("");

    const checkCartAPI = `${process.env.REACT_APP_API_URL}/cart/check/${product_id}`;
    
    useEffect(() => {
        async function checkCartFn() {
            await Axios.get(checkCartAPI, {withCredentials: true})
            .then((res) => {
                setItemStatus(res.data);
                }
            );
        }
        checkCartFn()
    }, [checkCartAPI]);

    

    return(
    <Card sx={{ maxWidth: 345, backgroundColor: '#202020', color: '#fff' }}>
    <CardMedia
        sx={{ height: 140 }}
        image={product_img}
        title={product_name}
    />
    <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: '600'}}>
            {product_name}
        </Typography>
        <Stack direction="row" spacing={1}>
            {product_category.map((ecat, i) => {
            return <Chip sx={{backgroundColor: '#B39DDC', fontWeight: '500'}} key={i} label={ecat} size="small" variant="filled" />
            })}
        </Stack>
    </CardContent>
    <CardActions>
        { itemStatus ?
        <RemoveItemButton />
        :
        <AddItemButton />
        }
        </CardActions>
    </Card>
    );
};

export default EachItem;