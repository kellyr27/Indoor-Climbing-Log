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
    const { id } = useParams()
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    
    useEffect(() => {
        axios.get(`/api/ascents/${id}`)
            .then(response => {
                setAscent(response.data)
            })
            .catch(error => {
                console.error(error);
            });
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
                console.log("Ascent deleted successfully");
                navigate('/ascents');
            })
            .catch(error => {
                console.error(error);
            });
        
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Ascent {id}
                </Typography>

                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="body1" gutterBottom>
                        {formatDate(ascent.Date)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <AttemptSVG /> {ascent.TickType}
                    </Typography>
                    
                    <Typography variant="body1" gutterBottom>
                        {ascent.Notes}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                            Edit
                        </Button>
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