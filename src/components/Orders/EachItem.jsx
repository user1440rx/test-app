import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: '#303030',
    padding: theme.spacing(2),
    maxWidth: 600,
    color: theme.palette.text.primary,
  }));


const OrderEachItem = (prop) => {
    var orders_id = prop.i_id;
    var time_of_order = prop.i_date;
    var items_ordered = prop.i_orderitems;
    var item_key = prop.i_num;
    

    return(
        <React.Fragment key={item_key}>
        <StyledPaper sx={{ my: 3, mx: 'auto', p: 2, }}>
            <Grid container spacing={2}>
                <Grid item xs>
                    <Typography noWrap variant="h5" sx={{color: '#fff', marginBottom: 1}}>Order#{orders_id}</Typography>
                </Grid>
                <Stack sx={{marginLeft: 4, marginBottom: 2}} direction="column" spacing={1}>
                    {items_ordered[0].map((id) => {
                        return <Button sx={{fontWeight: '500', color: 'white'}} key={id} size="small">{id}</Button>
                    })}
                </Stack>
            </Grid>
            <Grid item>
                <Typography variant="button" sx={{color: '#95c8fc', marginBottom: 1}}>Order Date/Time: {time_of_order}</Typography>
            </Grid>
        </StyledPaper>
        </React.Fragment>
    );
};

export default OrderEachItem;