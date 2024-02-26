
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClimbingRoutes = () => {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        axios.get('/api/routes')
            .then(response => {
                setRoutes(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Routes</h1>

            {/* <ul>
                {routes.map(route => (
                    <Link to={`/routes/${route.id}`}>
                        <li key={route.id}>{route.Name}, {route.Grade} {route.Colour}</li>
                    </Link>
                ))}
            </ul> */}
        </div>
    );
}

export default ClimbingRoutes;