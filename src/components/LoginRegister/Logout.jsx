import { forwardRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import Container from "@mui/material/Container";
import Axios from 'axios';


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  


const Logout = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        Axios.get('http://localhost:4000/account/logout', {withCredentials: true})
        .then((res) => {
            setTimeout(()=>{
                navigate('/');
            }, 1000)
        });
    }, [navigate])

    
    return(
        <>
        <Container sx={{width: '340px', marginTop: 10, backgroundColor: '#a7a1e8', padding: 4}}>
            <Alert severity="warning">Successfully Logged out...</Alert>
        </Container>
        </>
    );
}


export default Logout;