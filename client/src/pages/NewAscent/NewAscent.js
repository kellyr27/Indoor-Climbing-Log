import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Autocomplete, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from '../../../src/assets/svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const popularColors = ['black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua'];

const NewAscent = () => {
    const [date, setDate] = useState(getTodayDate());
    const [notes, setNotes] = useState('');
    const [inputRouteName, setInputRouteName] = useState('');
    const [inputRouteGrade, setInputRouteGrade] = useState('');
    const [inputRouteColour, setInputRouteColour] = useState('');
    const [tickType, setTickType] = useState('');
    const [routes, setRoutes] = useState([]);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [gradeDisabled, setGradeDisabled] = useState(false);

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

        axios.post('/api/ascents', newAscent)
            .then((response) => {
                // Handle the response
                console.log('Success:', response.data);
                navigate('/ascents');
            })
            .catch((error) => {
                // Handle the error
                console.error('Error:', error);
            });

    };

    useEffect(() => {
        // Fetch routes from API
        axios.get('/api/routes')
            .then(response => {
                setRoutes(response.data.reverse());
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    useEffect(() => {
        const route = routes.find(route => route.Name === inputRouteName);
        if (route) {
            setInputRouteGrade(route.Grade);
            setInputRouteColour(route.Colour);
            setGradeDisabled(true);
        } else {
            setInputRouteGrade('');
            setInputRouteColour('')
            setGradeDisabled(false);
        }
    }, [inputRouteName, routes]);

    return (
        <>
        <Box>
            <h2>Create New Ascent</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                </div>
                <div>
                    <TextField
                        label="Notes"
                        multiline
                        value={notes}
                        onChange={handleNotesChange}
                    />
                </div>
                <div>
                    <Autocomplete
                        freeSolo
                        options={routes}
                        getOptionLabel={(option) => option.Name}
                        onInputChange={handleInputRouteNameChange}
                        renderInput={(params) => <TextField {...params} label="Route" required />}
                    />
                </div>
                <div>
                    <TextField
                        type="number"
                        label="Grade Number"
                        value={inputRouteGrade}
                        onChange={(e) => setInputRouteGrade(e.target.value)}
                        disabled={gradeDisabled}
                        required
                    />
                </div>
                <div>
                    <FormControl required>
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
                </div>
                <div>
                    <ToggleButtonGroup
                        value={tickType}
                        exclusive
                        onChange={handleTickTypeChange}
                        aria-label="tick type"
                        required
                    >
                        {gradeDisabled ? (
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
                </div>

                <Button type="submit" variant="contained">Submit</Button>
            </form>
        </Box>
        </>
    );
};

export default NewAscent;