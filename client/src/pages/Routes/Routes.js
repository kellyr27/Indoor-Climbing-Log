
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import TickTypeIcon from '../../components/TickTypeIcon';
import RouteColour from '../../components/RouteColour';
import RouteGrade from '../../components/RouteGrade';
import dateToDisplay from '../../utils/dateToDisplay';


const ClimbingRoutes = () => {
    const [routes, setRoutes] = useState([]);
    const [columns, setColumns] = useState([]);
    const [ascents, setAscents] = useState([]);
    const [sortedRoutes, setSortedRoutes] = useState([]);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    

    //TODO: Fix sorting!

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${baseUrl}/api/routes`)
            .then(response => {
                setRoutes(response.data.reverse());
            })
            .catch(error => {
                console.error(error);
            });
    }, [baseUrl]);

    useEffect(() => {
        axios.get(`${baseUrl}/api/ascents`)
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
    }, [baseUrl]);

    useEffect(() => {
        // Sort Routes by last ascent date then by id
        if (routes.length > 0 && ascents.length > 0) {
            setSortedRoutes([...routes].sort((a, b) => {
                // Sort by last ascent date
                const matchingAscentsA = ascents.filter(ascent => ascent.RouteId === a.id);
                const matchingAscentsB = ascents.filter(ascent => ascent.RouteId === b.id);
                
                if (matchingAscentsA.length > 0 && matchingAscentsB.length > 0) {
                    const dateComparison = new Date(matchingAscentsB[0].Date) - new Date(matchingAscentsA[0].Date);
                    if (dateComparison !== 0) {
                        return dateComparison
                    };
                }
                // If dates are equal, sort by id
                return b.id - a.id;
            }))
        }
    }, [routes, ascents]);

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
                            <RouteColour colour={params.row.Colour} />
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
                    renderCell: (params) => (
                        <RouteGrade grade={params.value} />
                    ),
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
                                    return (
                                        <Tooltip key={index} title={dateToDisplay(ascent.Date)}>
                                            <span>
                                                <TickTypeIcon tickType={ascent.TickType} />
                                            </span>
                                        </Tooltip>
                                    )
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
                            return dateToDisplay(matchingAscents[0].Date);
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
                            return dateToDisplay(matchingAscents[matchingAscents.length - 1].Date);
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
                rows={sortedRoutes}
                columns={columns}
                pageSize={100}
                disableCellFocus
                onRowDoubleClick={(params) => {
                    navigate(`/routes/${params.row.id}`);
                }}
            />
        </div>

    );
}

export default ClimbingRoutes;