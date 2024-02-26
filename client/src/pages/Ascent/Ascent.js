import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Ascent = () => {
    const [ascent, setAscent] = useState({});
    const { id } = useParams()

    
    useEffect(() => {
        axios.get(`/api/ascents/${id}`)
            .then(response => {
                setAscent(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    return (
        <div>
            <h1>Ascent {id}</h1>

            <p>{ascent.Date}</p>
            <p>{ascent.TickType}</p>
            <p>{ascent.Notes}</p>

        </div>
    );
}

export default Ascent;