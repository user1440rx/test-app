import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import Container from "@mui/material/Container";



const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  


const Logout = () => {

    const navigate = useNavigate();
    const handleLogout = async () => {
        document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        await new Promise(r => setTimeout(r, 2000));
        navigate("/");        
    }
    handleLogout();
    
    return(
        <>
        <Container sx={{width: '340px', marginTop: 10, backgroundColor: '#a7a1e8', padding: 4}}>
            <Alert severity="warning">Successfully Logged out...</Alert>
        </Container>
        </>
    );
}


export default Logout;