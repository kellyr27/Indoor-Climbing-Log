import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';

const Stats = () => {
    const [sessionStats, setSessionStats] = useState([]);
    const baseUrl = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        axios.get(`${baseUrl}/api/stats/sessions`)
            .then(response => {
                const formattedData = response.data.map(item => ({
                    ...item,
                    date: new Date(item.date).getTime(), // Convert date to timestamp
                }));
                setSessionStats(formattedData);
            })
            .catch(error => console.error(error));
    }, [baseUrl]);

    const minValue = sessionStats.length > 0 ? Math.min(...sessionStats.map(item => item.averageRating)) - 5 : 0;

    const formatDate = (tickItem) => {
        const date = new Date(tickItem);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    };

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            p={2}
            mt={4}
        >
            <ResponsiveContainer width="100%" height={500} aspect={4 / 3}>
                <LineChart
                    data={sessionStats}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate}>
                        <Label value="Date" offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis dataKey="averageRating" domain={[minValue, 'auto']}>
                        <Label value="Average Rating" angle={-90} position="insideLeft" />
                    </YAxis>
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Line type="monotone" dataKey="averageRating" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default Stats;