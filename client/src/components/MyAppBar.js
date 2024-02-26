import React, {useEffect, useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

const MyAppBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const validTabPaths = ['/ascents', '/routes'];
    const initialTabValue = validTabPaths.includes(location.pathname) ? location.pathname : '/ascents';
    const [value, setValue] = useState(initialTabValue);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(newValue);
    };

    return (
        <AppBar position="static" style={{ height: '8vh', width: '100%' }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    St Peters Climbing Log
                </Typography>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Ascents" value="/ascents" />
                    <Tab label="Routes" value="/routes" />
                </Tabs>
                <Tooltip title="Add an ascent">
                    <Button color="inherit" onClick={() => navigate('/ascents/new')}>
                        <AddIcon />
                    </Button>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar

  