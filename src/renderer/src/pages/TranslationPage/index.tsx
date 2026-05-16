import { Box, CircularProgress, LinearProgress, Stack, Typography } from '@mui/material';
import './styles.css';
import { useContext, useEffect, useState } from 'react';
import StepperContext from '@renderer/contexts/StepperContext';
import CheckIcon from '@mui/icons-material/Check';
import useTranscribe from './hooks/useTranscribe';

const TranslationPage = () => {
  const { setNextStepAvailable } = useContext(StepperContext)!;
  const [isTranslating, setIsTranslating] = useState(true);
  const { currentTrackInfo, elapsedTime, lyrics, tracks, tracksTranscriptionProgress } =
    useTranscribe(setIsTranslating);

  useEffect(() => {
    setNextStepAvailable(!isTranslating);
  }, [isTranslating]);

  const TruncateStyles = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };
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
              {tracksTranscriptionProgress} of {tracks.length} tracks
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(tracksTranscriptionProgress * 100) / tracks.length}
              sx={{ flex: 1 }}
            />
          </Box>
          <Typography
            sx={{
              width: '30ch',
              ...TruncateStyles,
              fontSize: '1.2em'
            }}
            variant="body1"
            color="text.secondary"
          >
            Current track: {currentTrackInfo?.track}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Typography variant="caption">Elapsed: {elapsedTime}</Typography>
            <Typography variant="caption">Total: {currentTrackInfo?.totalLength}</Typography>
          </Stack>
          <Box
            className="tracks-queue"
            sx={{
              mt: 1
            }}
            color="text.secondary"
          >
            {tracks.map((track, i) => {
              if (tracksTranscriptionProgress > i) return;

              return (
                <Typography
                  sx={{
                    width: '35ch',
                    ...TruncateStyles
                  }}
                  component={'p'}
                  variant="inherit"
                  key={track}
                >
                  {track}
                </Typography>
              );
            })}
          </Box>
        </Box>
        <Box sx={{ flex: 2 }} className="output-box">
          <Box className="output-shadow-box"></Box>
          {isTranslating ? (
            <CircularProgress sx={{ position: 'absolute', bottom: 0, right: 0, margin: '1em' }} />
          ) : (
            <CheckIcon
              sx={{
                fontSize: '2.25em',
                color: 'primary.main',
                position: 'absolute',
                bottom: 0,
                right: 0,
                margin: '.5em'
              }}
            />
          )}
          {lyrics?.map((text) => (
            <Typography component="span" key={text}>
              {text}
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default TranslationPage;
