import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import fhirService from '../services/fhir';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLaunch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const success = await fhirService.initialize();
      if (success) {
        const patient = await fhirService.getPatient();
        if (patient) {
          navigate('/encounters');
        } else {
          setError('Failed to retrieve patient information');
        }
      } else {
        setError('Failed to initialize FHIR client');
      }
    } catch (err) {
      setError('An error occurred during launch');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Check if we're in a SMART launch context
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isLaunch = urlParams.get('launch') && urlParams.get('iss');
    if (isLaunch) {
      handleLaunch();
    }
  }, [handleLaunch]);

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
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleLaunch}
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1 }} />
              Launching...
            </>
          ) : (
            'Launch with Epic'
          )}
        </Button>
      </Paper>
    </Box>
  );
};

export default Home; 