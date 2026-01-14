import { Box, CircularProgress, LinearProgress, Stack, Typography } from '@mui/material';
import './styles.css';
import { useContext, useEffect, useState } from 'react';
import StepperContext from '@renderer/contexts/StepperContext';
import useTranscribe from './hooks/useTranscribe';

const TranslationProgress = () => {
  const { transcribe } = useTranscribe();

  const { setNextStepAvailable } = useContext(StepperContext)!;
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    setNextStepAvailable(!isTranslating);
  }, [isTranslating]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5" fontWeight={'bold'}>
            Translation progress
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 5,
              mr: 2
            }}
          >
            <Typography variant="body2">1 of 10 tracks</Typography>
            <LinearProgress variant="determinate" value={10} sx={{ flex: 1 }} />
          </Box>
          <Typography variant="body1" color="text.secondary">
            Current track: track.mp3
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Typography variant="caption">Elapsed: 0:00</Typography>
            <Typography variant="caption">Total: 5:23</Typography>
          </Stack>
        </Box>
        <Box sx={{ flex: 2 }} className="output-box">
          <Box className="output-shadow-box"></Box>
          <CircularProgress sx={{ position: 'absolute', bottom: 0, right: 0, margin: '1em' }} />
          <span>[hh:mm:ss] Hello</span>
          <span>[hh:mm:ss] What's</span>
          <span>[hh:mm:ss] Going</span>
        </Box>
      </Box>
    </>
  );
};

export default TranslationProgress;
