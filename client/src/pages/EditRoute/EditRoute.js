import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

const popularColors = ['black', 'white', 'blue', 'red', 'gray', 'green', 'yellow', 'purple', 'orange', 'pink'];

const EditRoute = () => {

    const [route, setRoute] = useState({});
    const [routeName, setRouteName] = useState('');
    const [routeGrade, setRouteGrade] = useState('');
    const [routeColour, setRouteColour] = useState('');
    const { id } = useParams()
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`/api/routes/${id}`)
            .then(response => {
                setRoute(response.data);
                setRouteName(response.data.Name);
                setRouteGrade(response.data.Grade);
                setRouteColour(response.data.Colour);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const editedRoute = {
            Name: routeName,
            Grade: routeGrade,
            Colour: routeColour,
        }

        axios.put(`/api/routes/${id}`, editedRoute, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                navigate('/routes');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        
    };

    const handleNameChange = (e) => {
        setRouteName(e.target.value);
    }

    const handleGradeChange = (e) => {
        setRouteGrade(e.target.value);
    }

    const handleColourChange = (e) => {
        setRouteColour(e.target.value);
    }

    return (
        <Grid container justifyContent="center">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    minHeight: '92vh',
                }}
            >
                <Paper sx={{ padding: 2,  maxWidth: { xs: '100%', sm: 500 } }}>
                    <Typography variant="h2" align="center" sx={{ mt: 1, mb: 3 }}>
                        Edit Route
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    label="Name"
                                    value={routeName}
                                    onChange={handleNameChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="number"
                                    label="Grade"
                                    value={routeGrade}
                                    onChange={handleGradeChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl required fullWidth >
                                    <InputLabel id="route-colour-label">Route Colour</InputLabel>
                                    <Select
                                        labelId="route-colour-label"
                                        value={routeColour}
                                        onChange={handleColourChange}
                                    >
                                        {popularColors.map((color) => (
                                            <MenuItem value={color} key={color}>
                                                <Box
                                                    sx={{
                                                        width: 40,
                                                        height: 20,
                                                        backgroundColor: color,
                                                    }}
                                                />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth>Save Changes</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Grid>
    );
}

export default EditRoute;