import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from '../../../src/assets/svg';
import dateToDisplay from '../../utils/dateToDisplay';
import TickTypeIcon from '../../components/TickTypeIcon';
import RouteColour from '../../components/RouteColour';
import RouteGrade from '../../components/RouteGrade';

const Ascents = () => {
    const [ascents, setAscents] = useState([]);
    const [columns, setColumns] = useState([]);
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${baseUrl}/api/ascents`)
            .then(response => {

                // Sort the ascents by date then by id
                const data = response.data.sort((a, b) => {
                    // Sort by date
                    const dateComparison = new Date(b.Date) - new Date(a.Date);
                    if (dateComparison !== 0) return dateComparison;
                  
                    // If dates are equal, sort by id
                    return b.id - a.id;
                });

                setAscents(data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [baseUrl]);

    useEffect(() => {
        if (ascents.length > 0) {
            setColumns([
                {
                    field: 'Date', 
                    headerName: 'Date', 
                    width: 150,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    valueFormatter: (params) => {
                        return dateToDisplay(params.value);
                    },
                    type: 'date',
                    headerAlign: 'center',
                    align: 'center',
                }, 
                {
                    field: 'TickType', 
                    headerName: 'Tick Type', 
                    width: 100,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    type: 'singleSelect',
                    valueOptions: ['Flash', 'Redpoint', 'Hangdog', 'Attempt'],
                    renderCell: (params) => {
                        return (
                            <TickTypeIcon tickType={params.value} />
                        )
                    },
                    headerAlign: 'center',
                    align: 'center',
                }, 
                {
                    field: 'RouteName',
                    headerName: 'Route Name',
                    width: 200,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    valueGetter: (params) => {
                        return params.row.Route.Name
                    },
                    renderCell: (params) => {

                        return (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <RouteColour colour={params.row.Route.Colour} />
                                {params.row.Route.Name}
                            </div>
                        )
                    },
                    type: 'string',
                    headerAlign: 'center',
                    align: 'left',
                }, 
                {
                    field: 'RouteGrade',
                    headerName: 'Grade',
                    width: 100,
                    sortable: true,
                    filterable: true,
                    editable: false,
                    valueGetter: (params) => {
                        return params.row.Route.Grade
                    },
                    renderCell: (params) => {
                        return (
                            <RouteGrade grade={params.row.Route.Grade} />
                        )
                    },
                    type: 'number',
                    headerAlign: 'center',
                    align: 'center',
                }, 
                {
                    field: 'Notes', 
                    headerName: 'Notes', 
                    flex: 1,
                    minWidth: 200,
                    maxWidth: 400,
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
    }, [ascents])

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

