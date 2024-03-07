import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Autocomplete, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from '../../assets/svg';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * TODO: Remove the word INPUT
 */

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const popularColors = ['black', 'white', 'blue', 'red', 'gray', 'green', 'yellow', 'purple', 'orange', 'pink'];

const EditAscent = () => {
    const { id } = useParams();
    const [date, setDate] = useState(getTodayDate());
    const [notes, setNotes] = useState('');
    const [inputRouteName, setInputRouteName] = useState('');
    const [inputRouteGrade, setInputRouteGrade] = useState('');
    const [inputRouteColour, setInputRouteColour] = useState('');
    const [tickType, setTickType] = useState('');
    const [routes, setRoutes] = useState([]);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [gradeDisabled, setGradeDisabled] = useState(false);
    const [isFirstAscent, setIsFirstAscent] = useState(false);
    const [initialRouteId, setInitialRouteId] = useState(null);
    const [showFlash, setShowFlash] = useState(false);
    const token = localStorage.getItem('token');
    const baseUrl = process.env.REACT_APP_BASE_URL;


    const navigate = useNavigate();

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    const handleInputRouteNameChange = (e, value) => {
        setInputRouteName(value);
    };

    const handleInputRouteGradeChange = (e) => {
        setInputRouteGrade(e.target.value);
    };

    const handleInputRouteColourChange = (e) => {
        setInputRouteColour(e.target.value);
    }

    const handleTickTypeChange = (e, newTickType) => {
        setTickType(newTickType);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tickType) {
            alert('Please select a tick type.');
            return;
        }
        
        // Create a new ascent object
        const newAscent = {
            date: new Date(date).toISOString(),
            notes,
            routeName: inputRouteName,
            routeGrade: inputRouteGrade,
            routeColour: inputRouteColour,
            tickType: tickType[0].toUpperCase() + tickType.slice(1)
        }

        axios.put(`${baseUrl}/api/ascents/${id}`, newAscent, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                // Handle the response
                navigate('/ascents');
            })
            .catch((error) => {
                // Handle the error
                console.error('Error:', error);
            });

    };

    useEffect(() => {
        // Fetch routes from API
        axios.get(`${baseUrl}/api/routes`)
            .then(response => {
                setRoutes(response.data.reverse());
            })
            .catch(error => {
                console.error(error);
            });

    }, [baseUrl]);

    useEffect(() => {
        axios.get(`${baseUrl}/api/ascents/${id}`) // Fetch the ascent to edit
            .then(response => {
                const ascent = response.data;
                setDate(ascent.Date.split('T')[0]);
                setNotes(ascent.Notes);
                setInitialRouteId(ascent.RouteId);
                setInputRouteName(ascent.Route.Name);
                setIsFirstAscent(ascent.isFirstAscent);
                setShowFlash(ascent.isFirstAscent);
                setTickType(ascent.TickType.toLowerCase());
            })
            .catch(error => {
                console.error(error);
            });
    }, [id, baseUrl]);

    useEffect(() => {
        const route = routes.find(route => route.Name === inputRouteName);

        if (route) {
            setInputRouteGrade(route.Grade);
            setInputRouteColour(route.Colour);
            setGradeDisabled(true);
            if (route.id === initialRouteId) {

                setShowFlash(isFirstAscent)
            } else {
                setShowFlash(false);
            }

        } else {
            setInputRouteGrade('');
            setInputRouteColour('')
            setGradeDisabled(false);
            setShowFlash(true)
        }
    }, [inputRouteName, routes, initialRouteId, isFirstAscent, showFlash]);

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
                        Edit Ascent
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Date"
                                    type="date"
                                    value={date}
                                    onChange={handleDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    freeSolo
                                    options={routes}
                                    getOptionLabel={(option) => option ? option.Name : ''}
                                    onInputChange={handleInputRouteNameChange}
                                    value={routes.find(route => route.Name === inputRouteName) || ''}
                                    renderInput={(params) => <TextField {...params} label="Route" required fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="number"
                                    label="Grade Number"
                                    value={inputRouteGrade}
                                    onChange={(e) => setInputRouteGrade(e.target.value)}
                                    disabled={gradeDisabled}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl required fullWidth >
                                    <InputLabel id="route-colour-label">Route Colour</InputLabel>
                                    <Select
                                        labelId="route-colour-label"
                                        value={inputRouteColour}
                                        onChange={handleInputRouteColourChange}
                                        disabled={gradeDisabled}
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
                                <ToggleButtonGroup
                                    value={tickType}
                                    exclusive
                                    onChange={handleTickTypeChange}
                                    aria-label="tick type"
                                    required
                                    fullWidth
                                >
                                    {!showFlash ? (
                                        <ToggleButton value="redpoint" aria-label="redpoint">
                                            <RedpointSVG />
                                        </ToggleButton>
                                    ) : (
                                        <ToggleButton value="flash" aria-label="flash">
                                            <FlashSVG />
                                        </ToggleButton>
                                    )}
                                    <ToggleButton value="hangdog" aria-label="hangdog">
                                        <HangdogSVG />
                                    </ToggleButton>
                                    <ToggleButton value="attempt" aria-label="attempt">
                                        <AttemptSVG />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Notes"
                                    multiline
                                    rows={3}
                                    value={notes}
                                    onChange={handleNotesChange}
                                    fullWidth
                                />
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
};

export default EditAscent;