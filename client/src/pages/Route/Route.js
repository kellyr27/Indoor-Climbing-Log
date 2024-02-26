import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ClimbingRoute = () => {
    const [route, setRoute] = useState({});
    const [ascents, setAscents] = useState([]);
    const { id } = useParams()

    useEffect(() => {
        axios.get(`/api/routes/${id}`)
            .then(response => {
                setRoute(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);
    
    useEffect(() => {
        axios.get(`/api/routes/${id}/ascents`)
            .then(response => {
                setAscents(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    return (
        <div>
            <h1>Route {id}</h1>

            <p>{route.Name}</p>
            <p>{route.Grade}</p>
            <p>{route.Colour}</p>

            <h2>List of Ascents</h2>
            {ascents.map(ascent => (
                <div key={ascent.id}>
                    {/* Replace ascent.property with actual ascent properties */}
                    <p>{ascent.property}</p>
                </div>
            ))}
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

export default ClimbingRoute;