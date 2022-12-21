import * as React from 'react';
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
  return (
    <Container sx={{marginTop: 10}}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 1 }}>
            
                <AccountGridCard name="Register" url="/register" />
                <AccountGridCard name="Login" url="/login" />
                <AccountGridCard name="Logout" url="/logout" />
                <AccountGridCard name="List Users" url="/list-users" />
        </Grid>
    </Container>
  );
}