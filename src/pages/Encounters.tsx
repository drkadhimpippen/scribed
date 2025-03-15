import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { Stop as StopIcon, PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import { AudioEncounter } from '../types';

const Encounters: React.FC = () => {
  const [activeEncounter, setActiveEncounter] = useState<AudioEncounter | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleStartEncounter = () => {
    const newEncounter: AudioEncounter = {
      id: Date.now().toString(),
      status: 'in-progress',
      patientId: 'temp-patient-id', // This will come from Epic context
      startTime: new Date().toISOString(),
    };
    setActiveEncounter(newEncounter);
    setIsRecording(true);
    // TODO: Start audio recording
  };

  const handleEndEncounter = () => {
    if (activeEncounter) {
      const endedEncounter: AudioEncounter = {
        ...activeEncounter,
        status: 'finished',
        endTime: new Date().toISOString(),
      };
      setActiveEncounter(endedEncounter);
      setIsRecording(false);
      // TODO: Stop audio recording and process transcription
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Medical Encounters
      </Typography>

      {!activeEncounter ? (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleStartEncounter}
          sx={{ mb: 4 }}
        >
          Begin New Encounter
        </Button>
      ) : (
        <Paper sx={{ p: 3, mb: 4, backgroundColor: isRecording ? '#fff3f3' : 'inherit' }}>
          <Typography variant="h6" gutterBottom>
            Active Encounter
          </Typography>
          <Typography>
            Started: {new Date(activeEncounter.startTime).toLocaleString()}
          </Typography>
          {isRecording ? (
            <Button
              variant="contained"
              color="error"
              startIcon={<StopIcon />}
              onClick={handleEndEncounter}
              sx={{ mt: 2 }}
            >
              End Encounter
            </Button>
          ) : (
            <Typography color="success.main" sx={{ mt: 2 }}>
              Encounter completed at {activeEncounter.endTime ? new Date(activeEncounter.endTime).toLocaleString() : ''}
            </Typography>
          )}
        </Paper>
      )}

      <Paper sx={{ mt: 4 }}>
        <List>
          {/* This will be populated with past encounters */}
          <ListItem>
            <ListItemText
              primary="Sample Past Encounter"
              secondary="March 15, 2024 10:00 AM"
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="play">
                <PlayArrowIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Encounters; 