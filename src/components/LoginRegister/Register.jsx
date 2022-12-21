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
  


const Register = () => {

    const usernameRef = useRef();
    const errorRef = useRef();

    
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const registerAPI = `${process.env.REACT_APP_API_URL}/account/register`;
            const response = await Axios.post(registerAPI, 
                JSON.stringify({username: user, password: pwd, email}),
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
                <Alert severity="success">Account Created. <a id="reg-loginbtn" href="/login">Click here to Login</a></Alert>
            </Container>
        ) : (
            <Container sx={{width: '340px', marginTop: 10, backgroundColor: '#a7a1e8', padding: 4}}>
                <Alert severity="error" ref={errorRef} className={errMsg ? "errmsg" : "errhide"}>{errMsg}</Alert>
                <Typography variant="h3" gutterBottom sx={{fontWeight: '500'}}>Register</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                    required
                    id="email"
                    label="E-Mail"
                    variant="standard"
                    autoComplete="off"
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                    <br /><br />
                    <TextField
                    required
                    id="username"
                    label="Username"
                    variant="standard"
                    ref={usernameRef}
                    autoComplete="off"
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
                    <Button size="medium" onClick={handleSubmit} variant="contained" color="secondary">Create Account</Button>
                    <br /><br />
                    <p>Account Exists?<br />
                        <Link to="/login">Login</Link>
                    </p>
                </form>
            </Container>
        
        )}
        </>
    );
}


export default Register;