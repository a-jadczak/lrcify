import { FilesContext } from '@renderer/contexts/FilesContext';
import { FullTranscriptionConfigContext } from '@renderer/contexts/TranscribeConfigContext';
import { WSContext } from '@renderer/contexts/WebSocketProvider';
import { useContext, useEffect, useRef, useState } from 'react';
import type { Dispatch, RefObject, SetStateAction } from 'react';

interface TrackInfo {
  track: string;
  totalLength: string;
}

type TranscriptionMessage =
  | { status: 'starting-translating'; track: string; totalLength: string }
  | { status: 'translating'; lyrics: string; elapsedTime: string }
  | { status: 'translated' }
  | { status: 'completed' };

interface UseTranscribeResult {
  currentTrackInfo: RefObject<TrackInfo>;
  elapsedTime: string;
  lyrics: string[];
  tracks: string[];
  tracksTranscriptionProgress: number;
}

const useTranscribe = (
  setIsTranslating: Dispatch<SetStateAction<boolean>>
): UseTranscribeResult => {
  const { send } = useContext(WSContext);
  const { outputConfig, transcriptionConfig } = useContext(FullTranscriptionConfigContext)!;
  const { files, clearFiles } = useContext(FilesContext)!;

  const currentTrackInfo = useRef<TrackInfo>({ track: '', totalLength: '00:00' });
  const [elapsedTime, setElapsedTime] = useState('00:00');
  const [lyrics, setLyrics] = useState<string[]>([]);
  const [tracks, setTracks] = useState<string[]>([]);
  const [tracksTranscriptionProgress, setTracksTranscriptionProgress] = useState(0);
  const hasStarted = useRef(false);
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (hasCompleted.current) return;

    const unsubscribe = window.ws.onMessage((data: string) => {
      const message = JSON.parse(data) as TranscriptionMessage;

      switch (message.status) {
        case 'starting-translating':
          currentTrackInfo.current = {
            track: message.track,
            totalLength: message.totalLength
          };
          setTracksTranscriptionProgress((progress) => progress + 1);
          setElapsedTime('00:00');
          break;
        case 'translating':
          setElapsedTime(message.elapsedTime);
          setLyrics((current) => [...current, message.lyrics]);
          break;
        case 'translated':
          setLyrics([]);
          setElapsedTime(currentTrackInfo.current.totalLength);
          break;
        case 'completed':
          hasCompleted.current = true;
          setIsTranslating(false);
          clearFiles();
          break;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [clearFiles, setIsTranslating]);

  useEffect(() => {
    if (hasStarted.current || hasCompleted.current) return;
    if (!outputConfig || !transcriptionConfig) {
      console.error('Missing transcription payload config', { outputConfig, transcriptionConfig });
      return;
    }

    hasStarted.current = true;
    setTracks(files.map((file) => `${file.name}.${file.type}`));
    send({
      type: 'transcribe',
      files,
      outputConfig,
      transcriptionConfig
    });
  }, [files, outputConfig, transcriptionConfig, send]);

  return {
    currentTrackInfo,
    elapsedTime,
    lyrics,
    tracks,
    tracksTranscriptionProgress
  };
};

export default useTranscribe;
