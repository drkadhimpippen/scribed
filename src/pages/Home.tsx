import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Scribed
      </Typography>
      <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
        Your AI Medical Scribe Assistant
      </Typography>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="body1" paragraph>
          Scribed helps healthcare providers focus on patient care by automatically
          transcribing and documenting medical encounters.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/encounters')}
          sx={{ mt: 2 }}
        >
          Start New Encounter
        </Button>
      </Paper>
    </Box>
  );
};

export default Home; 