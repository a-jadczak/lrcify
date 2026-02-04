import { Box, CircularProgress, LinearProgress, Stack, Typography } from '@mui/material';
import './styles.css';
import { useContext, useEffect, useState } from 'react';
import StepperContext from '@renderer/contexts/StepperContext';
import useTranscribe from './hooks/useTranscribe';

const TranslationPage = () => {
  const { currentTrackInfo, elapsedTime, lyrics, tracks, tracksTranscribed } = useTranscribe();

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
            <Typography variant="body2">
              {tracksTranscribed} of {tracks.length} tracks
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(tracksTranscribed * 100) / tracks.length}
              sx={{ flex: 1 }}
            />
          </Box>
          <Typography variant="body1" color="text.secondary">
            Current track: {currentTrackInfo?.track}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Typography variant="caption">Elapsed: {elapsedTime}</Typography>
            <Typography variant="caption">Total: {currentTrackInfo?.totalLength}</Typography>
          </Stack>
        </Box>
        <Box sx={{ flex: 2 }} className="output-box">
          <Box className="output-shadow-box"></Box>
          <CircularProgress sx={{ position: 'absolute', bottom: 0, right: 0, margin: '1em' }} />
          {lyrics?.map((text) => (
            <span>{text}</span>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default TranslationPage;
