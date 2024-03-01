import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Stats = () => {
    const [sessionStats, setSessionStats] = useState([]);

    useEffect(() => {
        axios.get('/api/stats/sessions')
            .then(response => setSessionStats(response.data))
            .then(() => console.log(sessionStats))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <LineChart
                width={500}
                height={300}
                data={sessionStats}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="averageRating" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="averageRating" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
};

export default Stats;