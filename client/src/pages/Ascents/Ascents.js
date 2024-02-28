import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();

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
                    type: 'date',
                    headerAlign: 'center',
                    align: 'center',
                }, {
                    field: 'TickType', 
                    headerName: 'Tick Type', 
                    width: 100,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'singleSelect',
                    valueOptions: ['Flash', 'Redpoint', 'Hangdog', 'Attempt'],
                    renderCell: (params) => {
                        return tickTypeIcons[params.value]
                    },
                    headerAlign: 'center',
                    align: 'center',
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
                    type: 'string',
                    headerAlign: 'center',
                    align: 'center',
                }, {
                    field: 'RouteGrade',
                    headerName: 'Grade',
                    width: 100,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    valueGetter: (params) => {
                        const route = routes.find((route) => {
                            return route.id === params.row.RouteId
                        });
                        return route.Grade
                    },
                    type: 'number',
                    headerAlign: 'center',
                    align: 'center',
                }, {
                    field: 'Notes', 
                    headerName: 'Notes', 
                    flex: 1,
                    minWidth: 200,
                    sortable: false,
                    filterable: true,
                    editable: false,
                    type: 'string',
                    renderCell: (params) => (
                        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                          {params.value}
                        </div>
                    ),
                    headerAlign: 'center',
                    align: 'left',
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
                rowHeight={70}
                onRowDoubleClick={(params) => {
                    navigate(`/ascents/${params.row.id}`);
                }}
            />
        </div>
    );
}

export default Ascents;

