import { Box } from '@mui/material';
import './styles.css';
import { useContext, useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import StepperContext from '@renderer/contexts/StepperContext';
import useTranscribe from './hooks/useTranscribe';
import TranslationProgressPanel from './components/TranslationProgressPanel';
import LyricsOutput from './components/LyricsOutput';

const TranslationPage = (): ReactElement => {
  const { setNextStepAvailable } = useContext(StepperContext)!;
  const [isTranslating, setIsTranslating] = useState(true);
  const { currentTrackInfo, elapsedTime, lyrics, tracks, tracksTranscriptionProgress } =
    useTranscribe(setIsTranslating);

  useEffect(() => {
    setNextStepAvailable(!isTranslating);
  }, [isTranslating, setNextStepAvailable]);

  return (
    <Box sx={{ display: 'flex' }}>
      <TranslationProgressPanel
        currentTrackInfo={currentTrackInfo.current}
        elapsedTime={elapsedTime}
        tracks={tracks}
        tracksTranscriptionProgress={tracksTranscriptionProgress}
      />
      <LyricsOutput isTranslating={isTranslating} lyrics={lyrics} />
    </Box>
  );
};

export default TranslationPage;
