import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import type { ReactElement } from 'react';

interface TrackInfo {
  track: string;
  totalLength: string;
}

interface TranslationProgressPanelProps {
  currentTrackInfo?: TrackInfo;
  elapsedTime?: string;
  tracks: string[];
  tracksTranscriptionProgress: number;
}

const truncateStyles = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const TranslationProgressPanel = ({
  currentTrackInfo,
  elapsedTime,
  tracks,
  tracksTranscriptionProgress
}: TranslationProgressPanelProps): ReactElement => {
  const progressValue = tracks.length > 0 ? (tracksTranscriptionProgress * 100) / tracks.length : 0;

  return (
    <Box sx={{ flex: 1 }}>
      <Typography component="h2" variant="h5" fontWeight="bold">
        Translation progress
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 5, mr: 2 }}>
        <Typography variant="body2">
          {tracksTranscriptionProgress} of {tracks.length} tracks
        </Typography>
        <LinearProgress variant="determinate" value={progressValue} sx={{ flex: 1 }} />
      </Box>

      <Typography
        sx={{
          width: '30ch',
          ...truncateStyles,
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

      <Box className="tracks-queue" sx={{ mt: 1 }} color="text.secondary">
        {tracks.map((track, index) => {
          if (tracksTranscriptionProgress > index) return null;

          return (
            <Typography
              sx={{
                width: '35ch',
                ...truncateStyles
              }}
              component="p"
              variant="inherit"
              key={track}
            >
              {track}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
};

export default TranslationProgressPanel;
