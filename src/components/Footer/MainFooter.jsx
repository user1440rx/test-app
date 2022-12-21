import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FooterBox = styled(Box)({
    backgroundColor: '#000',
    marginTop: '20vh',
    color: 'white'
});

export default function MainFooter() {
    return(
        <>
        <FooterBox>
            <Typography sx={{ marginLeft: '100px', padding: 1}}>Footer</Typography>
        </FooterBox>
        </>
    )
}