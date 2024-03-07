import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [code, setCode] = useState('');

    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_URL;


    const handleCodeChange = (event) => {
        setCode(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const data = {
            code: code,
        };

        axios.post(`${baseUrl}/api/token`, data)
        .then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            // Navigate to /ascents
            navigate('/ascents');
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2, // spacing between elements
            }}
        >
            <Typography variant="h4">Login</Typography>
            <TextField
                label="Code"
                value={code}
                onChange={handleCodeChange}
            />
            <Button type="submit" variant="contained">Login</Button>
        </Box>
    );
};

export default Login;
