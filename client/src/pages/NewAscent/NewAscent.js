import React, { useState, useEffect } from 'react';

const NewAscent = () => {
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [inputRouteName, setInputRouteName] = useState('');
    const [inputRouteGrade, setInputRouteGrade] = useState('');
    const [inputRouteColour, setInputRouteColour] = useState('');
    const [tickType, setTickType] = useState('');
    const [routes, setRoutes] = useState([]);
    const [filteredRoutes, setFilteredRoutes] = useState([]);

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    const handleInputRouteNameChange = (e) => {
        setInputRouteName(e.target.value);

        // TODO: FIX THIS
        setFilteredRoutes(routes.filter((route) => {
            return true
        }))
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

    return (
        <div>
            <h2>Create New Ascent</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date:</label>
                    <input type="date" value={date} onChange={handleDateChange} />
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea value={notes} onChange={handleNotesChange} />
                </div>
                <div>
                    <label>Route:</label>
                    <input type="text" value={inputRouteName} onChange={handleInputRouteNameChange} />
                    {inputRouteName && (
                        <ul>
                            {filteredRoutes.slice(0, 5).map((route) => {
                                return (
                                    <div key={route.id} onClick={() => setInputRouteName(route.Name)}>
                                        {route.Name} {route.Grade}
                                    </div>
                                )
                            })}
                        </ul>
                    )}

                    <label>Grade:</label>
                    <input type="number" value={inputRouteGrade} onChange={handleInputRouteGradeChange} />

                    <label>Colour:</label>
                    <input type="color" value={inputRouteColour} onChange={handleInputRouteColourChange} />
                </div>
                <div>
                    <label>Tick Type:</label>
                    <select value={tickType} onChange={handleTickTypeChange}>
                        <option value="">Select Tick Type</option>
                        <option value="Flash">Flash</option>
                        <option value="Redpoint">Redpoint</option>
                        <option value="Hangdog">Hangdog</option>
                        <option value="Attempt">Attempt</option>
                    </select>
                </div>
                <button type="submit">Create Ascent</button>
            </form>
        </div>
    );
};

export default NewAscent;