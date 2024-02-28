import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Paper, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from '../../../src/assets/svg';

const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

const Ascent = () => {
    const [ascent, setAscent] = useState({});
    const [route, setRoute] = useState({});
    const { id } = useParams()
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // First, load the ascent data
                const ascentResponse = await axios.get(`/api/ascents/${id}`);
                setAscent(ascentResponse.data);
                console.log('Ascent:', ascentResponse.data);
                // Then, load the route data based on the ascent's RouteId
                const routeResponse = await axios.get(`/api/routes/${ascentResponse.data.RouteId}`);
                setRoute(routeResponse.data);
                console.log('Route:', routeResponse.data);

            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [id]);


    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        axios.delete(`/api/ascents/${id}`)
            .then(response => {
                navigate('/ascents');
            })
            .catch(error => {
                console.error(error);
            });
        
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>

                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        {formatDate(ascent.Date)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Typography variant="h4">
                            {ascent.TickType === 'Flash' && <FlashSVG style={{ width: '1em', height: '1em' }}/>}
                            {ascent.TickType === 'Redpoint' && <RedpointSVG style={{ width: '1em', height: '1em' }}/>}
                            {ascent.TickType === 'Hangdog' && <HangdogSVG style={{ width: '1em', height: '1em' }}/>}
                            {ascent.TickType === 'Attempt' && <AttemptSVG style={{ width: '1em', height: '1em' }}/>}
                        </Typography>
                        <Typography variant="h4">
                            <Link to={`/routes/${route.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {route.Name}
                            </Link>
                        </Typography>
                        <Typography variant="h4">
                            {route.Grade}
                        </Typography>
                    </Box>
             
                    <Typography variant="body1" gutterBottom>
                        {ascent.Notes}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                            Delete
                        </Button>
                    </Box>
                </Paper>

                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>
                        Delete Ascent
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this ascent?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
}

export default Ascent;