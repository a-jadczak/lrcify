import { Box } from '@mui/material';
import '@/renderer/src/pages/TranslationPage/styles.css';
import { useContext, useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import StepperContext from '@/renderer/src/contexts/StepperContext';
import useTranscribe from '@/renderer/src/pages/TranslationPage/hooks/useTranscribe';
import TranslationProgressPanel from '@/renderer/src/pages/TranslationPage/components/TranslationProgressPanel';
import LyricsOutput from '@/renderer/src/pages/TranslationPage/components/LyricsOutput';

const TranslationPage = (): ReactElement => {
  const { setNextStepAvailable } = useContext(StepperContext)!;
  const [isTranslating, setIsTranslating] = useState(true);
  const { currentTrackInfo, elapsedTime, lyrics, tracks, tracksTranscriptionProgress, sendError } =
    useTranscribe(setIsTranslating);

  useEffect(() => {
    setNextStepAvailable(!isTranslating && !sendError);
  }, [isTranslating, sendError, setNextStepAvailable]);

  return (
    <Box sx={{ display: 'flex' }}>
      <TranslationProgressPanel
        currentTrackInfo={currentTrackInfo.current}
        elapsedTime={elapsedTime}
        tracks={tracks}
        tracksTranscriptionProgress={tracksTranscriptionProgress}
      />
      <LyricsOutput isTranslating={isTranslating} lyrics={lyrics} sendError={sendError} />
    </Box>
  );
};

export default TranslationPage;
