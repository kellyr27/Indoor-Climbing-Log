import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Autocomplete } from '@mui/material';

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

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

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    const handleInputRouteNameChange = (e, value) => {
        setInputRouteName(value.Name);
    };

    const handleInputRouteGradeChange = (e) => {
        setInputRouteGrade(e.target.value);
    };

    const handleInputRouteColourChange = (e) => {
        setInputRouteColour(e.target.value);
    }

    const handleTickTypeChange = (e) => {
        setTickType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission
    };

    useEffect(() => {
        // Fetch routes from API
        fetch('/api/routes')
            .then((response) => response.json())
            .then((data) => setRoutes(data));
    }, []);

    useEffect(() => {
        const route = routes.find(route => route.Name === inputRouteName);
        if (route) {
            setInputRouteGrade(route.Grade);
            setGradeDisabled(true);
        } else {
            setInputRouteGrade('');
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
                    />
                </div>
                {/* <div>
                    <TextField
                        label="Notes"
                        multiline
                        value={notes}
                        onChange={handleNotesChange}
                    />
                </div> */}
                {/* <div>
                    <Autocomplete
                        freeSolo
                        options={routes}
                        getOptionLabel={(option) => option.Name}
                        onInputChange={handleInputRouteNameChange}
                        renderInput={(params) => <TextField {...params} label="Route" />}
                    />
                </div> */}
                {/* <div>
                    <TextField
                        type="number"
                        label="Grade Number"
                        value={inputRouteGrade}
                        onChange={(e) => setInputRouteGrade(e.target.value)}
                        disabled={gradeDisabled}
                    />
                </div> */}
            </form>
        </Box>
        </>
    );
};

export default NewAscent;