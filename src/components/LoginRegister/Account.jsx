import * as React from 'react';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";
import Container from '@mui/material/Container'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Unstable_Grid2';

const AccountGridCard = (prop) => {

    const item_name = prop.name;
    const item_url = prop.url;
    return(
        <Grid xs={6}>
        <Link id="a-account-btn" to={item_url}>
        <Card sx={{ maxWidth: 500, backgroundColor: '#121212', color: '#fff'}}>
            <CardActionArea>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item_name}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </Link>
        </Grid>
    )
}

export default function AccountPage() {

    
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

    }, [accountCheck])



  return (
    <Container sx={{marginTop: 10}}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 1 }}>

                { accountCheck ?
                <>
                <AccountGridCard name="Logout" url="/logout" />
                <AccountGridCard name="List Users" url="/list-users" />
                </>
                :
                <>
                <AccountGridCard name="Register" url="/register" />
                <AccountGridCard name="Login" url="/login" />
                </>
                }
        </Grid>
    </Container>
  );
}