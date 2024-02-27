import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from '../../../src/assets/svg';


const tickTypeIcons = {
    Flash: <FlashSVG />,
    Redpoint: <RedpointSVG />,
    Hangdog: <HangdogSVG />,
    Attempt: <AttemptSVG />,
};

const Ascents = () => {
    const [ascents, setAscents] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [columns, setColumns] = useState([]);



    useEffect(() => {
        axios.get('/api/ascents')
            .then(response => {
                setAscents(response.data.reverse());
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('/api/routes')
            .then(response => {
                setRoutes(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        
    }, []);

    useEffect(() => {
        if (ascents.length > 0 && routes.length > 0) {
            setColumns([
                {
                    field: 'Date', 
                    headerName: 'Date', 
                    width: 150,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    valueFormatter: (params) => {
                        const dateObj = new Date(params.value);
                        const day = String(dateObj.getDate())
                        const month = dateObj.toLocaleString('default', { month: 'short' });
                        const year = String(dateObj.getFullYear())
                        return `${day} ${month} ${year}`;
                    },
                    type: 'date'
                }, {
                    field: 'TickType', 
                    headerName: 'Tick Type', 
                    width: 150,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'singleSelect',
                    valueOptions: ['Flash', 'Redpoint', 'Hangdog', 'Attempt'],
                    renderCell: (params) => {
                        return tickTypeIcons[params.value]
                    }
                }, {
                    field: 'Notes', 
                    headerName: 'Notes', 
                    width: 150,
                    sortable: false,
                    filterable: true,
                    editable: false,
                    type: 'string'
                }, {
                    field: 'RouteName',
                    headerName: 'Route Name',
                    width: 150,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    valueGetter: (params) => {
                        const route = routes.find((route) => {
                            return route.id === params.row.RouteId
                        });
                        return route.Name
                    },
                    type: 'string'
                }, {
                    field: 'RouteGrade',
                    headerName: 'Route Grade',
                    width: 150,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    valueGetter: (params) => {
                        const route = routes.find((route) => {
                            return route.id === params.row.RouteId
                        });
                        return route.Grade
                    },
                    type: 'number'
                }, {
                    field: 'details',
                    headerName: 'Details',
                    sortable: false,
                    width: 150,
                    renderCell: (params) => (
                      <Link to={`/ascents/${params.row.id}`}>
                        View Details
                      </Link>
                    ),
                }
            ])
        }
    }, [ascents, routes])

    return (
        <div style={{ height: '92vh', width: '100%' }}>
            <DataGrid
                rows={ascents}
                columns={columns}
                pageSize={100}
                disableCellFocus
            />
        </div>
    );
}

export default Ascents;

