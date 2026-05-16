import { FilesContext } from '@renderer/contexts/FilesContext';
import { FullTranscriptionConfigContext } from '@renderer/contexts/TranscribeConfigContext';
import { WSContext } from '@renderer/contexts/WebSocketProvider';
import { useContext, useEffect, useRef, useState } from 'react';
import AudioFile from 'src/types/AudioFile';
import OutputConfig from 'src/types/OutputConfig';
import TranscriptionConfig from 'src/types/TranscriptionConfig';

interface TrackInfo {
  track: string;
  totalLength: string;
}

const useTranscribe = (setIsTranslating: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { send } = useContext(WSContext);

  const { outputConfig, transcriptionConfig } = useContext(FullTranscriptionConfigContext)!;
  const { files, clearFiles } = useContext(FilesContext)!;

  const currentTrackInfo = useRef<TrackInfo>({ track: '', totalLength: '00:00' });
  const [elapsedTime, setElapsedTime] = useState<string>('00:00');
  const [lyrics, setLyrics] = useState<string[]>();

  const [tracks, setTracks] = useState<string[]>([]);
  const [tracksTranscriptionProgress, setTracksTranscriptionProgress] = useState<number>(0);
  const hasStartedTranscription = useRef(false);

  const transcribe = (
    files: AudioFile[],
    outputConfig: OutputConfig,
    transcriptionConfig: TranscriptionConfig
  ) => {
    send({
      type: 'transcribe',
      files: files,
      outputConfig: outputConfig,
      transcriptionConfig: transcriptionConfig
    });

    const tracks = files.map((file) => `${file.name}.${file.type}`);
    console.log(tracks);
    setTracks(tracks);

    const off = window.ws.onMessage((data: string) => {
      const msg = JSON.parse(data);

      switch (msg.status) {
        case 'starting-translating':
          const { track, totalLength } = msg;
          currentTrackInfo.current = { track, totalLength };

          setTracksTranscriptionProgress((prev) => prev + 1);
          setElapsedTime('00:00');
          break;
        case 'translating':
          const { lyrics, elapsedTime } = msg;
          setElapsedTime(elapsedTime);
          setLyrics((prev) => [...(prev || []), lyrics]);
          console.log(`cti: ${currentTrackInfo}`);
          break;
        case 'translated':
          setLyrics([]);
          if (currentTrackInfo.current?.totalLength)
            setElapsedTime(currentTrackInfo.current.totalLength);
          console.log(`ELAPSED TIME: ${currentTrackInfo.current?.totalLength}`);
          break;
        case 'completed':
          setIsTranslating(false);
          clearFiles();
          off();
          break;
      }
    });

    return off;
  };

  useEffect(() => {
    if (hasStartedTranscription.current) return;

    console.log('F: Starting transcription');
    if (!outputConfig || !transcriptionConfig) {
      console.error('Missing transcription payload config', { outputConfig, transcriptionConfig });
      return;
    }

    hasStartedTranscription.current = true;
    return transcribe(files, outputConfig, transcriptionConfig);
  }, [files, outputConfig, transcriptionConfig]);

  return {
    currentTrackInfo,
    elapsedTime,
    lyrics,
    tracks,
    tracksTranscriptionProgress
  };
};

export default useTranscribe;
