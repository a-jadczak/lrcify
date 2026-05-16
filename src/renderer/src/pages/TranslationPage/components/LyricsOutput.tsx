import CheckIcon from '@mui/icons-material/Check';
import { Box, CircularProgress, Typography } from '@mui/material';
import type { ReactElement } from 'react';

interface LyricsOutputProps {
  isTranslating: boolean;
  lyrics?: string[];
}

const LyricsOutput = ({ isTranslating, lyrics }: LyricsOutputProps): ReactElement => {
  return (
    <Box sx={{ flex: 2 }} className="output-box">
      <Box className="output-shadow-box" />

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

      {lyrics?.map((text, index) => (
        <Typography component="span" key={`${text}-${index}`}>
          {text}
        </Typography>
      ))}
    </Box>
  );
};

export default LyricsOutput;
