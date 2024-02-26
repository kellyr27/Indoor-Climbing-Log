
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Ascents = () => {
    const [ascents, setAscents] = useState([]);

    useEffect(() => {
        axios.get('/api/ascents')
            .then(response => {
                setAscents(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Ascents</h1>

            <Link to="/ascents/new">
                <button>Create New Ascent</button>
            </Link>
            

            <ul>
                {ascents.map(ascent => (
                    <Link to={`/ascents/${ascent.id}`}>
                        <li key={ascent.id}>{ascent.Date}, {ascent.TickType} {ascent.Notes}</li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default Ascents;