
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from '../../../src/assets/svg';
import { DataGrid } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import { format, parseISO } from 'date-fns';


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

    const navigate = useNavigate();

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
                    width: 200,
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
                    headerAlign: 'center',
                    align: 'left',
                }, 
                {
                    field: 'Grade',
                    headerName: 'Grade',
                    width: 150,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'number',
                    headerAlign: 'center',
                    align: 'center',
                }, 
                {
                    headerName: 'Ascents',
                    field: 'ascents',
                    width: 250,
                    sortable: false,
                    filterable: false,
                    editable: false,
                    renderCell: (params) => {
                        const matchingAscents = ascents.filter(ascent => ascent.RouteId === params.row.id);
                        return (
                            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                {matchingAscents.map((ascent, index) => {
                                    
                                    const date = parseISO(ascent.Date); // convert ISO date string to Date object
                                    const formattedDate = format(date, 'd MMM y');

                                    switch (ascent.TickType) {
                                        case 'Flash':
                                            return (
                                                <Tooltip key={index} title={formattedDate}>
                                                    <FlashSVG key={index} />
                                                </Tooltip>
                                            );
                                        case 'Redpoint':
                                            return (
                                                <Tooltip key={index} title={formattedDate}>
                                                    <RedpointSVG key={index} />
                                                </Tooltip>
                                            );
                                        case 'Hangdog':
                                            return (
                                                <Tooltip key={index} title={formattedDate}>
                                                    <HangdogSVG key={index} />
                                                </Tooltip>
                                            );
                                        case 'Attempt':
                                            return (
                                                <Tooltip key={index} title={formattedDate}>
                                                    <AttemptSVG key={index} />
                                                </Tooltip>
                                            );
                                        default:
                                            return '';
                                    }
                                })}
                            </div>
                        )
                    },
                    headerAlign: 'center',
                }, 
                {
                    headerName: 'Last Ascent Date',
                    field: 'lastAscentDate',
                    width: 150,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'date',
                    valueGetter: (params) => {
                        const matchingAscents = ascents.filter(ascent => ascent.RouteId === params.row.id);
                        if (matchingAscents.length > 0) {
                            const dateObj = new Date(matchingAscents[0].Date);
                            return dateObj
                        }
                        return null;
                    },
                    renderCell: (params) => {
                        const matchingAscents = ascents.filter(ascent => ascent.RouteId === params.row.id);
                        if (matchingAscents.length > 0) {
                            const dateObj = new Date(matchingAscents[0].Date);
                            const day = String(dateObj.getDate())
                            const month = dateObj.toLocaleString('default', { month: 'short' });
                            const year = String(dateObj.getFullYear())
                            return `${day} ${month} ${year}`;
                        }
                        return '';
                    },
                    headerAlign: 'center',
                    align: 'center',
                },
                {
                    headerName: 'First Ascent Date',
                    field: 'firstAscentDate',
                    width: 150,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'date',
                    valueGetter: (params) => {
                        const matchingAscents = ascents.filter(ascent => ascent.RouteId === params.row.id);
                        if (matchingAscents.length > 0) {
                            const dateObj = new Date(matchingAscents[matchingAscents.length - 1].Date);
                            return dateObj
                        }
                        return null;
                    },
                    renderCell: (params) => {
                        const matchingAscents = ascents.filter(ascent => ascent.RouteId === params.row.id);
                        if (matchingAscents.length > 0) {
                            const dateObj = new Date(matchingAscents[matchingAscents.length - 1].Date);
                            const day = String(dateObj.getDate())
                            const month = dateObj.toLocaleString('default', { month: 'short' });
                            const year = String(dateObj.getFullYear())
                            return `${day} ${month} ${year}`;
                        }
                        return '';
                    },
                    headerAlign: 'center',
                    align: 'center',
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
                onRowDoubleClick={(params) => {
                    navigate(`/routes/${params.row.id}`);
                }}
                sortModel={[
                    {
                        field: 'lastAscentDate',
                        sort: 'desc', // 'asc' for ascending and 'desc' for descending
                    },
                ]}
            />
        </div>

    );
}

export default ClimbingRoutes;