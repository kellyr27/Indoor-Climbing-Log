import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from '../../../src/assets/svg';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, List, ListItem, Typography, Button, Grid, Box, Paper } from '@mui/material';
import TickTypeIcon from '../../components/TickTypeIcon';
import RouteGrade from '../../components/RouteGrade';
import RouteColour from '../../components/RouteColour';

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
        
        <Grid container justifyContent="center">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    minHeight: '92vh',

                }}
            >
                <Card sx={{ padding: 2,  maxWidth: { xs: '100%', sm: 500 }, minWidth: {xs: '100%',sm: 500} }}>
                    <CardHeader
                        title={
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Box>
                                    <RouteColour colour={route.Colour} />
                                </Box>
                                <Box>
                                    {route.Name}
                                </Box>
                                <Box>
                                    <RouteGrade grade={route.Grade} />
                                </Box>
                            </Box>
                        }
                    />
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" color="primary" onClick={handleEditClick} sx={{marginBottom: '30px'}}>
                                Edit Route
                            </Button>
                        </Box>
                        <Typography variant="h6" align="center">List of Ascents</Typography>
                        <List>
                            {ascents.map((ascent) => {
                                const date = format(parseISO(ascent.Date), 'd MMM yyyy');
                                return (
                                    <ListItem 
                                        button 
                                        onDoubleClick={() => navigate(`/ascents/${ascent.id}`)} 
                                        key={ascent.id}
                                    >
                                        <span style={{ marginRight: '10px' }}><TickTypeIcon tickType={ascent.TickType}/></span>
                                        <span style={{ marginRight: '10px', minWidth: '100px' }}>{date}</span>
                                        <span>{ascent.Notes}</span>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Grid>
    );
}

export default ClimbingRoute;