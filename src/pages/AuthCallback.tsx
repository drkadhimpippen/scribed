import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import FHIR from 'fhirclient';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const completeAuth = async () => {
      try {
        await FHIR.oauth2.ready();
        navigate('/encounters');
      } catch (err) {
        console.error('Auth error:', err);
        setError('Failed to complete authentication. Please try again.');
      }
    };

    completeAuth();
  }, [navigate]);

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <CircularProgress />
    </Box>
  );
};

export default AuthCallback; 