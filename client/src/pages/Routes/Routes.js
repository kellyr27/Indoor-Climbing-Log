
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from '../../../src/assets/svg';
import { DataGrid } from '@mui/x-data-grid';


const tickTypeIcons = {
    Flash: <FlashSVG />,
    Redpoint: <RedpointSVG />,
    Hangdog: <HangdogSVG />,
    Attempt: <AttemptSVG />,
};

const ClimbingRoutes = () => {
    const [routes, setRoutes] = useState([]);
    const [columns, setColumns] = useState([]);
    const [ascents, setAscents] = useState([]);

    useEffect(() => {
        axios.get('/api/routes')
            .then(response => {
                setRoutes(response.data.reverse());
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios.get('/api/ascents')
            .then(response => {

                const data = response.data.sort((a, b) => {
                    // Sort by date
                    const dateComparison = new Date(b.Date) - new Date(a.Date);
                    if (dateComparison !== 0) return dateComparison;
                  
                    // If dates are equal, sort by id
                    return b.id - a.id;
                });

                setAscents(data);
                console.log('ascents', data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (routes.length > 0) {
            setColumns([
                {
                    field: 'Name',
                    headerName: 'Name',
                    width: 150,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'string',
                    renderCell: (params) => (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ backgroundColor: params.row.Colour, width: '20px', height: '20px', marginRight: '10px' }} />
                          {params.value}
                        </div>
                    ),
                }, {
                    field: 'Grade',
                    headerName: 'Grade',
                    width: 150,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'number'
                }, {
                    headerName: 'Ascents',
                    width: 350,
                    renderCell: (params) => {
                        const matchingAscents = ascents.filter(ascent => ascent.RouteId === params.row.id);
                        // TODO: Want in date order :(
                        return (
                            <div>
                                {matchingAscents.map((ascent) => {
                                    switch (ascent.TickType) {
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
                                })}
                            </div>
                        )
                    },
                }
            ]);
        }
    }, [routes, ascents]);

    return (

        <div style={{ height: '92vh', width: '100%' }}>
            <DataGrid
                rows={routes}
                columns={columns}
                pageSize={100}
                disableCellFocus
            />
        </div>

    );
}

export default ClimbingRoutes;