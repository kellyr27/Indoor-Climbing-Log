import React from 'react'
import { AppBar, Toolbar, Tabs, Tab, Button, Tooltip, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation } from 'react-router-dom';

const MyAppBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const basePath = `/${location.pathname.split('/')[1]}`;

    const handleTabClick = (route) => {
        navigate(route);
    };

    return (
        <AppBar position="static" sx={{
            backgroundColor: "#dddddd",
            color: "white",
            boxShadow: "none",
            borderBottom: "1px solid #999",
        }}>
            <Toolbar>
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: {
                        xs: "space-between",
                        sm: "space-between",
                    }
                }}>
                    <Box>
                        <Tabs value={basePath}>
                            <Tab label="Ascents" value="/ascents" onClick={() => handleTabClick('/ascents')} />
                            <Tab label="Routes" value="/routes" onClick={() => handleTabClick('/routes')} />
                            <Tab label="Stats" value="/stats" onClick={() => handleTabClick('/stats')} />
                        </Tabs>
                    </Box>
                    <Box>
                        <Tooltip title="Add an ascent">
                            <Button onClick={() => navigate('/ascents/new')} sx={{
                                borderRadius: "15%",
                                backgroundColor: 'rgb(255, 0, 0, 0.15)',
                            }}>
                                <AddIcon />
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar