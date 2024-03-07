import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from '../../../src/assets/svg';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, List, ListItem, Typography, Button } from '@mui/material';


const getTickTypeSvg = (tickType) => {
    switch (tickType) {
        case 'Flash':
            return <FlashSVG />;
        case 'Redpoint':
            return <RedpointSVG />;
        case 'Hangdog':
            return <HangdogSVG />;
        case 'Attempt':
            return <AttemptSVG />;
        default:
            return null;
    }
}

const ClimbingRoute = () => {
    const [route, setRoute] = useState({});
    const [ascents, setAscents] = useState([]);
    const { id } = useParams()

    const navigate = useNavigate();


    const handleEditClick = () => {
        navigate(`/routes/${id}/edit`);
    };

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
                const data = response.data.sort((a, b) => {
                    // Sort by date
                    const dateComparison = new Date(b.Date) - new Date(a.Date);
                    if (dateComparison !== 0) return dateComparison;
                  
                    // If dates are equal, sort by id
                    return b.id - a.id;
                });

                setAscents(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    return (

        <Card>
            <CardHeader
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ backgroundColor: route.Colour, width: 20, height: 20, marginRight: 10 }} />
                        {route.Name}
                    </div>
                }
            />
            <CardContent>
                <Typography variant="body1">{route.Grade}</Typography>
                <Button variant="contained" color="primary" onClick={handleEditClick}>
                    Edit Route
                </Button>
                <Typography variant="h6">List of Ascents</Typography>
                <List>
                    {ascents.map((ascent) => {
                        const date = format(parseISO(ascent.Date), 'd MMM yyyy');
                        return (
                            <ListItem 
                                button 
                                onDoubleClick={() => navigate(`/ascents/${ascent.id}`)} 
                                key={ascent.id}
                            >
                                <span style={{ marginRight: '10px' }}>{getTickTypeSvg(ascent.TickType)}</span>
                                <span style={{ marginRight: '10px', minWidth: '100px' }}>{date}</span>
                                <span>{ascent.Notes}</span>
                            </ListItem>
                        )
                    })}
                </List>
            </CardContent>
        </Card>
    );
}

export default ClimbingRoute;