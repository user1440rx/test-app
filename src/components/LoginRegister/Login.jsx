import { useRef, useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';

import Axios from 'axios';



const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  


const Login = () => {

    const usernameRef = useRef();
    const errorRef = useRef();

    
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginAPI = `${process.env.REACT_APP_API_URL}/account/login`;
            const response = await Axios.post(loginAPI, 
                JSON.stringify({username: user, password: pwd}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                console.log(response.data);
                setSuccess(true);
        }

        catch(err) {
            setErrMsg(err.response.data)
        }
    }
    
    return(
        <>
        { success ? (
            <Container sx={{width: '340px', marginTop: 10, backgroundColor: '#a7a1e8', padding: 4}}>
                <Alert severity="success">Successfully Logged in.</Alert>
            </Container>
        ) : (
            <Container sx={{width: '340px', marginTop: 10, backgroundColor: '#a7a1e8', padding: 4}}>
                <Alert severity="error" ref={errorRef} className={errMsg ? "errmsg" : "errhide"}>{errMsg}</Alert>
                <Typography variant="h3" gutterBottom sx={{fontWeight: '500'}}>Login</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                    required
                    id="username"
                    label="Username"
                    variant="standard"
                    ref={usernameRef}
                    autoComplete="on"
                    onChange={(e)=> setUser(e.target.value)}
                    />
                    <br /><br />
                    <TextField
                    required
                    id="password"
                    label="Password"
                    variant="standard"
                    type="password" 
                    autoComplete="off"
                    onChange={(e)=> setPwd(e.target.value)}
                    />
                    <br /><br />
                    <Button size="medium" onClick={handleSubmit} variant="contained" color="secondary">Sign In</Button>
                    <br /><br />
                    <p>Create Account?<br />
                        <Link to="/register">Register</Link>
                    </p>
                </form>
            </Container>
        
        )}
        </>
    );
}


export default Login;